defmodule Taskarr.Web.SessionView do
  use Taskarr.Web, :view
  alias Taskarr.Web.SessionView
  
  def render("show.json", %{user: user, jwt: jwt}) do
    %{
      data: render_one(user, Taskarr.Web.UserView, "user.json"),
      meta: %{token: jwt}
    }
  end

  def render("delete.json", _) do
    %{ok: true}
  end
end
