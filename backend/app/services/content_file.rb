require "yaml"
require "date"

# content/ 配下の Markdown 1 ファイルを表す。フロントマターの検証も担う。
class ContentFile
  FRONTMATTER = /\A---\s*\n(.*?)\n---\s*\n?(.*)\z/m
  POST_FILENAME = /\A(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md\z/
  PROJECT_FILENAME = /\A(\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md\z/

  attr_reader :path, :type, :meta, :body, :errors

  def initialize(path, type:)
    @path = Pathname(path)
    @type = type
    @errors = []
    parse
  end

  def valid? = errors.empty?
  def slug = meta["slug"]
  def relative_path = path.relative_path_from(Rails.root).to_s

  # Post / Project の属性ハッシュに変換する
  def attributes
    type == :post ? post_attributes : project_attributes
  end

  private

  def parse
    match = path.read.match(FRONTMATTER)
    return errors << "#{relative_path}: フロントマター（--- で囲んだ YAML）がありません" unless match

    @meta = YAML.safe_load(match[1], permitted_classes: [ Date, Time ]) || {}
    @body = match[2].to_s.strip
    type == :post ? validate_post : validate_project
  rescue Psych::SyntaxError => e
    errors << "#{relative_path}: フロントマターの YAML が不正です（#{e.message}）"
  end

  def validate_post
    name_match = path.basename.to_s.match(POST_FILENAME)
    errors << "#{relative_path}: ファイル名は YYYY-MM-DD-slug.md にしてください" unless name_match
    meta["slug"] ||= name_match && name_match[2]
    meta["published_at"] ||= name_match && name_match[1]

    require_string("title")
    require_list("tags")
    optional_string("excerpt", "cover_image")
    optional_bool("draft")
    errors << "#{relative_path}: published_at が日付ではありません" unless meta["published_at"].to_s.match?(/\A\d{4}-\d{2}-\d{2}/)
  end

  def validate_project
    name_match = path.basename.to_s.match(PROJECT_FILENAME)
    errors << "#{relative_path}: ファイル名は NN-slug.md（NN は表示順）にしてください" unless name_match
    meta["slug"] ||= name_match && name_match[2]
    meta["position"] ||= name_match && name_match[1].to_i

    require_string("name")
    require_list("tech_stack")
    optional_string("summary", "period", "github", "demo", "cover_image")
    optional_bool("draft")
  end

  def require_string(*keys)
    keys.each { |k| errors << "#{relative_path}: #{k} は必須です" unless meta[k].is_a?(String) && meta[k].present? }
  end

  def optional_string(*keys)
    keys.each { |k| errors << "#{relative_path}: #{k} は文字列にしてください" if meta.key?(k) && !meta[k].nil? && !meta[k].is_a?(String) }
  end

  def require_list(key)
    errors << "#{relative_path}: #{key} は文字列の配列にしてください" unless meta[key].is_a?(Array) && meta[key].all?(String)
  end

  def optional_bool(key)
    errors << "#{relative_path}: #{key} は true / false にしてください" if meta.key?(key) && ![ true, false ].include?(meta[key])
  end

  def post_attributes
    {
      slug: meta["slug"],
      title: meta["title"],
      excerpt: meta["excerpt"].to_s,
      body_markdown: body,
      status: meta["draft"] ? :draft : :published,
      published_at: Time.zone.parse(meta["published_at"].to_s),
      cover_image: meta["cover_image"],
      source_path: relative_path
    }
  end

  def project_attributes
    {
      slug: meta["slug"],
      name: meta["name"],
      summary: meta["summary"].to_s,
      body_markdown: body,
      period: meta["period"],
      tech_stack: meta["tech_stack"],
      github_url: meta["github"],
      demo_url: meta["demo"],
      cover_image: meta["cover_image"],
      status: meta["draft"] ? :draft : :published,
      position: meta["position"].to_i,
      source_path: relative_path
    }
  end
end
