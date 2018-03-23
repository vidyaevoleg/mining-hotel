module Machines
  class SaveTemplate < ::ApplicationInteraction
    attr_reader :template

    object :user, class: User
    string :url1
    string :url2, default: nil
    string :url3, default: nil
    string :worker1
    string :worker2, default: nil
    string :worker3, default: nil
    string :password1
    string :password2, default: nil
    string :password3, default: nil
    boolean :fan, default: false
    string :fan_value, default: nil
    integer :freq, default: 0

    def execute
      @template = Template.create(inputs)
      errors.merge!(template.errors)
      self
    end

    def to_model
      template
    end

  end
end
