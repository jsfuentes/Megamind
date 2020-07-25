use Mix.Config

# Configure your database
config :react_phoenix, ReactPhoenix.Repo,
  username: "postgres",
  password: "postgres",
  database: "react_phoenix_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :react_phoenix, ReactPhoenixWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
