require "test_helper"

class RackAttackTest < ActionDispatch::IntegrationTest
  setup do
    @store = Rack::Attack.cache.store
    Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new
  end

  teardown { Rack::Attack.cache.store = @store }

  test "お問い合わせは 1 時間に 5 回まで" do
    5.times { post api_v1_contacts_url, params: {}, as: :json }
    post api_v1_contacts_url, params: {}, as: :json
    assert_response :too_many_requests
    assert_equal "rate_limited", response.parsed_body.dig("error", "code")
    assert response.headers["Retry-After"].present?
  end
end
