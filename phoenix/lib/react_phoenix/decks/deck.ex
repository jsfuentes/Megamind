defmodule ReactPhoenix.Decks.Deck do
  use Ecto.Schema
  import Ecto.Changeset

  schema "decks" do
    field :picture, :string
    field :title, :string
    belongs_to :user, ReactPhoenix.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(deck, attrs) do
    deck
    |> cast(attrs, [:title, :picture, :user_id])
    |> validate_required([:title])
  end
end
