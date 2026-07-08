require "net/http"

# Next.js の ISR キャッシュをタグ単位で破棄する。
# 失敗しても例外は投げず、ログに残すだけ（コンテンツ反映は次回の revalidate で追いつく）
class Revalidator
  ALL_TAGS = %w[posts projects tags].freeze
  TIMEOUT = 5

  def initialize(tags)
    @tags = Array(tags) & ALL_TAGS
  end

  def call
    return false if @tags.empty? || ENV["FRONTEND_URL"].blank? || ENV["REVALIDATE_SECRET"].blank?

    uri = URI.join(ENV.fetch("FRONTEND_URL"), "/api/revalidate")
    request = Net::HTTP::Post.new(uri, "Content-Type" => "application/json", "x-revalidate-secret" => ENV.fetch("REVALIDATE_SECRET"))
    request.body = { tags: @tags }.to_json

    response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https", open_timeout: TIMEOUT, read_timeout: TIMEOUT) do |http|
      http.request(request)
    end
    Rails.logger.info("revalidate #{@tags.join(',')} -> #{response.code}")
    response.is_a?(Net::HTTPSuccess)
  rescue StandardError => e
    Rails.logger.error("revalidate failed: #{e.class}: #{e.message}")
    false
  end
end
