job_type :rake, "cd :path && rake :task --silent :output"

every 3.minutes do
  rake "stats:fetch"
end

every 1.day, at: '4:30 am' do
  rake "stats:clear"
end
