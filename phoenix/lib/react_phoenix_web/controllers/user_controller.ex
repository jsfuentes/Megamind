defmodule ReactPhoenixWeb.UserController do
  use ReactPhoenixWeb, :controller

  alias ReactPhoenix.Accounts
  alias ReactPhoenix.Accounts.User

  action_fallback ReactPhoenixWeb.FallbackController

  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => %{"gaccess_token"=> gaccess_token}}) do
    with {:ok, %User{} = user} <- Accounts.get_create_google_user(gaccess_token) do
      IO.puts "USER GOT OR CREATED"
      IO.inspect user
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> put_session(:user_id, user.id)
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{} = user} <- Accounts.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{}} <- Accounts.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end

  def me(conn, _params) do
    IO.puts("ME")
    user = conn.assigns[:current_user]
    IO.inspect user
    render(conn, "show.json", user: user)
  end
end
