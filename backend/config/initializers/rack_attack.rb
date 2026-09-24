# レート制限。カウンタは Rails.cache（本番は Solid Cache）に置く
#
# 本番の API は Next.js のサーバーから呼ばれるため、req.ip は Vercel の IP になる。
# Next.js は REVALIDATE_SECRET を X-Frontend-Secret に入れ、利用者の IP を X-Client-IP で渡す。
# 秘密が一致したときだけ X-Client-IP を信じる（一致しなければ偽装とみなし req.ip を使う）。
class Rack::Attack
  Rack::Attack.cache.store = Rails.cache

  # Next.js のサーバーからのリクエストか
  def self.from_frontend?(req)
    secret = ENV["REVALIDATE_SECRET"]
    given = req.get_header("HTTP_X_FRONTEND_SECRET")
    secret.present? && given.present? && ActiveSupport::SecurityUtils.secure_compare(given, secret)
  end

  # レート制限に使う利用者の IP
  def self.client_ip(req)
    (from_frontend?(req) && req.get_header("HTTP_X_CLIENT_IP").presence) || req.ip
  end

  # 公開 API の読み取り: 1 分あたり 120 回 / IP。
  # Next.js の ISR やビルドでの取得は対象外（利用者のアクセスではないため）
  throttle("api/read/ip", limit: 120, period: 1.minute) do |req|
    req.ip if req.get? && req.path.start_with?("/api/") && !from_frontend?(req)
  end

  # お問い合わせ: 1 時間あたり 5 回 / 利用者の IP
  throttle("api/contacts/ip", limit: 5, period: 1.hour) do |req|
    client_ip(req) if req.post? && req.path == "/api/v1/contacts"
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
