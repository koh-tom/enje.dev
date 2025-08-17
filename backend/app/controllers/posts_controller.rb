class PostsController < ApplicationController
  before_action :authenticate_admin!, except: %i[ index show ]
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @posts = Post.includes(:tags).order(published_at: :desc)
    if params[:limit].present?
      @posts = @posts.limit(params[:limit])
    end

    render json: @posts
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_content
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_content
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.expect(post: [ :title, :content, :published_at, :image_url, tag_ids: [] ])
    end
end
