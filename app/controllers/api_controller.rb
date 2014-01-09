class ApiController < ApplicationController
  def money
   respond_to do |f|
    f.json {
      result = []

      orders = Order.where('total_fee  IS  NOT NULL')
      orders.each do |order|
        result << {
          :total_fee => order.total_fee,
          :date => order.created_at.strftime(t('date.formats.default'))
        }
      end
      render :json => result, :callback => params[:callback]
    }
    end
  end
end