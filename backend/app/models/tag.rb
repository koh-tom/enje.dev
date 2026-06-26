class Tag < ApplicationRecord
  has_many :post_tags, dependent: :destroy
  has_many :posts, through: :post_tags

  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :slug, presence: true, uniqueness: true

  before_validation :assign_slug

  scope :with_published_count, -> {
    left_joins(posts: []).merge(Post.published)
      .select("tags.*, COUNT(posts.id) AS posts_count")
      .group("tags.id").order(:name)
  }

  # 名前からタグを取得または作成する（大文字小文字は同一視）
  def self.find_or_create_by_name!(name)
    where("lower(name) = ?", name.downcase).first || create!(name: name)
  end

  private

  # 日本語など parameterize で空になる名前はそのまま slug にする
  def assign_slug
    self.slug = name.to_s.parameterize.presence || name if slug.blank? && name.present?
  end
end
