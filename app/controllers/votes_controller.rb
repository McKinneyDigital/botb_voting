class VotesController < ApplicationController
  def index
     @bands = Band.find :all
     @total_votes = Vote.count
   end

   def create
     @vote = Vote.new params[:vote]
     if @vote.save
       redirect_to votes_url
     else
       index
       render :index
     end
   end

   def status
     if Command.can_vote?
       last_d = Command.find(:last)
       votes = Band.find(:all).inject({}) do |result, c|
         result[c.id] = c.votes.find(:all, :conditions => ["created_at >= ?", last_d.created_at]).count
         result
       end

       remaining = 10 - ((Time.now - last_d.created_at).round / 60)

       render :json => {:status => "on", :time_remaining => remaining, :total => Vote.find(:all, :conditions => ["created_at >= ?", last_d.created_at]).count, :bands => votes}.to_json
     else
       render :json => {:status => "off"}.to_json
     end
   end
end
