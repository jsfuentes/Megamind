defmodule ReactPhoenix.Repo do
  use Ecto.Repo,
    otp_app: :react_phoenix,
    adapter: Ecto.Adapters.Postgres
end
