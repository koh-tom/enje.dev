# 開発用の初期データは content/ の Markdown から作る
result = ContentSync.new.call
puts "seeded posts: #{result.posts}, projects: #{result.projects}"
