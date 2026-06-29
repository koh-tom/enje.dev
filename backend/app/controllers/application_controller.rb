class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  rescue_from ActiveRecord::RecordNotFound do
    render_error(:not_found, "見つかりませんでした", status: :not_found)
  end

  rescue_from ActionController::ParameterMissing, ActiveRecord::RecordInvalid do |error|
    render_error(:invalid, error.message, status: :unprocessable_content)
  end

  private

  def render_error(code, message, status:, details: nil)
    body = { error: { code:, message: } }
    body[:error][:details] = details if details
    render json: body, status:
  end

  # Authorization: Bearer <ADMIN_API_TOKEN>
  def authenticate_admin!
    authenticated = authenticate_with_http_token do |token, _options|
      ActiveSupport::SecurityUtils.secure_compare(token, ENV.fetch("ADMIN_API_TOKEN"))
    end
    render_error(:unauthorized, "認証が必要です", status: :unauthorized) unless authenticated
  end

  # 公開 API のキャッシュヘッダー。CDN と Next.js の fetch キャッシュに効かせる
  def public_cache(max_age: 60, stale: 600)
    response.cache_control.replace(public: true, max_age:, extras: [ "s-maxage=#{max_age}", "stale-while-revalidate=#{stale}" ])
  end
end
