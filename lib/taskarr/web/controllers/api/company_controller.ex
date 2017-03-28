defmodule Taskarr.Web.CompanyController do
  use Taskarr.Web, :controller

  alias Taskarr.Accounts  
  alias Taskarr.Companies
  alias Taskarr.Companies.Company

  action_fallback Taskarr.Web.FallbackController

  def index(conn, _params) do
    with user = Accounts.get_current_user(conn) do
      companies = Companies.list_companies(user)
      render(conn, "index.json", companies: companies)
    end
  end

  def create(conn, %{"company" => company_params}) do
    with user = Accounts.get_current_user(conn),
         {:ok, %Company{} = company} <- Companies.create_company(user, company_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", company_path(conn, :show, company))
      |> render("show.json", company: company)
    end
  end

  def show(conn, %{"id" => id}) do
    company = Companies.get_company!(id)
    render(conn, "show.json", company: company)
  end

  def update(conn, %{"id" => id, "company" => company_params}) do
    company = Companies.get_company!(id)

    with user = Accounts.get_current_user(conn),
         {:ok, %Company{} = company} <- Companies.update_company(company, company_params) do
      if user.id != company.director do
        raise "Permission denied"
      end

      render(conn, "show.json", company: company)
    end
  end

  def delete(conn, %{"id" => id}) do
    company = Companies.get_company!(id)
    with user = Accounts.get_current_user(conn),
         {:ok, %Company{}} <- Companies.delete_company(company) do
      if user.id != company.director do
        raise "Permission denied"
      end

      send_resp(conn, :no_content, "")
    end
  end
end
