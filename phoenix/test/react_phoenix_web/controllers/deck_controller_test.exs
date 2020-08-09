defmodule ReactPhoenixWeb.DeckControllerTest do
  use ReactPhoenixWeb.ConnCase

  alias ReactPhoenix.Decks
  alias ReactPhoenix.Decks.Deck

  @create_attrs %{
    picture: "some picture",
    title: "some title"
  }
  @update_attrs %{
    picture: "some updated picture",
    title: "some updated title"
  }
  @invalid_attrs %{picture: nil, title: nil}

  def fixture(:deck) do
    {:ok, deck} = Decks.create_deck(@create_attrs)
    deck
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all decks", %{conn: conn} do
      conn = get(conn, Routes.deck_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create deck" do
    test "renders deck when data is valid", %{conn: conn} do
      conn = post(conn, Routes.deck_path(conn, :create), deck: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.deck_path(conn, :show, id))

      assert %{
               "id" => id,
               "picture" => "some picture",
               "title" => "some title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.deck_path(conn, :create), deck: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update deck" do
    setup [:create_deck]

    test "renders deck when data is valid", %{conn: conn, deck: %Deck{id: id} = deck} do
      conn = put(conn, Routes.deck_path(conn, :update, deck), deck: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.deck_path(conn, :show, id))

      assert %{
               "id" => id,
               "picture" => "some updated picture",
               "title" => "some updated title"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, deck: deck} do
      conn = put(conn, Routes.deck_path(conn, :update, deck), deck: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete deck" do
    setup [:create_deck]

    test "deletes chosen deck", %{conn: conn, deck: deck} do
      conn = delete(conn, Routes.deck_path(conn, :delete, deck))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.deck_path(conn, :show, deck))
      end
    end
  end

  defp create_deck(_) do
    deck = fixture(:deck)
    {:ok, deck: deck}
  end
end
