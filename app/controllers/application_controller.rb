class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :process_params

  private

  def json_collection
    ActiveModel::Serializer::CollectionSerializer
  end

  def set_blanc_values_to_nil!(prms)
    prms.keys.each do |key|
      val = prms[key]
      next if val.nil?
      next if val.is_a?(Array)
      prms[key] = nil unless val.present?
      set_blanc_values_to_nil!(val) if val.is_a? Hash
    end
  end

  def process_params
    set_blanc_values_to_nil!(params)
  end

  def check_regular
    redirect_to '/dashboard' if current_user&.admin?
  end

  def check_admin
    redirect_to '/home' unless current_user&.admin?
  end
end
