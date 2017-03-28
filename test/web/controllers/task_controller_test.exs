defmodule Taskarr.Web.TaskControllerTest do
  use Taskarr.Web.ConnCase

  alias Taskarr.Companies
  alias Taskarr.Companies.Task

  @create_attrs %{is_completed: true, name: "some name"}
  @update_attrs %{is_completed: false, name: "some updated name"}
  @invalid_attrs %{is_completed: nil, name: nil}

  def fixture(:task) do
    {:ok, task} = Companies.create_task(@create_attrs)
    task
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, task_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "creates task and renders task when data is valid", %{conn: conn} do
    conn = post conn, task_path(conn, :create), task: @create_attrs
    assert %{"id" => id} = json_response(conn, 201)["data"]

    conn = get conn, task_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id,
      "is_completed" => true,
      "name" => "some name"}
  end

  test "does not create task and renders errors when data is invalid", %{conn: conn} do
    conn = post conn, task_path(conn, :create), task: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates chosen task and renders task when data is valid", %{conn: conn} do
    %Task{id: id} = task = fixture(:task)
    conn = put conn, task_path(conn, :update, task), task: @update_attrs
    assert %{"id" => ^id} = json_response(conn, 200)["data"]

    conn = get conn, task_path(conn, :show, id)
    assert json_response(conn, 200)["data"] == %{
      "id" => id,
      "is_completed" => false,
      "name" => "some updated name"}
  end

  test "does not update chosen task and renders errors when data is invalid", %{conn: conn} do
    task = fixture(:task)
    conn = put conn, task_path(conn, :update, task), task: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen task", %{conn: conn} do
    task = fixture(:task)
    conn = delete conn, task_path(conn, :delete, task)
    assert response(conn, 204)
    assert_error_sent 404, fn ->
      get conn, task_path(conn, :show, task)
    end
  end
end
