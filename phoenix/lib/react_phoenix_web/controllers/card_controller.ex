defmodule ReactPhoenixWeb.CardController do
  use ReactPhoenixWeb, :controller

  alias ReactPhoenix.Decks
  alias ReactPhoenix.Decks.Card

  action_fallback ReactPhoenixWeb.FallbackController

  def index(conn, params) do
    IO.puts "CARD FETCH #{params["deck_id"]}"
    cards = Decks.list_cards(params["deck_id"])
    render(conn, "index.json", cards: cards)
  end

  def create(conn, %{"card" => card_params}) do
    payload = card_params 
    |> Map.put("easiness_factor", 2.5)
    |> Map.put("next_session", 0)
    |> Map.put("session_interval", 1)
    |> Map.put("successful_session_count", 1)

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
end
