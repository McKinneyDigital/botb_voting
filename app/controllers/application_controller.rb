class ApplicationController < ActionController::Base
  protect_from_forgery
  
  private
  
  def connect_twilio
    Twilio.connect('ACaca54dd95c75ef61a189293145f7a85a', '0b0d40286a8bd813e3cbde03340c11d1')
  end
  
end
