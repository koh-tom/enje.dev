module Api
  module V1
    module Admin
      # POST /api/v1/admin/sync
      # content/ 配下の Markdown を DB に反映して ISR を破棄する
      class SyncsController < ApplicationController
        before_action :authenticate_admin!

        def create
          result = ContentSync.new.call
          Revalidator.new(Revalidator::ALL_TAGS).call
          render json: { data: result }
        end
      end
    end
  end
end
