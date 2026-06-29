# ?page=1&per=20 で一覧をページ分割する
module Paginatable
  extend ActiveSupport::Concern

  DEFAULT_PER = 20
  MAX_PER = 100

  private

  def paginate(scope)
    page = [ params.fetch(:page, 1).to_i, 1 ].max
    per = params.fetch(:per, DEFAULT_PER).to_i.clamp(1, MAX_PER)
    total = scope.count
    records = scope.offset((page - 1) * per).limit(per)
    [ records, { page:, per:, total:, total_pages: (total.to_f / per).ceil } ]
  end
end
