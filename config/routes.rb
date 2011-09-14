BotbVoting::Application.routes.draw do
  
  resources :votes do
    collection do 
      get 'status'
    end
  end
  
  resources :sms_votes
   
end
