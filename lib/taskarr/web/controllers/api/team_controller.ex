defmodule Taskarr.Web.TeamController do
  use Taskarr.Web, :controller

  alias Taskarr.Accounts
  alias Taskarr.Companies
  alias Taskarr.Companies.Team

  action_fallback Taskarr.Web.FallbackController

  def index(conn, _params) do
    teams = Companies.list_teams()
    render(conn, "index.json", teams: teams)
  end

  def index_by_company(conn, %{"id" => id}) do
    company = Companies.get_company!(id)
    user = Accounts.get_current_user(conn)

    if user.id != company.director_id do
      raise "Permission denied"
    end

    teams = Companies.list_teams_by_company(company)
    render(conn, "index.json", teams: teams)
  end

  def create(conn, %{"team" => team_params}) do
    user = Accounts.get_current_user(conn)
    company = Companies.get_company!(team_params["company_id"])
      
    if user.id != company.director_id do
      raise "Permission denied" 
    end

    with {:ok, %Team{} = team} <- Companies.create_team(team_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", team_path(conn, :show, team))
      |> render("show.json", team: team)
    end
  end

  def show(conn, %{"id" => id}) do
    team = Companies.get_team!(id)
    render(conn, "show.json", team: team)
  end

  def update(conn, %{"id" => id, "team" => team_params}) do
    team = Companies.get_team!(id)
    company = Companies.get_company!(team.company_id)
    user = Accounts.get_current_user(conn)

    if user.id != company.director_id do
      {:error, :unprocessable_entity}

    else

      with {:ok, %Team{} = team} <- Companies.update_team(team, team_params) do
        render(conn, "show.json", team: team)
      end
    end
  end

  def delete(conn, %{"id" => id}) do
    team = Companies.get_team!(id)
    company = Companies.get_company!(team.company_id)

    with user = Accounts.get_current_user(conn),
         {:ok, %Team{}} <- Companies.delete_team(team) do

      if user.id != company.director_id do
        raise "Permission denied"
      end

      send_resp(conn, :no_content, "")
    end
  end
end
