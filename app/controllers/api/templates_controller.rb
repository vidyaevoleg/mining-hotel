module Api
  class TemplatesController < ::Api::ApplicationController
    skip_before_action :authenticate_user!, only: :current
    
    def index
      templates = current_user.templates
      respond_with templates, each_serializer: TemplateSerializer
    end

    def current
      user = User.find_by(email: 'admin@nextblock.ru')
      templates = user.templates
      respond_with templates, each_serializer: TemplateSerializer
    end

    def create
      template = current_user.templates.create(template_params)
      respond_with template, serializer: TemplateSerializer, location: nil
    end

    def update
      template = current_user.templates.find(params[:id])
      template.update(template_params)
      respond_with template, serializer: TemplateSerializer, location: nil
    end

    def destroy
      template = current_user.templates.find(params[:id])
      if template.machine
        dup = template.dup
        dup.user_id = nil
        dup.machine_id = template.machine_id
        dup.save!
      end
      template.destroy!
      render json: {ok: :ok}
    end

    private

    def template_params
      params.require(:template).permit(
        :name,
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
