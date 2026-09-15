class ContactMailer < ApplicationMailer
  # 送信に必要な設定が揃っているか。本番では Resend の鍵と宛先が必要
  def self.configured?
    return ENV["CONTACT_TO"].present? unless Rails.env.production?

    ENV["RESEND_API_KEY"].present? && ENV["CONTACT_TO"].present?
  end

  # お問い合わせをサイト管理者へ転送する
  def notify
    @contact = params[:contact].symbolize_keys
    mail(
      to: ENV.fetch("CONTACT_TO"),
      reply_to: @contact[:email],
      subject: "[enje.dev] #{@contact[:subject]}"
    )
  end
end
