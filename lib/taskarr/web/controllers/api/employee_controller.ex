defmodule Taskarr.Web.EmployeeController do
  use Taskarr.Web, :controller

  alias Taskarr.Repo

  alias Taskarr.Accounts
  alias Taskarr.Companies
  alias Taskarr.Companies.Employee

  action_fallback Taskarr.Web.FallbackController

  def index(conn, _params) do
    employees = Companies.list_employees()
    render(conn, "index.json", employees: employees)
  end

  def index_by_company(conn, %{"id" => id}) do
    user = Accounts.get_current_user(conn)
    company = Companies.get_company!(id)

    if user.id != company.director_id do
      {:error, "Permission denied"}
    else
      employees = Companies.list_employees_by_company(company)
      render(conn, "index.json", employees: employees)
    end
  end

  def create(conn, %{"employee" => employee_params}) do
    user = Accounts.get_current_user(conn)
    company = Companies.get_company!(String.to_integer(employee_params["company_id"]))
      
    if user.id != company.director_id do
      raise "Permission denied" 
    end

    # Companies.get_employee!(employee_params["employee_id"]),
    with {:ok, %Employee{} = employee} <- Companies.create_employee(company, employee_params) do
      employee = Repo.preload(employee, :employee)
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
