class PagesController < ApplicationController
  before_action :check_regular, only: :home
  before_action :check_admin, except: :home


  def home
  end

  def dashboard
    @places = Place.all
  end

  def account
  end

end
