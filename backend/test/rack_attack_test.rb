require "test_helper"

class RackAttackTest < ActionDispatch::IntegrationTest
  SECRET = "frontend-secret-value".freeze

  setup do
    @store = Rack::Attack.cache.store
    Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new
    @secret = ENV["REVALIDATE_SECRET"]
    ENV["REVALIDATE_SECRET"] = SECRET
    # カウンタは時間の区切りごとにリセットされるので、区切りをまたがないよう時刻を止める
    travel_to Time.zone.local(2026, 1, 1, 12, 30, 30)
  end

  teardown do
    travel_back
    Rack::Attack.cache.store = @store
    ENV["REVALIDATE_SECRET"] = @secret
  end

  def post_contact(headers = {})
    post api_v1_contacts_url, params: {}, headers:, as: :json
  end

  def frontend(ip) = { "X-Frontend-Secret" => SECRET, "X-Client-IP" => ip }

  test "お問い合わせは 1 時間に 5 回まで" do
    5.times { post_contact }
    post_contact
    assert_response :too_many_requests
    assert_equal "rate_limited", response.parsed_body.dig("error", "code")
    assert response.headers["Retry-After"].present?
  end

  test "Next.js 経由なら利用者の IP ごとに数える" do
    5.times { post_contact(frontend("198.51.100.1")) }
    post_contact(frontend("198.51.100.2"))
    assert_response :unprocessable_content

    post_contact(frontend("198.51.100.1"))
    assert_response :too_many_requests
  end

  test "秘密が違えば X-Client-IP は無視する" do
    5.times { |i| post_contact("X-Frontend-Secret" => "wrong", "X-Client-IP" => "198.51.100.#{i}") }
    post_contact("X-Frontend-Secret" => "wrong", "X-Client-IP" => "198.51.100.99")
    assert_response :too_many_requests
  end

  test "Next.js からの読み取りは制限しない" do
    121.times { get api_v1_tags_url, headers: { "X-Frontend-Secret" => SECRET }, as: :json }
    assert_response :success

    121.times { get api_v1_tags_url, as: :json }
    assert_response :too_many_requests
  end
end
