defmodule Taskarr.Companies.Team do
  use Ecto.Schema
  
  schema "companies_teams" do
    field :name, :string

    belongs_to :company, Companies.Company
    belongs_to :teamlid, Companies.Employee 

    timestamps()
  end
end
