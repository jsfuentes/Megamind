defmodule ReactPhoenix.DecksTest do
  use ReactPhoenix.DataCase

  alias ReactPhoenix.Decks

  describe "decks" do
    alias ReactPhoenix.Decks.Deck

    @valid_attrs %{picture: "some picture", title: "some title"}
    @update_attrs %{picture: "some updated picture", title: "some updated title"}
    @invalid_attrs %{picture: nil, title: nil}

    def deck_fixture(attrs \\ %{}) do
      {:ok, deck} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Decks.create_deck()

      deck
    end

    test "list_decks/0 returns all decks" do
      deck = deck_fixture()
      assert Decks.list_decks() == [deck]
    end

    test "get_deck!/1 returns the deck with given id" do
      deck = deck_fixture()
      assert Decks.get_deck!(deck.id) == deck
    end

    test "create_deck/1 with valid data creates a deck" do
      assert {:ok, %Deck{} = deck} = Decks.create_deck(@valid_attrs)
      assert deck.picture == "some picture"
      assert deck.title == "some title"
    end

    test "create_deck/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Decks.create_deck(@invalid_attrs)
    end

    test "update_deck/2 with valid data updates the deck" do
      deck = deck_fixture()
      assert {:ok, %Deck{} = deck} = Decks.update_deck(deck, @update_attrs)
      assert deck.picture == "some updated picture"
      assert deck.title == "some updated title"
    end

    test "update_deck/2 with invalid data returns error changeset" do
      deck = deck_fixture()
      assert {:error, %Ecto.Changeset{}} = Decks.update_deck(deck, @invalid_attrs)
      assert deck == Decks.get_deck!(deck.id)
    end

    test "delete_deck/1 deletes the deck" do
      deck = deck_fixture()
      assert {:ok, %Deck{}} = Decks.delete_deck(deck)
      assert_raise Ecto.NoResultsError, fn -> Decks.get_deck!(deck.id) end
    end

    test "change_deck/1 returns a deck changeset" do
      deck = deck_fixture()
      assert %Ecto.Changeset{} = Decks.change_deck(deck)
    end
  end

  describe "cards" do
    alias ReactPhoenix.Decks.Card

    @valid_attrs %{back: %{}, easiness_factor: 120.5, front: %{}, next_session: 42, session_interval: 42, successful_session_count: 42}
    @update_attrs %{back: %{}, easiness_factor: 456.7, front: %{}, next_session: 43, session_interval: 43, successful_session_count: 43}
    @invalid_attrs %{back: nil, easiness_factor: nil, front: nil, next_session: nil, session_interval: nil, successful_session_count: nil}

    def card_fixture(attrs \\ %{}) do
      {:ok, card} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Decks.create_card()

      card
    end

    test "list_cards/0 returns all cards" do
      card = card_fixture()
      assert Decks.list_cards() == [card]
    end

    test "get_card!/1 returns the card with given id" do
      card = card_fixture()
      assert Decks.get_card!(card.id) == card
    end

    test "create_card/1 with valid data creates a card" do
      assert {:ok, %Card{} = card} = Decks.create_card(@valid_attrs)
      assert card.back == %{}
      assert card.easiness_factor == 120.5
      assert card.front == %{}
      assert card.next_session == 42
      assert card.session_interval == 42
      assert card.successful_session_count == 42
    end

    test "create_card/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Decks.create_card(@invalid_attrs)
    end

    test "update_card/2 with valid data updates the card" do
      card = card_fixture()
      assert {:ok, %Card{} = card} = Decks.update_card(card, @update_attrs)
      assert card.back == %{}
      assert card.easiness_factor == 456.7
      assert card.front == %{}
      assert card.next_session == 43
      assert card.session_interval == 43
      assert card.successful_session_count == 43
    end

    test "update_card/2 with invalid data returns error changeset" do
      card = card_fixture()
      assert {:error, %Ecto.Changeset{}} = Decks.update_card(card, @invalid_attrs)
      assert card == Decks.get_card!(card.id)
    end

    test "delete_card/1 deletes the card" do
      card = card_fixture()
      assert {:ok, %Card{}} = Decks.delete_card(card)
      assert_raise Ecto.NoResultsError, fn -> Decks.get_card!(card.id) end
    end

    test "change_card/1 returns a card changeset" do
      card = card_fixture()
      assert %Ecto.Changeset{} = Decks.change_card(card)
    end
  end
end
