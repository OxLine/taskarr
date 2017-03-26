defmodule Taskarr.Web.UserView do
  use Taskarr.Web, :view
  alias Taskarr.Web.UserView

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email,
    }
  end
end
