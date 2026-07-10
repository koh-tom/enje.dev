# ブラウザから直接 API を叩くのは開発時の確認用途に限る。
# 本番の Next.js はサーバー側から fetch するため CORS は不要だが、
# プレビュー環境や手動確認のために FRONTEND_URL と CORS_ORIGINS を許可する。
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins(*[
      ENV["FRONTEND_URL"],
      *ENV.fetch("CORS_ORIGINS", "").split(",").map(&:strip)
    ].compact_blank)

    resource "/api/*",
      headers: %w[content-type],
      methods: %i[get post options head],
      max_age: 600
  end
end
