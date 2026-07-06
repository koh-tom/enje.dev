# メール送信は Resend（本番）。開発・テストでは送信せず ActionMailer::Base.deliveries に溜める
Rails.application.configure do
  if Rails.env.production?
    Resend.api_key = ENV.fetch("RESEND_API_KEY")
    config.action_mailer.delivery_method = :resend
  else
    config.action_mailer.delivery_method = :test
  end
end
