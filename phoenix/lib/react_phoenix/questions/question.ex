defmodule ReactPhoenix.Questions.Question do
  use Ecto.Schema
  import Ecto.Changeset

  schema "questions" do
    field :text, :string
    belongs_to :user, ReactPhoenix.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(question, attrs) do
    question
    |> cast(attrs, [:text, :user_id])
    |> validate_required([:text, :user_id])
  end
end
