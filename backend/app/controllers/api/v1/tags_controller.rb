module Api
  module V1
    class TagsController < ApplicationController
      # GET /api/v1/tags
      def index
        tags = Tag.with_published_count

        public_cache
        render json: { data: TagResource.new(tags, params: { with_count: true }).serializable_hash }
      end
    end
  end
end
