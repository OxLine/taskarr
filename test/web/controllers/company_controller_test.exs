defmodule Taskarr.Web.CompanyControllerTest do
  use Taskarr.Web.ConnCase

  alias Taskarr.Companies
  alias Taskarr.Companies.Company

  @create_attrs %{name: "some name"}
  @update_attrs %{name: "some updated name"}
  @invalid_attrs %{name: nil}

  def fixture(:company) do
    {:ok, company} = Companies.create_company(@create_attrs)
    company
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, company_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "creates company and renders company when data is valid", %{conn: conn} do
    conn = post conn, company_path(conn, :create), company: @create_attrs
    assert %{"id" => id} = json_response(conn, 201)["data"]

    conn = get conn, company_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id,
      "name" => "some name"}
  end

  test "does not create company and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, company_path(conn, :create), company: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates chosen company and renders company when data is valid", %{conn: conn} do
    %Company{id: id} = company = fixture(:company)
    conn = put conn, company_path(conn, :update, company), company: @update_attrs
    assert %{"id" => ^id} = json_response(conn, 200)["data"]

    conn = get conn, company_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id,
      "name" => "some updated name"}
  end

  test "does not update chosen company and renders errors when data is invalid", %{conn: conn} do
    company = fixture(:company)
    conn = put conn, company_path(conn, :update, company), company: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen company", %{conn: conn} do
    company = fixture(:company)
    conn = delete conn, company_path(conn, :delete, company)
    assert response(conn, 204)
    assert_error_sent 404, fn ->
      get conn, company_path(conn, :show, company)
    end
  end
end
