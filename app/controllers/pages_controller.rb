class PagesController < ApplicationController
  before_action :check_regular, only: :home
  before_action :check_admin, except: :home

  def home
    machines = Machine.includes(:stat, :user, :template).where(user: current_user).order(id: :desc)
    gon.machines = json_collection.new(machines, each_serializer: MachineSerializer)
    templates = Template.where(user_id: current_user.id).order(id: :desc)
    gon.templates = json_collection.new(templates, each_serializer: TemplateSerializer)
  end

  def dashboard
    @places = Place.includes(machines: :stat).all
  end

  def account
  end

end
