defmodule ReactPhoenixWeb.AuthController do
  use ReactPhoenixWeb, :controller
  plug Ueberauth
  alias Ueberauth.Strategy.Helpers
  alias ReactPhoenix.Accounts

  def callback(%{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    IO.puts("Failed uberauth")

    conn
    |> put_flash(:error, "Failed to authenticate.")
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    IO.puts("Got uberauth")
    IO.inspect(auth)

    conn
    |> put_flash(:info, "Successfully authenticated!")
    |> redirect(to: "/")
  end

  def request(conn, _params) do
    render(conn, "request.html", callback_url: Helpers.callback_url(conn))
  end
end
