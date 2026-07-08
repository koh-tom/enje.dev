require "test_helper"

class Api::V1::Admin::RevalidationsControllerTest < ActionDispatch::IntegrationTest
  test "トークンが無ければ 401" do
    post api_v1_admin_revalidate_url, as: :json
    assert_response :unauthorized
  end

  test "トークンが違えば 401" do
    post api_v1_admin_revalidate_url, headers: { "Authorization" => "Bearer wrong" }, as: :json
    assert_response :unauthorized
  end

  test "正しいトークンなら再検証を呼ぶ" do
    Revalidator.any_instance.expects(:call).returns(true) if defined?(Mocha)
    post api_v1_admin_revalidate_url, params: { tags: [ "posts" ] },
      headers: { "Authorization" => "Bearer #{ENV.fetch('ADMIN_API_TOKEN')}" }, as: :json
    assert_response :success
    assert_equal [ "posts" ], response.parsed_body.dig("data", "revalidated")
  end
end
