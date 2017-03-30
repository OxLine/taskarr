defmodule Taskarr.Web.TaskView do
  use Taskarr.Web, :view
  alias Taskarr.Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      name: task.name,
      is_completed: task.is_completed,
      company_id: task.company_id,
      team_id: task.team_id,
      employee_id: task.employee_id
    }
  end
end
