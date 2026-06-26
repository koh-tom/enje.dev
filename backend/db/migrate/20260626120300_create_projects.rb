class CreateProjects < ActiveRecord::Migration[8.1]
  def change
    create_table :projects do |t|
      t.string :slug, null: false
      t.string :name, null: false
      t.string :summary, null: false, default: ""
      t.text :body_markdown, null: false, default: ""
      t.text :body_html, null: false, default: ""
      t.string :period
      t.string :tech_stack, array: true, null: false, default: []
      t.string :github_url
      t.string :demo_url
      t.string :cover_image
      t.integer :status, null: false, default: 0
      t.integer :position, null: false, default: 0
      t.string :source_path
      t.timestamps
    end
    add_index :projects, :slug, unique: true
    add_index :projects, [ :status, :position ]
  end
end
