defmodule Taskarr.Web.EmployeeControllerTest do
  use Taskarr.Web.ConnCase

  alias Taskarr.Companies
  alias Taskarr.Companies.Employee

  @create_attrs %{}
  @update_attrs %{}
  @invalid_attrs %{}

  def fixture(:employee) do
    {:ok, employee} = Companies.create_employee(@create_attrs)
    employee
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, employee_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "creates employee and renders employee when data is valid", %{conn: conn} do
    conn = post conn, employee_path(conn, :create), employee: @create_attrs
    assert %{"id" => id} = json_response(conn, 201)["data"]

    conn = get conn, employee_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id}
  end

  test "does not create employee and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, employee_path(conn, :create), employee: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates chosen employee and renders employee when data is valid", %{conn: conn} do
    %Employee{id: id} = employee = fixture(:employee)
    conn = put conn, employee_path(conn, :update, employee), employee: @update_attrs
    assert %{"id" => ^id} = json_response(conn, 200)["data"]

    conn = get conn, employee_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id}
  end

  test "does not update chosen employee and renders errors when data is invalid", %{conn: conn} do
    employee = fixture(:employee)
    conn = put conn, employee_path(conn, :update, employee), employee: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen employee", %{conn: conn} do
    employee = fixture(:employee)
    conn = delete conn, employee_path(conn, :delete, employee)
    assert response(conn, 204)
    assert_error_sent 404, fn ->
      get conn, employee_path(conn, :show, employee)
    end
  end
end
