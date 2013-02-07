class CommentsController < ApplicationController
  load_and_authorize_resource
  def index
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @comments }
    end
  end

  def new
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @comment }
    end
  end

  def edit
  end

  def create
    @comment = current_user.comments.build(params[:comment])
    @comment.save
    respond_to do |format|
      format.html do
        if @comment.errors.present?
          redirect_to_target_or_default root_url
        else
          redirect_to_target_or_default root_url
        end
      end
      format.js
    end
  end

  def preview
    @content = params[:content]
    respond_to do |format|
      format.js
    end
  end

  def update
    respond_to do |format|
      if @comment.update_attributes(params[:comment])
        format.html { redirect_to_target_or_default root_url, notice: 'comment was successfully updated.' }
      else
        format.html { render action: "edit" }
      end
      format.js
    end
  end

  def destroy
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to_target_or_default root_url }
      format.js
    end
  end
end
