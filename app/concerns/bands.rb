module Bands
  def self.included(base)
    base.extend Validations
  end

  module Validations
    def validates_band_code_presence_in(*attributes)
      validates_each(attributes) do |record, attr, value|
        if !Band.find(:all).detect { |c| c.code_in?(value) }
          record.errors.add attr, "should contain a valid band" 
        end
      end
    end
  end
end
