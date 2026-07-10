# レート制限。カウンタは Rails.cache（本番は Solid Cache）に置く
class Rack::Attack
  Rack::Attack.cache.store = Rails.cache

  # 公開 API の読み取り: 1 分あたり 120 回 / IP
  throttle("api/read/ip", limit: 120, period: 1.minute) do |req|
    req.ip if req.get? && req.path.start_with?("/api/")
  end

  # お問い合わせ: 1 時間あたり 5 回 / IP
  throttle("api/contacts/ip", limit: 5, period: 1.hour) do |req|
    req.ip if req.post? && req.path == "/api/v1/contacts"
  end

  # 管理 API: トークン総当たり対策。1 分あたり 10 回 / IP
  throttle("api/admin/ip", limit: 10, period: 1.minute) do |req|
    req.ip if req.path.start_with?("/api/v1/admin/")
  end

  self.throttled_responder = lambda do |request|
    period = request.env["rack.attack.match_data"][:period]
    [
      429,
      { "Content-Type" => "application/json", "Retry-After" => period.to_s },
      [ { error: { code: "rate_limited", message: "リクエストが多すぎます。しばらく待ってから再試行してください" } }.to_json ]
    ]
  end
end
