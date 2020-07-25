defmodule ReactPhoenix.Repo.Migrations.ChangeGid do
  use Ecto.Migration

  def change do
    alter table(:users) do
      modify :gid, :string
    end
  end
end
