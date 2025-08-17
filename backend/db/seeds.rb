require 'yaml'

# データベースの既存データをクリア
PostTag.destroy_all
Post.destroy_all
Tag.destroy_all

puts "Cleared existing Posts and Tags."

# Markdownファイルのパス
posts_path = Rails.root.join('content', 'posts')

# Markdownファイルを読み込み、PostとTagを作成
Dir.glob(File.join(posts_path, '*.md')).each do |file_path|
  file_content = File.read(file_path)

  # フロントマターとコンテンツを分離
  match = file_content.match(/---(.*?)---(.*)/m)
  next unless match

  begin
    frontmatter = YAML.safe_load(match[1])
    content = match[2].strip

    # タグを作成または取得
    tags = frontmatter['tags'].map do |tag_name|
      Tag.find_or_create_by!(name: tag_name)
    end

    # 投稿を作成
    post = Post.create!(
      title: frontmatter['title'],
      published_at: frontmatter['published_at'],
      image_url: frontmatter['image_url'],
      reading_time: frontmatter['reading_time'],
      content: content
    )

    # 投稿にタグを関連付ける
    post.tags = tags
  rescue => e
    puts "Error processing file #{file_path}: #{e.message}"
  end
end

puts "Seeded #{Post.count} posts and #{Tag.count} tags from markdown files."

# プロジェクトのシードデータ作成
Project.find_or_create_by!(name: "Project Test1") do |project|
  project.duration = "3 months"
  project.tech_stack = "Next.js, TypeScript, Tailwind CSS"
  project.description = "test1"
  project.github_link = "https://github.com/example/project-alpha"
  project.demo_link = "https://demo.example.com/project-alpha"
  project.image_url = "/images/enje_yoko.jpg"
end

Project.find_or_create_by!(name: "Project Test2") do |project|
  project.duration = "6 months"
  project.tech_stack = "Ruby on Rails, PostgreSQL, React"
  project.description = "test2"
  project.github_link = "https://github.com/example/project-beta"
  project.demo_link = "https://demo.example.com/project-beta"
  project.image_url = "/images/enje_yoko.jpg"
end

puts "Seeded #{Project.count} projects."