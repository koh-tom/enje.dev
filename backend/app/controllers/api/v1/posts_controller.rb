module Api
  module V1
    class PostsController < ApplicationController
      include Paginatable

      # GET /api/v1/posts?tag=ruby&page=1&per=20
      def index
        scope = Post.visible.includes(:tags).newest_first
        scope = scope.tagged_with(params[:tag]) if params[:tag].present?
        posts, meta = paginate(scope)

        public_cache
        render json: { data: PostSummaryResource.new(posts).serializable_hash, meta: }
      end

      # GET /api/v1/posts/:slug
      def show
        post = Post.visible.includes(:tags).find_by!(slug: params[:slug])

        public_cache
        return unless stale?(post, public: true)

        render json: { data: PostResource.new(post).serializable_hash }
      end
    end
  end
end
