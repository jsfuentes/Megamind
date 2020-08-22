defmodule ReactPhoenix.Repo.Migrations.CreateDecks do
  use Ecto.Migration

  def change do
    create table(:decks) do
      add :title, :string
      add :picture, :string
      add :user_id, :id

      timestamps()
    end
  end
end
