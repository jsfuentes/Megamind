defmodule ReactPhoenixWeb.DeckView do
  use ReactPhoenixWeb, :view
  alias ReactPhoenixWeb.DeckView
  alias ReactPhoenix.Accounts

  def render("index.json", %{decks: decks}) do
    %{data: render_many(decks, DeckView, "deck.json")}
  end

  def render("show.json", %{deck: deck}) do
    %{data: render_one(deck, DeckView, "deck.json")}
  end

  def render("deck.json", %{deck: deck}) do
    user = Accounts.get_user!(deck.user_id)

    %{
      id: deck.id,
      title: deck.title,
      picture: deck.picture,
      user: render_one(user, ReactPhoenixWeb.UserView, "public.json")
    }
  end
end
