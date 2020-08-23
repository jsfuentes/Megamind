defmodule ReactPhoenix.Repo.Migrations.CreateCards do
  use Ecto.Migration

  def change do
    create table(:cards) do
      add :front, :map
      add :back, :map
      add :session_interval, :integer
      add :next_session, :integer
      add :successful_session_count, :integer
      add :easiness_factor, :float
      add :deck_id, references(:decks, on_delete: :nothing)

      timestamps()
    end

    create index(:cards, [:deck_id])
  end
end
