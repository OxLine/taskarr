defmodule Taskarr.Companies.Company do
  use Ecto.Schema
  
  schema "companies_companies" do
    field :name, :string

    belongs_to :director, Taskarr.Accounts.User

    timestamps()
  end
end
