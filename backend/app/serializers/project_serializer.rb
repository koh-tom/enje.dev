class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :name, :duration, :tech_stack, :description, :github_link, :demo_link, :image_url
end
