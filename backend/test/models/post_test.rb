require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "published には公開日時が現在以前の公開記事だけが含まれる" do
    slugs = Post.published.map(&:slug)
    assert_includes slugs, "hello-world"
    assert_includes slugs, "older-post"
    assert_not_includes slugs, "draft-post"
    assert_not_includes slugs, "scheduled-post"
  end

  test "slug は小文字英数字とハイフンのみ" do
    post = Post.new(slug: "Bad Slug", title: "t")
    assert_not post.valid?
    assert_includes post.errors[:slug], "is invalid"
  end

  test "slug は作成後に変更できない" do
    post = posts(:published)
    assert_raises(ActiveRecord::ReadonlyAttributeError) { post.update!(slug: "changed") }
  end

  test "公開記事には published_at が必須" do
    post = Post.new(slug: "x", title: "t", status: :published)
    assert_not post.valid?
    assert post.errors[:published_at].any?
  end

  test "保存時に Markdown が HTML に変換され目次と読了時間が付く" do
    post = Post.create!(slug: "render", title: "t", body_markdown: "## 節\n\n本文。\n\n```ruby\nputs 1\n```")
    assert_includes post.body_html, '<h2 id="節">節</h2>'
    assert_includes post.body_html, '<pre class="highlight">'
    assert_equal [ { "id" => "節", "level" => 2, "text" => "節" } ], post.toc
    assert_equal "本文。", post.excerpt
    assert_equal 1, post.reading_time
  end

  test "危険な HTML は除去される" do
    post = Post.create!(slug: "xss", title: "t", body_markdown: %(<img src="x" onerror="alert(1)"> <a href="javascript:alert(1)">x</a> <script>alert(1)</script>))
    assert_not_includes post.body_html, "onerror"
    assert_not_includes post.body_html, "javascript:"
    assert_not_includes post.body_html, "<script"
  end

  test "前後の記事は公開済みから取る" do
    assert_equal posts(:older), posts(:published).previous_post
    assert_nil posts(:published).next_post
    assert_equal posts(:published), posts(:older).next_post
  end

  test "同じ公開日時の記事も前後でつながる" do
    at = posts(:published).published_at
    same_day = Post.create!(slug: "same-day", title: "同じ日", status: :published, published_at: at)

    assert_equal posts(:published), same_day.previous_post
    assert_equal same_day, posts(:published).next_post
    assert_nil same_day.next_post
  end
end
