module Machines
  class UpdateTemplateRemote < ::ApplicationInteraction
    object :machine, class: Machine
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
      params = {template: inputs.except(:machine)}
      url = "#{place.url}/api/machines/#{machine.system_id}/update_template"
      begin
        RestClient.put(url, params, {user: 'hotel'})
      rescue
        errors.add(:machine, "#{machine.id} не отвечает" )
      end
      self
    end

    private

    def place
      @place ||= machine.hotel
    end
  end
end
