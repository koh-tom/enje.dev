require "kramdown"
require "kramdown-parser-gfm"
require "rouge"

# Markdown を安全な HTML に変換する。
# 見出しの id を保持して目次（toc）も返す。
class MarkdownRenderer
  Result = Data.define(:html, :toc, :excerpt)

  # Rouge の出力を <pre class="highlight"><code> で包む（HTMLLegacy の代替）
  class CodeFormatter < Rouge::Formatters::HTML
    def initialize(_opts = {}) = super()

    def stream(tokens, &block)
      yield %(<pre class="highlight"><code>)
      super
      yield "</code></pre>"
    end
  end

  ALLOWED_TAGS = %w[
    p br hr strong em b i u s del ins mark small sub sup code pre kbd samp var
    h1 h2 h3 h4 h5 h6 blockquote ul ol li dl dt dd a img span div
    table thead tbody tfoot tr th td caption figure figcaption details summary
  ].freeze
  ALLOWED_ATTRIBUTES = %w[href src alt title id class lang dir width height start colspan rowspan align open].freeze

  def initialize(markdown)
    @markdown = markdown.to_s
  end

  def render
    document = Kramdown::Document.new(
      @markdown,
      input: "GFM",
      hard_wrap: false,
      syntax_highlighter: "rouge",
      syntax_highlighter_opts: { formatter: CodeFormatter },
      auto_ids: true
    )
    html = sanitize(document.to_html)
    Result.new(html:, toc: extract_toc(html), excerpt: extract_excerpt(html))
  end

  private

  def sanitize(html)
    Rails::HTML5::SafeListSanitizer.new.sanitize(html, tags: ALLOWED_TAGS, attributes: ALLOWED_ATTRIBUTES)
  end

  def extract_toc(html)
    Nokogiri::HTML5.fragment(html).css("h2, h3").filter_map do |node|
      next if node["id"].blank?
      { "id" => node["id"], "level" => node.name.delete("h").to_i, "text" => node.text.strip }
    end
  end

  def extract_excerpt(html, length: 160)
    text = Nokogiri::HTML5.fragment(html).css("p").map(&:text).join(" ").squish
    text.truncate(length, separator: /\s|。/)
  end
end
