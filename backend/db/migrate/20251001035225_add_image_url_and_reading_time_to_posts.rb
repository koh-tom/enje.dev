class AddImageUrlAndReadingTimeToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :image_url, :string
    add_column :posts, :reading_time, :integer
  end
end
