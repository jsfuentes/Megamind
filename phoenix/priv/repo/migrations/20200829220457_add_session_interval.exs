defmodule ReactPhoenix.Repo.Migrations.AddSessionInterval do
  use Ecto.Migration

  def change do
    alter table(:decks) do
      add :current_session, :integer
    end
  end
end
