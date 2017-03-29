defmodule Taskarr.Web.EmployeeView do
  use Taskarr.Web, :view
  alias Taskarr.Web.EmployeeView

  def render("index.json", %{employees: employees}) do
    %{data: render_many(employees, EmployeeView, "employee.json")}
  end

  def render("show.json", %{employee: employee}) do
    %{data: render_one(employee, EmployeeView, "employee.json")}
  end

  def render("employee.json", %{employee: employee}) do
    %{
      id: employee.id,
      username: employee.employee.username,
      is_confirmed: employee.is_confirmed,
      team_id: employee.team_id,
    }
  end
end
