require_relative "boot"

# 使うフレームワークだけを読み込む（rails/all は使わない）
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "rails/test_unit/railtie"

Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    config.load_defaults 8.1

    config.autoload_lib(ignore: %w[assets tasks])

    config.time_zone = "Tokyo"
    config.active_record.default_timezone = :utc

    # API 専用。セッションや Cookie のミドルウェアは載せない
    config.api_only = true

    config.middleware.use Rack::Attack
  end
end
