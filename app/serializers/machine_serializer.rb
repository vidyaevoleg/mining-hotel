class MachineSerializer < ApplicationSerializer
  attributes :ip,
    :model,
    :id,
    :place,
    :serial,
    :url,
    :hashrate,
    :temperatures,
    :success,
    :active,
    :time,
    :user_id,
    :blocks_count

  has_one :template, serializer: TemplateSerializer do
    object.template
  end

  def stat
    @_stat ||= object.stat
  end

  def temperatures
    stat&.temperatures&.reject {|v| v == 0} || []
  end

  def active
    stat&.active
  end

  def success
    stat&.success
  end

  def hashrate
    stat&.hashrate
  end

  def time
    stat&.created_at&.strftime("%H:%M %d/%m/%y")
  end

end
