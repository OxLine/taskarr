defmodule Taskarr.Companies.Task do
  use Ecto.Schema
  
  schema "companies_tasks" do
    field :name, :string
    field :is_completed, :boolean, default: false

    belongs_to :company, Companies.Company
    belongs_to :team, Companies.Team
    belongs_to :employee, Companies.Employee

    timestamps()
  end
end
