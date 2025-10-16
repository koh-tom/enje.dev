# このファイルを変更したらサーバーを再起動してください。

# フロントエンドからのAPI呼び出しでCORS問題を回避します。
# クロスオリジンAjaxリクエストを許可するためのCORS設定です。

# 詳細: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # Allowed origins whitelist
    allowed_origins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://enje.dev",
      "https://www.enje.dev",
      # Vercel preview URLs securely over HTTPS
      /\Ahttps:\/\/.*\.vercel\.app\z/
    ]

    # Add custom origins from CORS_ORIGINS environment variable if present (comma-separated)
    if ENV["CORS_ORIGINS"].present?
      allowed_origins += ENV["CORS_ORIGINS"].split(",").map(&:strip)
    end

    origins(*allowed_origins)

    resource "*",
      headers: ["content-type", "authorization"],
      methods: [:get, :post, :patch, :delete, :options, :head]
  end
end
