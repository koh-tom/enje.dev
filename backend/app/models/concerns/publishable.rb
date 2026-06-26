# 下書き / 公開の状態を持つモデル共通の振る舞い
module Publishable
  extend ActiveSupport::Concern

  SLUG_FORMAT = /\A[a-z0-9]+(?:-[a-z0-9]+)*\z/

  included do
    enum :status, { draft: 0, published: 1 }, default: :draft

    attr_readonly :slug

    validates :slug, presence: true, format: { with: SLUG_FORMAT }, uniqueness: true

    scope :visible, -> {
      # 開発環境では下書きも見せる（執筆中の確認用）
      Rails.env.development? ? all : published
    }
  end
end
