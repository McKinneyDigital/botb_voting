class SmsVotesController < ApplicationController
  before_filter :connect_twilio, :only => :create

  def create
    if APP_CONFIG['admins'].include?(params[:From].to_i)
      return if command
    end
    vote
  end

  private
  
  def require_twilio
    data = request.url
    data << request.request_parameters.sort { |a,b| a[0].to_s <=> b[0].to_s }.inject("") do |result, p|
      result << p[0].to_s + p[1]
      result
    end

    digest = OpenSSL::Digest::Digest.new("sha1")
    expected = Base64.encode64(OpenSSL::HMAC.digest(digest, APP_CONFIG["twilio"]["token"], data)).strip
    
    redirect_to votes_url unless request.headers["X-Twilio-Signature"] == expected
  end

  def command
    @command = Command.new :phone_number => params[:From], :message => params[:Body]
    if @command.save
      render :xml => Twilio::Verb.sms("Command accepted."), :status => 200
      return @command 
    end

    nil
  end

  def vote
    @vote = SmsVote.new :phone_number => params[:From], :message => params[:Body]
    if @vote.save
      render :xml => Twilio::Verb.sms("You rock! Thanks for voting."), :status => 200
    else
      render :text => "", :status => 400
    end
  end
end
