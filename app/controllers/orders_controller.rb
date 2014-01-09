class OrdersController < ApplicationController
  before_filter :check_login, :only => [:new]
  before_filter :update_order, :only => [:done, :notify]

  def new
    @course = Course.find(params[:course_id])
    @subject = @course.title
    @price = @course.price
    @out_trade_no = Time.now.to_i.to_s

    @order = Order.new(user_id: current_user.id, course_id: @course.id,
      subject: @subject, out_trade_no: @out_trade_no)
    @order.save!
  end

  def done
    order = Order.find_by_out_trade_no(params[:out_trade_no])
    course = Course.find(order.course_id)
    flash[:notice] = t('trade_finished')
    redirect_to course_path(course)
  end

  def notify
    render text: 'success'
  end

  def checkout
     options = {
      :partner           => Settings.alipay.pid,
      :key               => Settings.alipay.secret,
      :seller_email      => Settings.alipay.seller_email,
      :out_trade_no      => params[:out_trade_no],
      :subject           => params[:subject],
      :price             => params[:price],
      :quantity          => params[:quantity],
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
        :logistics_name    => 'Haoqi Course'
      }
      order = Order.find_by_out_trade_no(params[:out_trade_no])
      if order.trade_status != "TRADE_FINISHED"
        if params[:trade_status] == 'TRADE_FINISHED'
          # for direct pay
          order.update_attributes(trade_status: params[:trade_status], total_fee: params[:total_fee])
        elsif params[:trade_status] == "WAIT_SELLER_SEND_GOODS"
          # for danbao pay
          AlipayDualfun.send_goods_confirm_by_platform(options)
          order.update_attributes(trade_status: "TRADE_FINISHED",  total_fee: params[:total_fee])
        end
      end
    end
  end
