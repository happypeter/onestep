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
      # Workaround for https://github.com/rails/rails/issues/15081
      # TODO When the bug above is fixed we should just be able to replace the block below with
      # render :json => result, :callback => params[:callback]
      if params[:callback]
        render :json => result, callback: params[:callback], content_type: "application/javascript"
      else
        render :json => result
      end
    }
    end
  end
end
