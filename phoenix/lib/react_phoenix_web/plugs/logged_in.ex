defmodule ReactPhoenixWeb.LoggedIn do
  import Plug.Conn
  import Phoenix.Controller

  # alias ReactPhoenixWeb.Router.Helpers

  def init(opts), do: opts

  def call(conn = %{assigns: %{current_user: %{}}}, _opts), do: conn

  def call(conn, _opts) do
    conn
    |> put_status(401)
    |> text("Unauthorized")
    |> halt()
  end
end
