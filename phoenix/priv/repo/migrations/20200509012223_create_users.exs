defmodule ReactPhoenix.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :picture, :string
      add :email, :string
      add :locale, :string
      add :gid, :integer
      add :gaccess_token, :string

      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
