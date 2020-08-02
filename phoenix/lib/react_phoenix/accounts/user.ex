defmodule ReactPhoenix.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :name, :string
    field :picture, :string
    field :email, :string
    field :locale, :string
    field :gaccess_token, :string
    field :gid, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :picture, :email, :locale, :gid, :gaccess_token])
    |> validate_required([:name, :picture, :email, :locale, :gid, :gaccess_token])
    |> unique_constraint(:email)
  end
end
