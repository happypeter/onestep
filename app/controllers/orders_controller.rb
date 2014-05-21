class OrdersController < ApplicationController
  before_filter :check_login, :only => [:new, :checkout]
  before_filter :get_course, :only => [:new, :checkout]
  before_filter :get_order, :only => :checkout
  before_filter :update_order, :only => [:done, :notify]

  def new
    @course = Course.find(params[:course_id])
    @subject = @course.title
    @price = @course.price
    # Too ease to be faked and may cause problem when several user paid at the same time.
    # @out_trade_no = Time.now.to_i.to_s
    @out_trade_no = Base64.encode64("#{current_user.id}: #{Time.now.to_i}")

    # @order ||= Order.new(user_id: current_user.id, course_id: @course.id,
      # subject: @subject, out_trade_no: @out_trade_no)
    # otherwise it would reproduce lots of dead orders
    unless ( @order = Order.not_paid.where(course_id: params[:course_id], user_id: current_user.id).first )
      @order = current_user.orders.new
      @order.course_id = @course.id
    end
    @order.subject = @subject # course's title may change
    @order.out_trade_no = @out_trade_no

    @order.save!
  end

  def done
    # order = Order.find_by_out_trade_no(params[:out_trade_no])
    # course = Course.find(order.course_id)
    flash[:notice] = t('trade_finished')
    redirect_to course_path(@order.course)
  end

  def notify
    render text: 'success'
  end

  def checkout
     options = {
      :partner           => Settings.alipay.pid,
      :key               => Settings.alipay.secret,
      :seller_email      => Settings.alipay.seller_email,
      # DON'T TRUST params at anytime
      :out_trade_no      => @order.out_trade_no,
      :subject           => @course.title,
      :price             => @course.price,
      :quantity          => 1,  # It seems that no one need to pay the same course twice .
      # :quantity          => params[:quantity],
      :return_url        => Settings.alipay.return_url,
      :notify_url        => Settings.alipay.notify_url
    }
    redirect_to AlipayDualfun.trade_create_by_buyer_url(options)
  end

  private

    def update_order
      options = {
        :partner           => Settings.alipay.pid,
        :trade_no          => params[:trade_no],
        :logistics_name    => 'Haoqi Course' # move it to setting.yml, shall we ?
      }
      @order = Order.find_by_out_trade_no(params[:out_trade_no])
      if @order.trade_status != "TRADE_FINISHED"
        if params[:trade_status] == 'TRADE_FINISHED'
          # for direct pay
          @order.update_attributes(trade_status: params[:trade_status], total_fee: params[:total_fee])
        elsif params[:trade_status] == "WAIT_SELLER_SEND_GOODS"
          # for danbao pay
          AlipayDualfun.send_goods_confirm_by_platform(options)
          # shouldn't trade_status be boolean ?
          @order.update_attributes(trade_status: "TRADE_FINISHED",  total_fee: params[:total_fee])
        end
      end
    end

    def should_not_paid
      if Order.paid.exists?(user_id: current_user.id, course_id: params[:course_id])
        redirect_to course_path(params[:course_id]), flash: t("order.already_paid")

        return
      end
    end

    def get_course
      unless ( @course = Course.where(id: params[:course_id]).first )
        redirect_to :root, notice: I18n.t("order.no_such_course")

        return
      end
    end

    # It feels too dangerous to show out_trade_no to users.
    # Since I got out_trade_no, I could easily fake a request to done or notify.
    # To find the order, I would rather choose order_id instead.
    def get_order
      unless ( @order = Order.where( course_id: params[:course_id], 
                                    id: params[:order_id], 
                                    user_id: current_user.id).first )

        redirect_to new_order_path( course_id: params[:course_id]), 
                                    notice: I18n.t("order.no_such_order")

        return
      end
    end

  end
