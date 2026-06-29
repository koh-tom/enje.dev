module Api
  module V1
    class ProjectsController < ApplicationController
      # GET /api/v1/projects
      def index
        projects = Project.visible.ordered

        public_cache
        render json: { data: ProjectSummaryResource.new(projects).serializable_hash }
      end

      # GET /api/v1/projects/:slug
      def show
        project = Project.visible.find_by!(slug: params[:slug])

        public_cache
        return unless stale?(project, public: true)

        render json: { data: ProjectResource.new(project).serializable_hash }
      end
    end
  end
end
