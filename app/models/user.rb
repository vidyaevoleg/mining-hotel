class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :recoverable, :rememberable, :validatable, :trackable
  enum role: {regular: 0, admin: 1}
  has_many :templates
  has_many :machines
  serialize :black_list, Array
  # validates_confirmation_of :password, unless: :new_record?
end
