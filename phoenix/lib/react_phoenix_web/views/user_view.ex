defmodule ReactPhoenixWeb.UserView do
  use ReactPhoenixWeb, :view
  alias ReactPhoenixWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      picture: user.picture,
      email: user.email,
      locale: user.locale,
      gid: user.gid,
      gaccess_token: user.gaccess_token}
  end
end
