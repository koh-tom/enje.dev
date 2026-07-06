# お問い合わせフォームの入力。DB には保存せずメールで送る
class Contact
  include ActiveModel::Model
  include ActiveModel::Attributes

  attribute :name, :string
  attribute :email, :string
  attribute :subject, :string
  attribute :message, :string
  attribute :website, :string # honeypot。人間は入力しない

  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, length: { maximum: 254 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :subject, presence: true, length: { maximum: 100 }
  validates :message, presence: true, length: { maximum: 2000 }
  validates :website, absence: true

  def to_h = { name:, email:, subject:, message: }
end
