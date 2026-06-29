Rails.application.routes.draw do
  # ヘルスチェック。アプリが起動していれば 200
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :posts, only: %i[index show], param: :slug, constraints: { slug: /[^\/]+/ }
      resources :projects, only: %i[index show], param: :slug, constraints: { slug: /[^\/]+/ }
      resources :tags, only: :index
      resources :contacts, only: :create

      namespace :admin do
        post "revalidate", to: "revalidations#create"
        post "sync", to: "syncs#create"
      end
    end
  end
end
