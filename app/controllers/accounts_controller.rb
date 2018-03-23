class AccountsController < ApplicationController
  before_action :check_admin
  before_action :set_user, only: [:update, :invite, :show]
  def index
    @users = UserIndexDecorator.decorate_collection(User.all)
  end

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params.merge(password: SecureRandom.hex.first(8)))
    if @user.valid?
      flash[:success] = 'Пользователь создан'
      redirect_to '/accounts'
    else
      flash[:danger] = @user.errors.full_messages.join(', ')
      redirect_to '/accounts/new'
    end
  end

  def update

  end

  def show
    user = User.find(params[:id])
    machines = Machine.includes(:stat, :user, :template).where(user: user).order(id: :desc)
    gon.machines = json_collection.new(machines, each_serializer: MachineSerializer)
    templates = Template.where(user_id: user.id).order(id: :desc)
    gon.templates = json_collection.new(templates, each_serializer: TemplateSerializer)
    render template: 'pages/home'
  end

  def invite
    Users::Invite.run!(user: @user)
    flash[:success] = 'Пользователь приглашен'
    redirect_to '/accounts'
  end

  def edit
  end

  def destroy

  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:email, :name)
  end
end
