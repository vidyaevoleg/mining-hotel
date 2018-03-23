module Machines
  class UpdateTemplate < ::ApplicationInteraction
    attr_reader :template

    object :machine, class: Machine
    integer :template_id, default: nil

    string :url1
    string :url2, default: nil
    string :url3, default: nil
    string :worker1
    string :worker2, default: nil
    string :worker3, default: nil
    string :password1
    string :password2, default: nil
    string :password3, default: nil
    boolean :fan, default: false
    string :fan_value, default: nil
    integer :freq, default: 0

    def execute
      compose(UpdateTemplateRemote, remote_params)
      return if invalid?

      if template_id && machine.template_id != template_id
        if _template = user.templates.find_by(id: template_id)
        # change template machine_id
          _template.update(machine: machine)
        else
          errors.add(template_id: :invalid)
        end
      else
        #update_current_template
        @template = set_template
        errors.merge!(template.errors)
      end
      self
    end

    def to_model
      machine.reload
    end

    private

    def set_template
      @_template ||= begin
        if machine.template
          machine.template.update(inputs.except(:machine, :template_id))
          _template = machine.template
        else
          _template = Template.create(inputs.except(:template_id))
        end
        _template
      end
    end

    def remote_params
      if template_id && machine.template_id != template_id && _template = user.templates.find_by(id: template_id)
        _template.to_params.merge(machine: machine)
      else
        inputs.except(:template_id)
      end
    end

    def user
      @user ||= machine.user
    end
  end
end
