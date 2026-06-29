class ProjectSummaryResource
  include Alba::Resource

  attributes :slug, :name, :summary, :period, :tech_stack, :cover_image, :position, :status

  attribute(:links) { |project| { github: project.github_url, demo: project.demo_url } }
  attribute(:updated_at) { |project| project.updated_at.iso8601 }
end
