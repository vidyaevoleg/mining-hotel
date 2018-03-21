class Place < ApplicationRecord
  has_many :machines
  enum state: {error: 0, success: 1}
end
