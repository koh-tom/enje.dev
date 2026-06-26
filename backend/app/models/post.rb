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

  # 前後の記事（公開済みのみ）
  def previous_post = Post.published.where(published_at: ...published_at).newest_first.first
  def next_post = Post.published.where(published_at: (published_at + 1.second)..).order(:published_at).first

  private

  def render_markdown
    rendered = MarkdownRenderer.new(body_markdown).render
    self.body_html = rendered.html
    self.toc = rendered.toc
    self.reading_time = ReadingTime.minutes(body_markdown)
    self.excerpt = rendered.excerpt if excerpt.blank?
  end
end
