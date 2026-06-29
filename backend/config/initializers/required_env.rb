# 必須の環境変数が無ければ起動時に落とす。
# 本番で「起動はするが動かない」状態を避けるため。
REQUIRED_ENV = %w[ADMIN_API_TOKEN].freeze
REQUIRED_ENV_PRODUCTION = %w[DATABASE_URL SECRET_KEY_BASE FRONTEND_URL REVALIDATE_SECRET].freeze

missing = REQUIRED_ENV.select { |key| ENV[key].blank? }
missing += REQUIRED_ENV_PRODUCTION.select { |key| ENV[key].blank? } if Rails.env.production?

if missing.any?
  raise "必須の環境変数が設定されていません: #{missing.join(', ')}（backend/.env.example を参照）"
end
