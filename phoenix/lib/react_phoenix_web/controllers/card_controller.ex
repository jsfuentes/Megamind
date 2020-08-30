defmodule ReactPhoenixWeb.CardController do
  use ReactPhoenixWeb, :controller

  alias ReactPhoenix.Decks
  alias ReactPhoenix.Decks.Card
  alias ReactPhoenixWeb.Supermemo

  action_fallback ReactPhoenixWeb.FallbackController

  def index(conn, params) do
    IO.puts("CARD FETCH #{params["deck_id"]}")
    cards = Decks.list_cards(params["deck_id"])
    render(conn, "index.json", cards: cards)
  end

  def create(conn, %{"card" => card_params}) do
    payload =
      card_params
      |> Map.put("easiness_factor", 2.5)
      |> Map.put("next_session", 1)
      |> Map.put("session_interval", 1)
      |> Map.put("successful_session_count", 0)

    IO.inspect(payload)

    with {:ok, %Card{} = card} <- Decks.create_card(payload) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.card_path(conn, :show, card))
      |> render("show.json", card: card)
    end
  end

  def show(conn, %{"id" => id}) do
    card = Decks.get_card!(id)
    render(conn, "show.json", card: card)
  end

  def update(conn, %{"id" => id, "card" => card_params}) do
    card = Decks.get_card!(id)

    with {:ok, %Card{} = card} <- Decks.update_card(card, card_params) do
      render(conn, "show.json", card: card)
    end
  end

  def delete(conn, %{"id" => id}) do
    card = Decks.get_card!(id)

    with {:ok, %Card{}} <- Decks.delete_card(card) do
      send_resp(conn, :no_content, "")
    end
  end

  def answer(conn, %{"id" => id, "q" => q}) do
    old_card = Decks.get_card!(id)
    deck = Decks.get_deck!(old_card.deck_id)
    IO.inspect(old_card)
    IO.puts("DECK SESSION #{deck.current_session}")

    card_params =
      Supermemo.calculateNewValues(String.to_integer(q), deck.current_session, old_card)
      |> Phoenix.View.render_one(ReactPhoenixWeb.CardView, "card.json")

    IO.inspect(card_params)

    with {:ok, %Card{} = card} <- Decks.update_card(old_card, card_params) do
      IO.puts("NEW CARD")
      IO.inspect(card)
      render(conn, "show.json", card: card)
    end
  end
end
