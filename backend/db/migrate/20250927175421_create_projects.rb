class CreateProjects < ActiveRecord::Migration[8.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :duration
      t.string :tech_stack
      t.text :description
      t.string :github_link
      t.string :demo_link

      t.timestamps
    end
  end
end
