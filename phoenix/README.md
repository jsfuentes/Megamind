# ReactPhoenix

Get the .env file and put it in the root directory

## Initial Setup

```
mix deps.get #Install deps
cd assets  #Install clientside npm packages
yarn
cd ..
source .env #Seed environment
mix phx.server #Start server
```

## Running

```
iex -S mix phx.server
```

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

- Official website: https://www.phoenixframework.org/
- Guides: https://hexdocs.pm/phoenix/overview.html
- Docs: https://hexdocs.pm/phoenix
- Forum: https://elixirforum.com/c/phoenix-forum
- Source: https://github.com/phoenixframework/phoenix
