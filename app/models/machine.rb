class Machine < ApplicationRecord
  belongs_to :user
  belongs_to :stat, optional: true
  belongs_to :hotel, class_name: Place, foreign_key: :place_id
  has_one :template, dependent: :destroy
  has_many :block_stats, dependent: :destroy
  has_many :stats, dependent: :destroy
  validates :place, :model, presence: true


  enum model: {"D3": 0, "L3": 1, "M3": 2, "S9": 3, "A3": 4, "DM22": 5}

  def url
    "http://#{ip}"
  end
end
