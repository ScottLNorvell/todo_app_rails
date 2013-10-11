TodoAppRails::Application.routes.draw do

  root to: 'todo_items#index'

  post  '/create_item' => 'todo_items#create', as: 'create_item'
  delete '/delete_item/:id' => 'todo_items#destroy', as: 'delete_item'
  post '/complete_item/:id' => 'todo_items#complete', as: 'complete_item'


end
