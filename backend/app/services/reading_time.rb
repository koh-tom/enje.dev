# 本文から読了時間（分）を推定する。
# 日本語は 1 分 500 文字、英語は 1 分 200 語として合算する。
module ReadingTime
  JAPANESE = /[\p{Hiragana}\p{Katakana}\p{Han}。、「」]/
  JP_CHARS_PER_MINUTE = 500
  EN_WORDS_PER_MINUTE = 200

  def self.minutes(markdown)
    text = markdown.to_s.gsub(/```.*?```/m, "").gsub(/[#>*_`\[\]()!-]/, " ")
    jp_chars = text.scan(JAPANESE).size
    en_words = text.gsub(JAPANESE, " ").split.size
    [ (jp_chars.to_f / JP_CHARS_PER_MINUTE + en_words.to_f / EN_WORDS_PER_MINUTE).ceil, 1 ].max
  end
end
