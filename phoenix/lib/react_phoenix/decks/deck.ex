defmodule ReactPhoenix.Decks.Deck do
  use Ecto.Schema
  import Ecto.Changeset

  schema "decks" do
    field :picture, :string
    field :title, :string
    field :current_session, :integer
    belongs_to :user, ReactPhoenix.Accounts.User
    has_many :card, ReactPhoenix.Decks.Card

    timestamps()
  end

  @doc false
  def changeset(deck, attrs) do
    deck
    |> cast(attrs, [:title, :picture, :user_id, :current_session])
    |> validate_required([:title])
  end
end
