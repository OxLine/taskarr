defmodule Taskarr.Accounts.User do
  use Ecto.Schema
  
  schema "accounts_users" do
    field :username, :string
    field :email, :string
    field :password, :string, virtual: true 
    field :password_hash, :string

    has_many :companies, Companies.Company
    has_many :teams, Companies.Team

    timestamps()
  end
end
