require 'telegram/bot'

class Notifier
  class << self
    def shut_down(machine)
      write("Асик #{machine.model} на месте '#{machine.place}' отель #{machine.hotel.name} не работает")
    end

    def turn_on(machine)
      write("Асик #{machine.model} на месте '#{machine.place}' отель #{machine.hotel.name} вернулся в строй")
    end

    def write(message)
      token = '513352298:AAET6A2tCe-dc5eVXRizuo80o0OtzH8RXl8'
      chat_id = '-265831084'#'-254088467'
      Telegram::Bot::Client.run(token) do |bot|
        bot.api.send_message(chat_id: chat_id, text: message)
      end
    end
  end
end
