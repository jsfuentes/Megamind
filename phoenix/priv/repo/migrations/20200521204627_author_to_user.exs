defmodule ReactPhoenix.Repo.Migrations.AuthorToUser do
  use Ecto.Migration

  def change do
    rename table(:questions), :author, to: :user_id
  end
end
