class Post < ApplicationRecord
  include Publishable

  has_many :post_tags, dependent: :destroy
  has_many :tags, -> { order(:name) }, through: :post_tags

  validates :title, presence: true
  validates :published_at, presence: true, if: :published?

  before_save :render_markdown, if: :will_save_change_to_body_markdown?

  scope :published, -> { where(status: :published).where(published_at: ..Time.current) }
  scope :newest_first, -> { order(published_at: :desc, id: :desc) }
  scope :tagged_with, ->(tag_slug) { joins(:tags).where(tags: { slug: tag_slug }) }

  def to_param = slug

  # 前後の記事（公開済みのみ）。公開日時が同じ記事は id で順序を決める
  def previous_post
    Post.published
      .where("(posts.published_at, posts.id) < (?, ?)", published_at, id)
      .newest_first.first
  end

  def next_post
    Post.published
      .where("(posts.published_at, posts.id) > (?, ?)", published_at, id)
      .order(:published_at, :id).first
  end

  private

  def render_markdown
    rendered = MarkdownRenderer.new(body_markdown).render
    self.body_html = rendered.html
    self.toc = rendered.toc
    self.reading_time = ReadingTime.minutes(body_markdown)
    self.excerpt = rendered.excerpt if excerpt.blank?
  end
end
