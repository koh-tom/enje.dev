require "test_helper"

class Api::V1::ProjectsControllerTest < ActionDispatch::IntegrationTest
  test "一覧は公開プロジェクトだけを返す" do
    get api_v1_projects_url, as: :json
    assert_response :success
    data = response.parsed_body["data"]
    assert_equal [ "enje-dev" ], data.map { _1["slug"] }
    assert_equal [ "Next.js", "Rails" ], data.first["tech_stack"]
    assert_equal "https://github.com/koh-tom/enje.dev", data.first.dig("links", "github")
  end

  test "詳細は本文を返す" do
    get api_v1_project_url("enje-dev"), as: :json
    assert_response :success
    assert_includes response.parsed_body.dig("data", "body_html"), "<p>"
  end

  test "非公開は 404" do
    get api_v1_project_url("hidden-project"), as: :json
    assert_response :not_found
  end
end
