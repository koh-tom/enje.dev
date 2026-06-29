require "test_helper"

class Api::V1::TagsControllerTest < ActionDispatch::IntegrationTest
  test "公開記事を持つタグと記事数を返す" do
    get api_v1_tags_url, as: :json
    assert_response :success
    assert_equal [ { "slug" => "ruby", "name" => "Ruby", "posts_count" => 2 } ], response.parsed_body["data"]
  end
end
