defmodule Taskarr.Companies.Employee do
  use Ecto.Schema

  schema "companies_employees" do
    field :is_confirmed, :boolean, default: false

    belongs_to :employee, Taskarr.Accounts.User

    belongs_to :team, Taskarr.Companies.Team
    belongs_to :company, Taskarr.Companies.Company

    timestamps()
  end
end
