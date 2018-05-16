class PagesController < ApplicationController
  before_action :check_regular, only: [:home]
  before_action :check_admin, except: [:home, :landing]
  skip_before_action :authenticate_user!, only: :landing

  def home
    machines = Machine.includes(:stat, :user, :template).where(user: current_user).order(id: :desc)
    gon.machines = json_collection.new(machines, each_serializer: MachineSerializer)
    templates = Template.where(user_id: current_user.id).order(id: :desc)
    gon.templates = json_collection.new(templates, each_serializer: TemplateSerializer)
  end

  def dashboard
    @places = Place.where.not(id: current_user.black_list).includes(machines: :stat).all
  end

  def landing
    @login_url = '/home'
  end

  def stats
    render csv: BlockStatDecorator.to_csv(user: current_user), filename: "Blocks #{Time.zone.now.to_s}"
  end

  def account
  end

end
