defmodule Taskarr.Web.UserController do
  use Taskarr.Web, :controller

  alias Taskarr.Accounts
  alias Taskarr.Accounts.User

  action_fallback Taskarr.Web.FallbackController

  def create(conn, user_params) do
    with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
      new_conn = Accounts.sign_in_user(conn, user) 
      jwt = Accounts.get_current_token(new_conn)

      new_conn
      |> put_status(:created)
      |> render(Taskarr.Web.SessionView, "show.json", user: user, jwt: jwt)
    end
  end
end
