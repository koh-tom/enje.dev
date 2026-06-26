# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_06_26_120300) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "post_tags", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "post_id", null: false
    t.bigint "tag_id", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id", "tag_id"], name: "index_post_tags_on_post_id_and_tag_id", unique: true
    t.index ["post_id"], name: "index_post_tags_on_post_id"
    t.index ["tag_id"], name: "index_post_tags_on_tag_id"
  end

  create_table "posts", force: :cascade do |t|
    t.text "body_html", default: "", null: false
    t.text "body_markdown", default: "", null: false
    t.string "cover_image"
    t.datetime "created_at", null: false
    t.text "excerpt", default: "", null: false
    t.datetime "published_at"
    t.integer "reading_time", default: 1, null: false
    t.string "slug", null: false
    t.string "source_path"
    t.integer "status", default: 0, null: false
    t.string "title", null: false
    t.jsonb "toc", default: [], null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_posts_on_slug", unique: true
    t.index ["status", "published_at"], name: "index_posts_on_status_and_published_at"
  end

  create_table "projects", force: :cascade do |t|
    t.text "body_html", default: "", null: false
    t.text "body_markdown", default: "", null: false
    t.string "cover_image"
    t.datetime "created_at", null: false
    t.string "demo_url"
    t.string "github_url"
    t.string "name", null: false
    t.string "period"
    t.integer "position", default: 0, null: false
    t.string "slug", null: false
    t.string "source_path"
    t.integer "status", default: 0, null: false
    t.string "summary", default: "", null: false
    t.string "tech_stack", default: [], null: false, array: true
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_projects_on_slug", unique: true
    t.index ["status", "position"], name: "index_projects_on_status_and_position"
  end

  create_table "tags", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.string "slug", null: false
    t.datetime "updated_at", null: false
    t.index "lower((name)::text)", name: "index_tags_on_lower_name", unique: true
    t.index ["slug"], name: "index_tags_on_slug", unique: true
  end

  add_foreign_key "post_tags", "posts", on_delete: :cascade
  add_foreign_key "post_tags", "tags", on_delete: :cascade
end
