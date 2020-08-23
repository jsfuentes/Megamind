defmodule ReactPhoenixWeb.CardControllerTest do
  use ReactPhoenixWeb.ConnCase

  alias ReactPhoenix.Decks
  alias ReactPhoenix.Decks.Card

  @create_attrs %{
    back: %{},
    easiness_factor: 120.5,
    front: %{},
    next_session: 42,
    session_interval: 42,
    successful_session_count: 42
  }
  @update_attrs %{
    back: %{},
    easiness_factor: 456.7,
    front: %{},
    next_session: 43,
    session_interval: 43,
    successful_session_count: 43
  }
  @invalid_attrs %{back: nil, easiness_factor: nil, front: nil, next_session: nil, session_interval: nil, successful_session_count: nil}

  def fixture(:card) do
    {:ok, card} = Decks.create_card(@create_attrs)
    card
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all cards", %{conn: conn} do
      conn = get(conn, Routes.card_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create card" do
    test "renders card when data is valid", %{conn: conn} do
      conn = post(conn, Routes.card_path(conn, :create), card: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.card_path(conn, :show, id))

      assert %{
               "id" => id,
               "back" => %{},
               "easiness_factor" => 120.5,
               "front" => %{},
               "next_session" => 42,
               "session_interval" => 42,
               "successful_session_count" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.card_path(conn, :create), card: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update card" do
    setup [:create_card]

    test "renders card when data is valid", %{conn: conn, card: %Card{id: id} = card} do
      conn = put(conn, Routes.card_path(conn, :update, card), card: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.card_path(conn, :show, id))

      assert %{
               "id" => id,
               "back" => {},
               "easiness_factor" => 456.7,
               "front" => {},
               "next_session" => 43,
               "session_interval" => 43,
               "successful_session_count" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, card: card} do
      conn = put(conn, Routes.card_path(conn, :update, card), card: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete card" do
    setup [:create_card]

    test "deletes chosen card", %{conn: conn, card: card} do
      conn = delete(conn, Routes.card_path(conn, :delete, card))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.card_path(conn, :show, card))
      end
    end
  end

  defp create_card(_) do
    card = fixture(:card)
    {:ok, card: card}
  end
end
