defmodule Taskarr.Web.TeamView do
  use Taskarr.Web, :view
  alias Taskarr.Web.TeamView

  def render("index.json", %{teams: teams}) do
    %{data: render_many(teams, TeamView, "team.json")}
  end

  def render("show.json", %{team: team}) do
    %{data: render_one(team, TeamView, "team.json")}
  end

  def render("team.json", %{team: team}) do
    %{
      id: team.id,
      name: team.name,
      teamlid_id: team.teamlid_id,
    }
  end
end
