class CreatePosts < ActiveRecord::Migration[8.1]
  def change
    create_table :posts do |t|
      t.string :slug, null: false
      t.string :title, null: false
      t.text :excerpt, null: false, default: ""
      t.text :body_markdown, null: false, default: ""
      t.text :body_html, null: false, default: ""
      t.jsonb :toc, null: false, default: []
      t.integer :status, null: false, default: 0
      t.datetime :published_at
      t.string :cover_image
      t.integer :reading_time, null: false, default: 1
      t.string :source_path
      t.timestamps
    end
    add_index :posts, :slug, unique: true
    add_index :posts, [ :status, :published_at ]
  end
end
