class BlockStatDecorator < Draper::Decorator
  attr_reader :user

  def initialize(params={})
    @user = params[:user]
  end

  def self.to_csv(params={})
    stats = new(params).stats
    Stat.to_csv(headers: false, instances: stats)
  end

  def stats
    @stats ||= begin
      BlockStat.includes(:machine).where("machines.user_id = ?", user.id).references(:machines).map do |bs|
        Stat.new(bs)
      end.sort_by {|s| s.count}.reverse
    end
  end

  class Stat
    include SpreadsheetArchitect
    attr_reader :stat, :machine

    def initialize(stat)
      @stat = stat
      @machine = stat.machine
    end

    def spreadsheet_columns
      [
        ['Machine hotel', machine.hotel.name],
        ['Machine place', machine.place],
        ['Machine mac', machine.serial],
        ['Pool', stat.pool],
        ['Blocks count', count]
      ]
    end

    def count
      stat.count
    end
  end
end
