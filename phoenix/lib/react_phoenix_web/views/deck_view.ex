defmodule ReactPhoenixWeb.DeckView do
  use ReactPhoenixWeb, :view
  alias ReactPhoenixWeb.DeckView
  alias ReactPhoenixWeb.UserView

  def render("index.json", %{decks: decks}) do
    %{data: render_many(decks, DeckView, "deck.json")}
  end

  def render("show.json", %{deck: deck}) do
    %{data: render_one(deck, DeckView, "deck.json")}
  end

  def render("deck.json", %{deck: deck}) do
    %{
      id: deck.id,
      title: deck.title,
      picture: deck.picture,
      user: render_one(deck.user, UserView, "basic.json", as: :user)
    }
  end
end
