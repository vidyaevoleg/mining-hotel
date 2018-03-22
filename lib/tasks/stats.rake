namespace :stats do
  task fetch: [:environment] do
    logger           = Logger.new(STDOUT)
    logger.level     = Logger::INFO
    Rails.logger     = logger

    Remote::Fetch.call
  end
  task clear: [:environment] do
    Stat.where("created_at < ?", 3.days.ago).destroy_all
  end
end
