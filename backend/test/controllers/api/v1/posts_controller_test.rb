require "test_helper"

class Api::V1::PostsControllerTest < ActionDispatch::IntegrationTest
  test "一覧は公開記事だけを新しい順に返す" do
    get api_v1_posts_url, as: :json
    assert_response :success
    body = response.parsed_body
    assert_equal %w[hello-world older-post], body["data"].map { _1["slug"] }
    assert_equal({ "page" => 1, "per" => 20, "total" => 2, "total_pages" => 1 }, body["meta"])
    assert_nil body["data"].first["body_html"]
    assert_equal [ "ruby" ], body["data"].first["tags"].map { _1["slug"] }
  end

  test "一覧はタグとページで絞り込める" do
    get api_v1_posts_url(tag: "ruby", per: 1, page: 2), as: :json
    assert_response :success
    assert_equal [ "older-post" ], response.parsed_body["data"].map { _1["slug"] }
    assert_equal 2, response.parsed_body.dig("meta", "total_pages")
  end

  test "一覧にはキャッシュヘッダーが付く" do
    get api_v1_posts_url, as: :json
    assert_match(/public/, response.headers["Cache-Control"])
    assert_match(/s-maxage=60/, response.headers["Cache-Control"])
  end

  test "詳細は本文と目次と前後の記事を返す" do
    get api_v1_post_url("hello-world"), as: :json
    assert_response :success
    data = response.parsed_body["data"]
    assert_equal "はじめての記事", data["title"]
    assert_includes data["body_html"], "<h1"
    assert_equal({ "slug" => "older-post", "title" => "古い記事" }, data["previous_post"])
    assert_nil data["next_post"]
    assert response.headers["ETag"].present?
  end

  test "詳細は ETag が一致すれば 304 を返す" do
    get api_v1_post_url("hello-world"), as: :json
    get api_v1_post_url("hello-world"), as: :json, headers: { "If-None-Match" => response.headers["ETag"] }
    assert_response :not_modified
  end

  test "下書きと予約投稿と存在しない slug は 404" do
    %w[draft-post scheduled-post nothing].each do |slug|
      get api_v1_post_url(slug), as: :json
      assert_response :not_found
      assert_equal "not_found", response.parsed_body.dig("error", "code")
    end
  end
end
