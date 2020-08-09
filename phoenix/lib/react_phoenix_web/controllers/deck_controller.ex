defmodule ReactPhoenixWeb.DeckController do
  use ReactPhoenixWeb, :controller

  alias ReactPhoenix.Decks
  alias ReactPhoenix.Decks.Deck
  require Logger

  action_fallback ReactPhoenixWeb.FallbackController

  plug ReactPhoenixWeb.LoggedIn when action in [:create]

  def index(conn, _params) do
    decks = Decks.list_decks()
    render(conn, "index.json", decks: decks)
  end

  def create(conn, %{"deck" => deck_params}) do
    user_id = conn.assigns[:current_user].id

    payload =
      deck_params
      |> Map.put(:user_id, user_id)

    IO.inspect(payload)

    with {:ok, %Deck{} = deck} <- Decks.create_deck(payload) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.deck_path(conn, :show, deck))
      |> render("show.json", deck: deck)
    end
  end

  def show(conn, %{"id" => id}) do
    deck = Decks.get_deck!(id)
    render(conn, "show.json", deck: deck)
  end

  def update(conn, %{"id" => id, "deck" => deck_params}) do
    deck = Decks.get_deck!(id)

    with {:ok, %Deck{} = deck} <- Decks.update_deck(deck, deck_params) do
      render(conn, "show.json", deck: deck)
    end
  end

  def delete(conn, %{"id" => id}) do
    deck = Decks.get_deck!(id)

    with {:ok, %Deck{}} <- Decks.delete_deck(deck) do
      send_resp(conn, :no_content, "")
    end
  end
end
