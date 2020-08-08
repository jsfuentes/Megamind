defmodule ReactPhoenixWeb.Auth do
  import Plug.Conn
  import Phoenix.Controller
  alias ReactPhoenixWeb.Router.Helpers

  def init(opts), do: opts

  def call(conn, _opts) do
    user_id = get_session(conn, :user_id)
    IO.puts("AUTH PUTH UID: #{user_id}")
    user = user_id && ReactPhoenix.Accounts.get_user!(user_id)
    assign(conn, :current_user, user)
  end

  def logged_in_user(conn = %{assigns: %{current_user: %{}}}, _), do: conn

  def logged_in_user(conn, _opts) do
    conn
    |> put_flash(:error, "You must be logged in to access that page")
    |> redirect(to: Helpers.page_path(conn, :index))
    |> halt()
  end
end
