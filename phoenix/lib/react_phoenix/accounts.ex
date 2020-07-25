defmodule ReactPhoenix.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias ReactPhoenix.Repo

  alias ReactPhoenix.Accounts.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    IO.puts "create_user" 

    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  def get_create_google_user(gaccess_token) do
    attrs = fetch_google_profile(gaccess_token)
    case Repo.get_by(User, email: attrs.email) do
      %User{} = user -> 
        update_user(user, %{gaccess_token: attrs.gaccess_token}) #only update token
      nil -> create_user(attrs)
    end
  end

  def fetch_google_profile(gaccess_token) do
    url = "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" <> gaccess_token
    %HTTPoison.Response{status_code: 200, body: body} = HTTPoison.get!(url)
    profile = Jason.decode!(body)
    %{
      gid: profile["id"],
      gaccess_token: gaccess_token,
      name: profile["name"],
      picture: profile["picture"],
      email: profile["email"],
      locale: profile["locale"]
    }
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
    |> IO.inspect
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end
end
