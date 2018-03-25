class Place < ApplicationRecord
  has_many :machines
  has_many :stats, through: :machines, source: :stat
  enum state: {error: 0, success: 1}
end
