defmodule Taskarr.Repo.Migrations.CompaniesEmployees do
  use Ecto.Migration

  def change do
    create table(:companies_employees) do
      add :is_confirmd, :boolean, default: false, null: false
      add :employee_id, references(:accounts_users, on_delete: :delete_all), null: false

      add :team_id, references(:companies_teams)
      add :company_id, references(:companies_companies, on_delete: :delete_all), null: false
    end
  end
end
