class AnalyzerJob < ApplicationJob
  queue_as :default

  def perform(machine_id)
    machine = Machine.find(machine_id)
    Remote::AnalyzeStats.call(machine)
  end
end
