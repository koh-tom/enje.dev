class TagResource
  include Alba::Resource

  attributes :slug, :name

  attribute :posts_count, if: proc { params[:with_count] } do |tag|
    tag.respond_to?(:posts_count) ? tag.posts_count.to_i : nil
  end
end
