defmodule ReactPhoenixWeb.CardController do
  use ReactPhoenixWeb, :controller

  alias ReactPhoenix.Decks
  alias ReactPhoenix.Decks.Card

  action_fallback ReactPhoenixWeb.FallbackController

  def index(conn, _params) do
    cards = Decks.list_cards()
    render(conn, "index.json", cards: cards)
  end

  def create(conn, %{"card" => card_params}) do
    with {:ok, %Card{} = card} <- Decks.create_card(card_params) do
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
