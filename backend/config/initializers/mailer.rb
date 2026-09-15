# メール送信は Resend（本番）。開発・テストでは送信せず ActionMailer::Base.deliveries に溜める。
# 本番でも RESEND_API_KEY と CONTACT_TO が無ければ送信を無効化し、お問い合わせ API は 503 を返す。
Rails.application.configure do
  if Rails.env.production? && ContactMailer.configured?
    Resend.api_key = ENV.fetch("RESEND_API_KEY")
    config.action_mailer.delivery_method = :resend
  else
    config.action_mailer.delivery_method = :test
    if Rails.env.production?
      Rails.logger.warn("RESEND_API_KEY / CONTACT_TO が未設定のため、お問い合わせメールは送信されません")
    end
  end
end
