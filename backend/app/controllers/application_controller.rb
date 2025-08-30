class ApplicationController < ActionController::API
  private

  def authenticate_admin!
    # Authorizationヘッダーからトークンを取得 (Bearer [TOKEN])
    auth_header = request.headers["Authorization"]
    token = auth_header.split(" ").last if auth_header

    # 環境変数 ADMIN_API_TOKEN と一致するか確認
    # 本番環境ではRenderの管理画面で設定します
    admin_token = if Rails.env.production?
      ENV.fetch("ADMIN_API_TOKEN")
    else
      ENV.fetch("ADMIN_API_TOKEN", "development_token")
    end

    unless token == admin_token
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
