every 10.minutes do
  rake "stats:fetch"
end

every 1.day, at: '4:30 am' do
  rake "stats:clear"
end
