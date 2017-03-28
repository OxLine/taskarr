defmodule Taskarr.Companies.Task do
  use Ecto.Schema
  
  schema "companies_tasks" do
    field :name, :string
    field :is_completed, :boolean, default: false

    timestamps()
  end
end
