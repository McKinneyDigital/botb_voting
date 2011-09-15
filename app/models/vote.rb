class Vote < ActiveRecord::Base
  belongs_to :band
  validates_presence_of :band_id
end
