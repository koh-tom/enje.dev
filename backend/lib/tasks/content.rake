namespace :content do
  desc "content/ の Markdown を DB に反映する"
  task sync: :environment do
    result = ContentSync.new.call
    puts "posts: #{result.posts}, projects: #{result.projects}"
    puts "unpublished: #{result.unpublished.join(', ')}" if result.unpublished.any?
  rescue ArgumentError => e
    abort e.message
  end

  desc "content/ の Markdown を検証する（CI 用）"
  task lint: :environment do
    errors = ContentSync.new.lint
    if errors.any?
      puts errors
      abort "#{errors.size} 件のエラー"
    end
    puts "content: OK"
  end

  desc "記事またはプロジェクトの雛形を作る。例: content:new[post,my-slug,タイトル]"
  task :new, [ :type, :slug, :title ] => :environment do |_, args|
    type, slug, title = args[:type], args[:slug], args[:title]
    abort "使い方: bin/rails 'content:new[post|project,slug,タイトル]'" unless %w[post project].include?(type) && slug.present?
    abort "slug は小文字英数字とハイフンのみ" unless slug.match?(Publishable::SLUG_FORMAT)

    title ||= slug
    today = Date.current.iso8601
    if type == "post"
      path = Rails.root.join("content", "posts", "#{today}-#{slug}.md")
      body = <<~MD
        ---
        title: "#{title}"
        published_at: #{today}
        draft: true
        tags: []
        excerpt: ""
        cover_image: ""
        ---

        ## はじめに

      MD
    else
      position = Dir.glob(Rails.root.join("content", "projects", "*.md")).size + 1
      path = Rails.root.join("content", "projects", format("%02d-%s.md", position, slug))
      body = <<~MD
        ---
        name: "#{title}"
        summary: ""
        period: "#{Date.current.strftime('%Y.%m')} -"
        tech_stack: []
        github: ""
        demo: ""
        cover_image: ""
        draft: true
        ---

        ## 概要

      MD
    end

    abort "#{path} は既にあります" if path.exist?
    path.dirname.mkpath
    path.write(body)
    puts "created #{path.relative_path_from(Rails.root)}"
  end
end
