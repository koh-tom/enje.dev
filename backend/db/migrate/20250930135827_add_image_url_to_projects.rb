class AddImageUrlToProjects < ActiveRecord::Migration[8.0]
  def change
    add_column :projects, :image_url, :string
  end
end
