# encoding: utf-8
class PostsController < ApplicationController
  before_filter :check_admin, :except => [:index, :show]

  def index
    @posts = Post.recent
  end

  def new
    @post = Post.new
  end

  def create
    post = Post.new(params[:post])
    title = params[:post][:title]
    name = PinYin.of_string(title).join('-').downcase
    post.user_id = current_user.id
    post.name = name
    if post.save
      redirect_to blog_path(post), :notice => "博客创建成功"
    else
      render "new"
    end
  end

  def update
    @post = Post.find(params[:id])
    title = params[:post][:title]
    name = PinYin.of_string(title).join('-').downcase
    @post.name = name
    respond_to do |format|
      if @post.update_attributes(params[:post])
        format.html { redirect_to blog_path(@post), :success => '博客更新成功' }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def show
    @post = Post.find(params[:id])
    session[:return_to] = request.url
  end

  def edit
    @post = Post.find(params[:id])
  end
end
