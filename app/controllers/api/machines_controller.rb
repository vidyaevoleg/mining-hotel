module Api
  class MachinesController < ::Api::ApplicationController

    before_action :check_machine


    def update_template
      result = ::Machines::UpdateTemplate.run(template_params.merge(machine: @machine))
      respond_with result, serializer: MachineSerializer, location: nil
    end

    def reboot
      result = ::Machines::Reboot.run(machine: @machine)
      respond_with result, serializer: MachineSerializer, location: nil
    end

    private

    def machine_params
      params.require(:machine).permit(:model, :serial, :place, :ip, :user_id)
    end

    def check_machine
      @machine = Machine.find(params[:id])
      unless current_user.admin? || @machine.user_id == current_user.id
        unauthorized!
      end
    end

    def template_params
      params.require(:template).permit(
        :template_id,
        :url1,
        :url2,
        :url3,
        :worker1,
        :worker2,
        :worker3,
        :password1,
        :password2,
        :password3,
        :fan,
        :fan_value,
        :freq
      )
    end

  end
end
