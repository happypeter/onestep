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
    redirect_to Alipay::Service.create_partner_trade_by_buyer_url({
      out_trade_no:      @order.out_trade_no,
      subject:           @course.title,
      price:             @course.price,
      quantity:          1,
      logistics_type:    'DIRECT',
      logistics_fee:     '0',
      logistics_payment: 'SELLER_PAY',
      receive_name:      'none',
      receive_address:   'none',
      receive_zip:       '100000',
      receive_mobile:    '100000000000',
      return_url:        Settings.alipay.return_url,
      notify_url:        Settings.alipay.notify_url
    })
  end

  private

    def update_order
      options = {
        :trade_no       => params[:trade_no],
        :logistics_name => Settings.alipay.site,
        :transport_type => 'DIRECT'
      }
      @order = Order.find_by_out_trade_no(params[:out_trade_no])
      notify_params = params.except(*request.path_parameters.keys)

      if (@order.trade_status != "TRADE_FINISHED") && Alipay::Notify.verify?(notify_params)
        if params[:trade_status] == "WAIT_SELLER_SEND_GOODS"
          Alipay::Service.send_goods_confirm_by_platform(options)
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
