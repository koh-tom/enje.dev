require "test_helper"

class ReadingTimeTest < ActiveSupport::TestCase
  test "短い本文は 1 分" do
    assert_equal 1, ReadingTime.minutes("短い。")
  end

  test "日本語 1000 文字は 2 分" do
    assert_equal 2, ReadingTime.minutes("あ" * 1000)
  end

  test "英語 400 語は 2 分" do
    assert_equal 2, ReadingTime.minutes("word " * 400)
  end

  test "コードブロックは数えない" do
    assert_equal 1, ReadingTime.minutes("```\n" + ("code " * 1000) + "\n```")
  end
end
