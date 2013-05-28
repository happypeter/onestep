class PostsController < ApplicationController
  load_and_authorize_resource

  def index
    @posts = Post.recent
  end

  def new
  end

  def create
    post = Post.new(params[:post])
    title = params[:post][:title]
    name = PinYin.of_string(title).join('-').downcase
    post.user_id = current_user.id
    post.name = name
    if post.save
      redirect_to blog_path(post), :notice => "New blog created successfully!"
    else
      render "new"
    end
  end

  def update
    title = params[:post][:title]
    name = PinYin.of_string(title).join('-').downcase
    @post.name = name
    respond_to do |format|
      if @post.update_attributes(params[:post])
        format.html { redirect_to blog_path(@post), :success => 'Blog was successfully updated.' }
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
