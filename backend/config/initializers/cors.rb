# このファイルを変更したらサーバーを再起動してください。

# フロントエンドからのAPI呼び出しでCORS問題を回避します。
# クロスオリジンAjaxリクエストを許可するためのCORS設定です。

# 詳細: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # 本番フロントエンドのドメインを設定 (環境変数CORS_ORIGINSを使用)
    origins ENV.fetch("CORS_ORIGINS") { "http://localhost:3000" }

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
