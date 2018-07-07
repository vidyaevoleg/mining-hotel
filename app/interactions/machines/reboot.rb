module Machines
  class Reboot < ::ApplicationInteraction
    object :machine

    def to_model
      machine.reload
    end

    def execute
      url = "#{place.url}/api/machines/#{machine.system_id}/reboot"
      begin
        RestClient.put(url, {}, {user: 'hotel'})
      rescue
        errors.add(:machine, "#{machine.id} не отвечает")
      end
      self
    end

    private

    def place
      @place ||= machine.hotel
    end
  end
end
