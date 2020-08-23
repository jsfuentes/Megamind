defmodule ReactPhoenixWeb.CardView do
  use ReactPhoenixWeb, :view
  alias ReactPhoenixWeb.CardView

  def render("index.json", %{cards: cards}) do
    %{data: render_many(cards, CardView, "card.json")}
  end

  def render("show.json", %{card: card}) do
    %{data: render_one(card, CardView, "card.json")}
  end

  def render("card.json", %{card: card}) do
    %{
      id: card.id,
      front: card.front,
      back: card.back,
      session_interval: card.session_interval,
      next_session: card.next_session,
      successful_session_count: card.successful_session_count,
      easiness_factor: card.easiness_factor
    }
  end
end
