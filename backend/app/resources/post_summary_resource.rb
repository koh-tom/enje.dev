# 一覧用。本文は含めない
class PostSummaryResource
  include Alba::Resource

  attributes :slug, :title, :excerpt, :reading_time, :cover_image, :status

  attribute(:published_at) { |post| post.published_at&.iso8601 }
  attribute(:updated_at) { |post| post.updated_at.iso8601 }

  many :tags, resource: TagResource
end
