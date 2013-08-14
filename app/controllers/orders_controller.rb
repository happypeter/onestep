class OrdersController < ApplicationController
  def new
    if !current_user
      redirect_to :login, :notice => t('login_first_plz')
    else
      @course = Course.find(params[:course_id])
      @subject = @course.title
      @price = @course.price
      @quantity = 1
      @total_fee = @price * @quantity

      # delete unpaid order
      @order = Order.where(:course_id => @course.id, :user_id => current_user.id).first
      if @order.present?
        @order.destroy
      end
      # generate new order
      @out_trade_no = Time.now.to_i.to_s
      @order = Order.new(user_id: current_user.id, course_id: @course.id,
                        subject: @subject, out_trade_no: @out_trade_no)
      @order.save!
    end
  end

  def done
    order = Order.find_by_out_trade_no(params[:out_trade_no])
    if params[:trade_status] == 'TRADE_FINISHED' && order.trade_status != 'TRADE_FINISHED'
      order.update_attributes(notify_id: params[:notify_id], trade_status: params[:trade_status], notify_time: params[:notify_time])
    end
    course = Course.find(order.course_id)
    flash[:notice] = t('trade_finished')
    redirect_to course_path(course)
  end

  def notify
    order = Order.find_by_out_trade_no(params[:out_trade_no])
    if order.trade_status == 'TRADE_FINISHED'
      render text: 'success'
    end

    if params[:trade_status] == 'TRADE_FINISHED' &&
      order.trade_status != 'TRADE_FINISHED'

      order.update_attributes(notify_id: params[:notify_id],
                              trade_status: params[:trade_status],
                              notify_time: params[:notify_time])
      render text: 'success'
    end
  end

  def checkout
    @partner_id = Settings.alipay.pid
    @key = Settings.alipay.secret
    @seller_email = Settings.alipay.seller_email # this is also account name

    @merchant = AlipayDualfun::Merchant.new(@partner_id, @key)

    @out_trade_no = params[:out_trade_no] # 商家内部唯一订单编号
    @subject = params[:subject]
    @description = params[:description].blank? ? 'course':params[:description] # 订单内容

    @price = params[:price]
    @quantity = params[:quantity]

    @order = @merchant.create_order(@out_trade_no, @subject, @description)
    @dualfun_pay = @order.seller_email(@seller_email).no_logistics.set_price_and_quantity(@price, @quantity).dualfun_pay

    # 交易成功同步返回地址
    @return_url = Settings.alipay.return_url
    @dualfun_pay.after_payment_redirect_url(@return_url)
    @notify_url = Settings.alipay.notify_url
    @dualfun_pay.notification_callback_url(@notify_url)

    redirect_to @dualfun_pay.gateway_api_url
  end

end
