defmodule Taskarr.Repo.Migrations.CreateTaskarr.Companies.Team do
  use Ecto.Migration

  def change do
    create table(:companies_teams) do
      add :name, :string

      add :company_id, references(:companies_companies, on_delete: :delete_all), null: false
      add :teamlid_id, references(:accounts_users, on_delete: :delete_all)

      timestamps()
    end

  end
end
