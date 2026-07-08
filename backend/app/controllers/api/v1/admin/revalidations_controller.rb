module Api
  module V1
    module Admin
      # POST /api/v1/admin/revalidate  { "tags": ["posts"] }
      # Next.js の ISR キャッシュを手動で破棄する
      class RevalidationsController < ApplicationController
        before_action :authenticate_admin!

        def create
          tags = Array(params[:tags]).presence || Revalidator::ALL_TAGS
          Revalidator.new(tags).call
          render json: { data: { revalidated: tags } }
        end
      end
    end
  end
end
