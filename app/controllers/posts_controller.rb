class PostsController < ApplicationController
  load_and_authorize_resource

  def index
    @posts = Post.recent
  end

  def new
  end

  def create
    post = Post.new(params[:post])
    post.user_id = current_user.id
    if post.save
      redirect_to post_path(post), :notice => "New blog created successfully!"
    else
      render "new"
    end
  end

  def update
    respond_to do |format|
      if @post.update_attributes(params[:post])
        format.html { redirect_to post_path(@post), :success => 'Blog was successfully updated.' }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def edit
  end

end
