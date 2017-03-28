defmodule Taskarr.Web.EmployeeController do
  use Taskarr.Web, :controller

  alias Taskarr.Companies
  alias Taskarr.Companies.Employee

  action_fallback Taskarr.Web.FallbackController

  def index(conn, _params) do
    employees = Companies.list_employees()
    render(conn, "index.json", employees: employees)
  end

  def create(conn, %{"employee" => employee_params}) do
    with {:ok, %Employee{} = employee} <- Companies.create_employee(employee_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", employee_path(conn, :show, employee))
      |> render("show.json", employee: employee)
    end
  end

  def show(conn, %{"id" => id}) do
    employee = Companies.get_employee!(id)
    render(conn, "show.json", employee: employee)
  end

  def update(conn, %{"id" => id, "employee" => employee_params}) do
    employee = Companies.get_employee!(id)

    with {:ok, %Employee{} = employee} <- Companies.update_employee(employee, employee_params) do
      render(conn, "show.json", employee: employee)
    end
  end

  def delete(conn, %{"id" => id}) do
    employee = Companies.get_employee!(id)
    with {:ok, %Employee{}} <- Companies.delete_employee(employee) do
      send_resp(conn, :no_content, "")
    end
  end
end
