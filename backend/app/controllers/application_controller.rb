class ApplicationController < ActionController::API
  private

  def authenticate_admin!
    # Authorizationヘッダーからトークンを取得 (Bearer [TOKEN])
    auth_header = request.headers["Authorization"]
    token = auth_header.split(" ").last if auth_header

    # 環境変数 ADMIN_API_TOKEN と一致するか確認
    # 環境変数に設定されていない場合は、安全のため起動時（アクセス時）にエラーを発生させます
    admin_token = ENV.fetch("ADMIN_API_TOKEN")

    unless token == admin_token
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
