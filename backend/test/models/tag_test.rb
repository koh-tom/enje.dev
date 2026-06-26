require "test_helper"

class TagTest < ActiveSupport::TestCase
  test "英数字の名前は parameterize された slug になる" do
    assert_equal "next-js", Tag.create!(name: "Next.js").slug
  end

  test "日本語の名前は名前そのものが slug になる" do
    assert_equal "電子工作", Tag.create!(name: "電子工作").slug
  end

  test "名前は大文字小文字を区別せず一意" do
    assert_not Tag.new(name: "ruby").valid?
  end

  test "find_or_create_by_name! は大文字小文字を同一視する" do
    assert_equal tags(:ruby), Tag.find_or_create_by_name!("RUBY")
    assert_difference("Tag.count") { Tag.find_or_create_by_name!("Zig") }
  end

  test "with_published_count は公開記事数だけを数える" do
    counts = Tag.with_published_count.to_h { [ _1.slug, _1.posts_count ] }
    assert_equal 2, counts["ruby"]
    assert_nil counts["fpga"]
  end
end
