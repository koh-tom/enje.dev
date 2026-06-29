# 詳細用。本文 HTML、目次、前後の記事を含む
class PostResource < PostSummaryResource
  attributes :body_html, :toc

  attribute(:previous_post) { |post| adjacent(post.previous_post) }
  attribute(:next_post) { |post| adjacent(post.next_post) }

  private

  def adjacent(post)
    post && { slug: post.slug, title: post.title }
  end
end
