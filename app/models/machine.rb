class Machine < ApplicationRecord
  belongs_to :user
  belongs_to :stat, optional: true
  has_one :template, dependent: :destroy
  has_many :stats, dependent: :destroy
  validates :place, :model, presence: true

  enum model: {"D3": 0, "L3": 1, "M3": 2, "S9": 3}

  CHIP_MAP = {
    'M3' => 3,
    'L3' => 4,
    'D3' => 3,
    'S9' => 3
  }

  def url
    "http://#{ip}"
  end

end
