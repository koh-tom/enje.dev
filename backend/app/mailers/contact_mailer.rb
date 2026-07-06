class ContactMailer < ApplicationMailer
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
