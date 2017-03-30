defmodule Taskarr.Repo.Migrations.CreateTaskarr.Companies.Task do
  use Ecto.Migration

  def change do
    create table(:companies_tasks) do
      add :name, :text
      add :is_completed, :boolean, default: false, null: false

      add :employee_id, references(:companies_employees, on_delete: :nilify_all)
      add :team_id, references(:companies_teams, on_delete: :nilify_all)
      add :company_id, references(:companies_companies, on_delete: :delete_all), null: false

      timestamps()
    end

  end
end
