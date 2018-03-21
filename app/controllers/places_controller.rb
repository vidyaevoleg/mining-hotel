class PlacesController < ApplicationController
  before_action :check_admin

  def show
    place = Place.includes(machines: :user).find(params[:id])
    @place = PlaceShowDecorator.new(place)
    machines = place.machines.order(id: :desc)
    gon.machines = json_collection(machines, each_serializer: MachineSerializer)
    templates = Template.where(user_id: current_user.id).order(id: :desc)
    gon.templates = json_collection(templates, each_serializer: TemplateSerializer)
  end
end
