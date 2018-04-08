class Remote::Fetch
  def self.call
    new.call
  end

  def initialize
  end

  def call
    Place.find_each do |place|
      url = "#{place.url}/api/machines"
      begin
        machines = JSON.parse(RestClient.get(url).body)
      rescue
        place_error!(place)
        next
      end
      clear(place, machines)
      machines.each do |opt|
        Remote::SaveMachine.call(opt.merge(place_id: place.id))
      end
      place_ok!(place)
    end
  end

  private

  def clear(place, machines)
    actual_ids = machines.map {|m| m["id"]}
    not_actual_machines = place.machines.where.not(system_id: actual_ids)
    not_actual_machines.destroy_all
  end

  def place_error!(place)
    place.error!
  end

  def place_ok!(place)
    stat_ids = place.reload.machines.pluck(:stat_id)
    stats = Stat.where(id: stat_ids)
    success_count = stats.where(success: true, active: true).count
    warning_count = stats.where(success: false, active: true).count
    error_count = stats.where(success: false, active: false).count
    place.update!(
      state: :success,
      success_count: success_count,
      warning_count: warning_count,
      error_count: error_count
    )
    place.success!
  end
end
