class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch("MAIL_FROM", "enje.dev <noreply@enje.dev>")
  layout "mailer"
end
