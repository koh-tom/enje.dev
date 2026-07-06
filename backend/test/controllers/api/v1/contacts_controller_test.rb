require "test_helper"

class Api::V1::ContactsControllerTest < ActionDispatch::IntegrationTest
  include ActionMailer::TestHelper

  VALID = { name: "太郎", email: "taro@example.com", subject: "件名", message: "本文" }.freeze

  test "正しい入力ならメールを送って 202" do
    assert_enqueued_emails 1 do
      post api_v1_contacts_url, params: { contact: VALID }, as: :json
    end
    assert_response :accepted
  end

  test "不正な入力は 422 と項目ごとのエラー" do
    post api_v1_contacts_url, params: { contact: VALID.merge(email: "bad", message: "") }, as: :json
    assert_response :unprocessable_content
    details = response.parsed_body.dig("error", "details")
    assert details["email"].any?
    assert details["message"].any?
  end

  test "honeypot が埋まっていたら 422" do
    assert_no_enqueued_emails do
      post api_v1_contacts_url, params: { contact: VALID.merge(website: "http://spam") }, as: :json
    end
    assert_response :unprocessable_content
  end

  test "contact パラメータが無ければ 422" do
    post api_v1_contacts_url, params: {}, as: :json
    assert_response :unprocessable_content
  end
end
