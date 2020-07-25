defmodule ReactPhoenixWeb.PageController do
  use ReactPhoenixWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
