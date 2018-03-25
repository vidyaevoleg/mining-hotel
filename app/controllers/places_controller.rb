class PlacesController < ApplicationController
  before_action :check_admin

  def show
    place = Place.includes(machines: [:user, :stat]).find(params[:id])
    @place = PlaceShowDecorator.new(place)
    machines = Machine.includes(:stat, :user, :template).where(place_id: place.id).order(id: :desc)
    gon.machines = json_collection.new(machines, each_serializer: MachineSerializer)
    templates = Template.where(user_id: current_user.id).order(id: :desc)
    gon.templates = json_collection.new(templates, each_serializer: TemplateSerializer)
    gon.users = User.all
  end
end
