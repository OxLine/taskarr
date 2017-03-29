defmodule Taskarr.Companies.Company do
  use Ecto.Schema
  
  schema "companies_companies" do
    field :name, :string

    belongs_to :director, Taskarr.Accounts.User
    has_many :employees, Taskarr.Companies.Employee
    has_many :teams, Taskarr.Companies.Team

    timestamps()
  end
end
