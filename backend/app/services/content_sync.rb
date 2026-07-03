# content/posts と content/projects の Markdown を DB に冪等反映する。
# - slug をキーに upsert
# - ファイルが消えたレコードは下書きに戻す（物理削除はしない）
class ContentSync
  Result = Data.define(:posts, :projects, :unpublished, :errors)

  def initialize(root: Rails.root.join("content"))
    @root = root
  end

  # 検証のみ。エラー文字列の配列を返す
  def lint
    files.flat_map(&:errors) + duplicate_slug_errors
  end

  def call
    errors = lint
    raise ArgumentError, errors.join("\n") if errors.any?

    posts = projects = 0
    unpublished = []

    Post.transaction do
      post_files = files.select { _1.type == :post }
      post_files.each { |file| upsert_post(file); posts += 1 }
      unpublished += unpublish_missing(Post, post_files.map(&:slug))

      project_files = files.select { _1.type == :project }
      project_files.each { |file| Project.find_or_initialize_by(slug: file.slug).update!(file.attributes.except(:slug)); projects += 1 }
      unpublished += unpublish_missing(Project, project_files.map(&:slug))
    end

    Result.new(posts:, projects:, unpublished:, errors: [])
  end

  private

  def files
    @files ||= Dir.glob(@root.join("posts", "*.md")).sort.map { ContentFile.new(_1, type: :post) } +
      Dir.glob(@root.join("projects", "*.md")).sort.map { ContentFile.new(_1, type: :project) }
  end

  def duplicate_slug_errors
    files.group_by { [ _1.type, _1.slug ] }.select { |_, v| v.size > 1 }.map do |(type, slug), dupes|
      "#{type} の slug \"#{slug}\" が重複しています: #{dupes.map(&:relative_path).join(', ')}"
    end
  end

  def upsert_post(file)
    post = Post.find_or_initialize_by(slug: file.slug)
    post.assign_attributes(file.attributes.except(:slug)) # slug は readonly
    post.tags = file.meta["tags"].map { Tag.find_or_create_by_name!(_1) }
    post.save!
  end

  # ファイルが無くなったレコードを下書きに戻し、slug を返す
  def unpublish_missing(model, present_slugs)
    missing = model.where.not(slug: present_slugs).where(status: :published)
    slugs = missing.pluck(:slug)
    missing.update_all(status: model.statuses[:draft], updated_at: Time.current)
    slugs
  end
end
