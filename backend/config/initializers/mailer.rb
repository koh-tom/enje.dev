# メール送信は Resend（本番）。開発・テストでは送信せず ActionMailer::Base.deliveries に溜める。
# 本番でも RESEND_API_KEY と CONTACT_TO が無ければ送信を無効化し、お問い合わせ API は 503 を返す
# （その判定は ContactMailer.configured?、リクエスト時に呼ばれるので安全）。
#
# ここでは ENV を直接見る。config/initializers は Zeitwerk のオートロードが
# 確実に使える保証がなく、app/ 配下のクラス（ContactMailer など）を参照すると
# 環境によって NameError になりうるため。
mail_configured = ENV["RESEND_API_KEY"].present? && ENV["CONTACT_TO"].present?

Rails.application.configure do
  if Rails.env.production? && mail_configured
    Resend.api_key = ENV.fetch("RESEND_API_KEY")
    config.action_mailer.delivery_method = :resend
  else
    config.action_mailer.delivery_method = :test
    if Rails.env.production?
      Rails.logger.warn("RESEND_API_KEY / CONTACT_TO が未設定のため、お問い合わせメールは送信されません")
    end
  end
end
