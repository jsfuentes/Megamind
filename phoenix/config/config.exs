# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :react_phoenix,
  ecto_repos: [ReactPhoenix.Repo]

# Configure your database
config :react_phoenix, ReactPhoenix.Repo,
  username: System.get_env("DB_USERNAME"),
  password: System.get_env("DB_PASSWORD"),
  database: System.get_env("DB_DATABASE"),
  hostname: System.get_env("DB_HOSTNAME"),
  show_sensitive_data_on_connection_error: true,
  pool_size: 5,
  ssl: true,
  ssl_opts: [
    versions: [:"tlsv1.2"]
  ]

# Configures the endpoint
config :react_phoenix, ReactPhoenixWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "1V9L26qo/kU8WDVZK/6b0aN4uWp+dcSt//xQCyybiPpyeN/aqVtWhNitrTK0ifUi",
  render_errors: [view: ReactPhoenixWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: ReactPhoenix.PubSub, adapter: Phoenix.PubSub.PG2],
  live_view: [signing_salt: "sOJVGmu7"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :ueberauth, Ueberauth,
  providers: [
    google: {Ueberauth.Strategy.Google, []}
  ]
  
config :ueberauth, Ueberauth.Strategy.Google.OAuth,
  client_id: System.get_env("GOOGLE_CLIENT_ID"),
  client_secret: System.get_env("GOOGLE_CLIENT_SECRET")

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
