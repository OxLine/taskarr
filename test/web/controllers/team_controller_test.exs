defmodule Taskarr.Web.TeamControllerTest do
  use Taskarr.Web.ConnCase

  alias Taskarr.Companies
  alias Taskarr.Companies.Team

  @create_attrs %{name: "some name"}
  @update_attrs %{name: "some updated name"}
  @invalid_attrs %{name: nil}

  def fixture(:team) do
    {:ok, team} = Companies.create_team(@create_attrs)
    team
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, team_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "creates team and renders team when data is valid", %{conn: conn} do
    conn = post conn, team_path(conn, :create), team: @create_attrs
    assert %{"id" => id} = json_response(conn, 201)["data"]

    conn = get conn, team_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id,
      "name" => "some name"}
  end

  test "does not create team and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, team_path(conn, :create), team: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates chosen team and renders team when data is valid", %{conn: conn} do
    %Team{id: id} = team = fixture(:team)
    conn = put conn, team_path(conn, :update, team), team: @update_attrs
    assert %{"id" => ^id} = json_response(conn, 200)["data"]

    conn = get conn, team_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id,
      "name" => "some updated name"}
  end

  test "does not update chosen team and renders errors when data is invalid", %{conn: conn} do
    team = fixture(:team)
    conn = put conn, team_path(conn, :update, team), team: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen team", %{conn: conn} do
    team = fixture(:team)
    conn = delete conn, team_path(conn, :delete, team)
    assert response(conn, 204)
    assert_error_sent 404, fn ->
      get conn, team_path(conn, :show, team)
    end
  end
end
