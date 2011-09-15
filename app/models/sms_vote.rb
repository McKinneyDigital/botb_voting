class SmsVote < Vote
  include Sms
  include Bands

  validates_band_code_presence_in :message

  def parse_message(str)
    cand = Band.find(:all).detect { |c| c if c.code_in?(str) }
    self.band = cand if cand
  end
end
