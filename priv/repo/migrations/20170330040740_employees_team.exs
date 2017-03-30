defmodule Taskarr.Repo.Migrations.EmployeesTeam do
  use Ecto.Migration

  def change do
    alter table(:companies_employees) do
      add :team_id, references(:companies_teams, on_delete: :nilify_all)
    end
  end
end
