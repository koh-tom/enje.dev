require "test_helper"

class ContentSyncTest < ActiveSupport::TestCase
  setup do
    @root = Pathname(Dir.mktmpdir)
    (@root / "posts").mkpath
    (@root / "projects").mkpath
  end

  teardown { FileUtils.rm_rf(@root) }

  def write_post(name, body)
    (@root / "posts" / name).write(body)
  end

  test "Markdown から記事とタグを作り、再実行しても増えない" do
    write_post("2026-01-02-first.md", "---\ntitle: 最初\ntags: [Ruby, 新しいタグ]\n---\n\n本文。\n")
    sync = ContentSync.new(root: @root)

    assert_difference [ "Post.count", "Tag.count" ], 1 do
      result = sync.call
      assert_equal 1, result.posts
    end
    assert_no_difference([ "Post.count", "Tag.count" ]) { sync.call }

    post = Post.find_by!(slug: "first")
    assert post.published?
    assert_equal Time.zone.parse("2026-01-02"), post.published_at
    assert_equal %w[Ruby 新しいタグ], post.tags.map(&:name)
  end

  test "draft: true は下書きになる" do
    write_post("2026-01-02-d.md", "---\ntitle: t\ndraft: true\ntags: []\n---\n本文")
    ContentSync.new(root: @root).call
    assert Post.find_by!(slug: "d").draft?
  end

  test "ファイルが消えた公開記事は下書きに戻る" do
    result = ContentSync.new(root: @root).call
    assert_equal %w[enje-dev hello-world older-post scheduled-post], result.unpublished.sort
    assert posts(:published).reload.draft?
  end

  test "lint はフロントマターの不備を列挙する" do
    write_post("bad-name.md", "---\ntags: x\n---\n")
    errors = ContentSync.new(root: @root).lint
    assert errors.any? { _1.include?("YYYY-MM-DD-slug.md") }
    assert errors.any? { _1.include?("title は必須") }
    assert errors.any? { _1.include?("tags は文字列の配列") }
  end

  test "slug が重複していたらエラー" do
    write_post("2026-01-01-same.md", "---\ntitle: a\ntags: []\n---\n")
    write_post("2026-01-02-same.md", "---\ntitle: b\ntags: []\n---\n")
    assert_raises(ArgumentError) { ContentSync.new(root: @root).call }
  end

  test "プロジェクトも同期される" do
    (@root / "projects" / "03-tool.md").write("---\nname: Tool\ntech_stack: [Zig]\ngithub: https://example.com\n---\n説明")
    ContentSync.new(root: @root).call
    project = Project.find_by!(slug: "tool")
    assert_equal 3, project.position
    assert_equal [ "Zig" ], project.tech_stack
    assert project.published?
  end
end
