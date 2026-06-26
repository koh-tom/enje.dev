require "test_helper"

class ProjectTest < ActiveSupport::TestCase
  test "visible は本番では公開済みだけを返す" do
    assert_equal [ "enje-dev" ], Project.visible.map(&:slug)
  end

  test "tech_stack は配列で保存される" do
    assert_equal [ "Next.js", "Rails" ], projects(:site).tech_stack
  end

  test "保存時に Markdown が HTML に変換される" do
    project = Project.create!(slug: "p", name: "n", body_markdown: "**太字**")
    assert_equal "<p><strong>太字</strong></p>\n", project.body_html
  end
end
