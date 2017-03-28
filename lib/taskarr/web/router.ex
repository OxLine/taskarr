defmodule Taskarr.Web.Router do
  use Taskarr.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Taskarr.Web do
    pipe_through :api

    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh
    resources "/users", UserController, only: [:create]
    resources "/companies", CompanyController
    resources "/teams", TeamController
    resources "/employees", EmployeeController
    resources "/tasks", TaskController
  end

  scope "/", Taskarr.Web do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
  end
end
