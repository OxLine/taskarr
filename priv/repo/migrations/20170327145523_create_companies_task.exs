defmodule Taskarr.Repo.Migrations.CreateTaskarr.Companies.Task do
  use Ecto.Migration

  def change do
    create table(:companies_tasks) do
      add :name, :text
      add :is_completed, :boolean, default: false, null: false

      add :employee, references(:companies_employees)
      add :team_id, references(:companies_teams)
      add :company_id, references(:companies_comapnies, on_delete: :delete_all), null: false

      timestamps()
    end

  end
end
