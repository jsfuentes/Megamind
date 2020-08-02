# ReactPhoenix

Get the .env file from Jorge and put it in the root directory

```
source .env
```

## Initial Server Setup

```
mix deps.get #Install deps
cd assets  #Install clientside npm packages
yarn
cd ..
mix phx.server #Start server
```
## Initial Server Setup

```
cd client
npm install #install dependancies

```

## Running Server

```
iex -S mix phx.server
```

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Running Client

```
cd client
npm run dev #start next server
```

Now you can visit [`localhost:3000`](http://localhost:3000) from your browser.

## Learn more

- Official website: https://www.phoenixframework.org/
- Guides: https://hexdocs.pm/phoenix/overview.html
- Docs: https://hexdocs.pm/phoenix
- Forum: https://elixirforum.com/c/phoenix-forum
- Source: https://github.com/phoenixframework/phoenix
