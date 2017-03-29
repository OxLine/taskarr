defmodule Taskarr.Repo.Migrations.CompaniesEmployees do
  use Ecto.Migration

  def change do
    create table(:companies_employees) do
      add :is_confirmed, :boolean, default: false, null: false
      add :employee_id, references(:accounts_users, on_delete: :delete_all), null: false

      add :team_id, references(:companies_teams, on_delete: :nilify_all)
      add :company_id, references(:companies_companies, on_delete: :delete_all), null: false

      timestamps()
    end
  end
end
