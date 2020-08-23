defmodule ReactPhoenix.Decks.Card do
  use Ecto.Schema
  import Ecto.Changeset

  schema "cards" do
    field :back, :map
    field :front, :map
    field :easiness_factor, :float
    field :next_session, :integer
    field :session_interval, :integer
    field :successful_session_count, :integer
    belongs_to :deck, ReactPhoenix.Decks.Deck

    timestamps()
  end

  @doc false
  def changeset(card, attrs) do
    card
    |> cast(attrs, [
      :front,
      :back,
      :session_interval,
      :next_session,
      :successful_session_count,
      :easiness_factor,
      :deck_id
    ])
    |> validate_required([
      :front,
      :back,
      :session_interval,
      :next_session,
      :successful_session_count,
      :easiness_factor,
      :deck_id
    ])
  end
end
