defmodule ReactPhoenix.Repo.Migrations.AddUserToDeck do
  use Ecto.Migration

  def change do
    alter table(:decks) do
      add :user_id, :binary_id
    end
  end
end
