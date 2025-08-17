class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :published_at, :image_url, :reading_time

  has_many :tags
end
