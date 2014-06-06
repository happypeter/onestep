class OrdersController < ApplicationController
  before_filter :check_login, :only => [:new, :checkout]
  before_filter :get_course, :only => [:new, :checkout]
  before_filter :get_order, :only => :checkout
  before_filter :update_order, :only => [:done, :notify]

  def new
    @subject = @course.title
    @price = @course.price
    @out_trade_no = Base64.urlsafe_encode64("#{current_user.id}: #{Time.now.to_i}")

    unless ( @order = Order.not_paid.where(course_id: params[:course_id], user_id: current_user.id).first )
      @order = current_user.orders.new
      @order.course_id = @course.id
    end
    @order.subject = @subject # course's title may change
    @order.out_trade_no = @out_trade_no

    @order.save!
  end

  def done
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
      :out_trade_no      => @order.out_trade_no,
      :subject           => @course.title,
      :price             => @course.price,
      :quantity          => 1,  # It seems that no one need to pay the same course twice .
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
