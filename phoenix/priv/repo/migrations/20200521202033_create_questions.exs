defmodule ReactPhoenix.Repo.Migrations.CreateQuestions do
  use Ecto.Migration

  def change do
    create table(:questions) do
      add :text, :text
      add :author, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:questions, [:author])
  end
end
