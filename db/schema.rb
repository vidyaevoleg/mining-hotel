# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180321171944) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "machines", force: :cascade do |t|
    t.integer "model", default: 0
    t.string "ip"
    t.string "place"
    t.string "serial"
    t.bigint "stat_id"
    t.bigint "place_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "system_id"
    t.integer "user_id"
    t.integer "blocks_count", default: 0
    t.index ["place_id"], name: "index_machines_on_place_id"
    t.index ["stat_id"], name: "index_machines_on_stat_id"
  end

  create_table "places", force: :cascade do |t|
    t.string "name"
    t.string "url"
    t.integer "success_count"
    t.integer "error_count"
    t.integer "warning_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "state", default: 0
  end

  create_table "stats", force: :cascade do |t|
    t.integer "blocks"
    t.decimal "hashrate"
    t.boolean "success"
    t.boolean "active", default: false
    t.text "temperatures"
    t.bigint "machine_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["machine_id"], name: "index_stats_on_machine_id"
  end

  create_table "templates", force: :cascade do |t|
    t.string "url1"
    t.string "worker1"
    t.string "password1"
    t.string "url2"
    t.string "worker2"
    t.string "password2"
    t.string "url3"
    t.string "worker3"
    t.string "password3"
    t.boolean "fan", default: false
    t.integer "fan_value", default: 100
    t.integer "freq", default: 400
    t.bigint "machine_id"
    t.bigint "user_id"
    t.string "name"
    t.index ["machine_id"], name: "index_templates_on_machine_id"
    t.index ["user_id"], name: "index_templates_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "role", default: 0
    t.string "name"
    t.boolean "invited", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
