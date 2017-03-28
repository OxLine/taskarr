defmodule Taskarr.CompaniesTest do
  use Taskarr.DataCase

  alias Taskarr.Companies
  alias Taskarr.Companies.Company

  @create_attrs %{name: "some name"}
  @update_attrs %{name: "some updated name"}
  @invalid_attrs %{name: nil}

  def fixture(:company, attrs \\ @create_attrs) do
    {:ok, company} = Companies.create_company(attrs)
    company
  end

  test "list_companies/1 returns all companies" do
    company = fixture(:company)
    assert Companies.list_companies() == [company]
  end

  test "get_company! returns the company with given id" do
    company = fixture(:company)
    assert Companies.get_company!(company.id) == company
  end

  test "create_company/1 with valid data creates a company" do
    assert {:ok, %Company{} = company} = Companies.create_company(@create_attrs)
    
    assert company.name == "some name"
  end

  test "create_company/1 with invalid data returns error changeset" do
    assert {:error, %Ecto.Changeset{}} = Companies.create_company(@invalid_attrs)
  end

  test "update_company/2 with valid data updates the company" do
    company = fixture(:company)
    assert {:ok, company} = Companies.update_company(company, @update_attrs)
    assert %Company{} = company
    
    assert company.name == "some updated name"
  end

  test "update_company/2 with invalid data returns error changeset" do
    company = fixture(:company)
    assert {:error, %Ecto.Changeset{}} = Companies.update_company(company, @invalid_attrs)
    assert company == Companies.get_company!(company.id)
  end

  test "delete_company/1 deletes the company" do
    company = fixture(:company)
    assert {:ok, %Company{}} = Companies.delete_company(company)
    assert_raise Ecto.NoResultsError, fn -> Companies.get_company!(company.id) end
  end

  test "change_company/1 returns a company changeset" do
    company = fixture(:company)
    assert %Ecto.Changeset{} = Companies.change_company(company)
  end
end
