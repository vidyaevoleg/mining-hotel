class MachineSerializer < ApplicationSerializer
  attributes :ip,
    :model,
    :id,
    :place,
    :serial,
    :url,
    :hashrate,
    :temparatures,
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

  def temparatures
    stat&.temparatures
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
    stat&.created_at&.strftime("%H:%M %d:%m")
  end

end
