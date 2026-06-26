class Project < ApplicationRecord
  include Publishable

  validates :name, presence: true

  before_save :render_markdown, if: :will_save_change_to_body_markdown?

  scope :ordered, -> { order(:position, created_at: :desc) }

  def to_param = slug

  private

  def render_markdown
    self.body_html = MarkdownRenderer.new(body_markdown).render.html
  end
end
