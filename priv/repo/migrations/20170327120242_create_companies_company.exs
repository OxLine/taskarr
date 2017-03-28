defmodule Taskarr.Repo.Migrations.CreateTaskarr.Companies.Company do
  use Ecto.Migration

  def change do
    create table(:companies_companies) do
      add :name, :string

      add :director_id, references(:accoutns_users, on_delete: :delete_all), :null_false

      timestamps()
    end

  end
end
