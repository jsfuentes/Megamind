defmodule ReactPhoenixWeb.ApiController do
  use ReactPhoenixWeb, :controller

  def index(conn, _params) do
    # users = [
    #   %{name: "Joe",
    #     email: "joe@example.com",
    #     password: "topsecret",
    #     stooge: "moe"},
    #   %{name: "Anne",
    #     email: "anne@example.com",
    #     password: "guessme",
    #     stooge: "larry"},
    #   %{name: "Franklin",
    #     email: "franklin@example.com",
    #     password: "guessme",
    #     stooge: "curly"},
    # ]
    json(conn, "Love you baby")
  end

  # def join(conn, _params) do
  #   nowUTC = DateTime.utc_now() |> DateTime.to_unix()
  #   rawPayload = %{
  #     privacy: "public",
  #     properties: %{exp: nowUTC + (24 * 60 * 60)}
  #   }
  #   payload = Jason.encode!(rawPayload)
  #   url = "https://api.daily.co/v1/rooms"
  #   headers = ["Accept": "Application/json; Charset=utf-8", "Content-Type": "Application/json; charset=utf-8", 
  #     "Authorization": "Bearer #{Application.fetch_env!(:react_phoenix, :daily_api)}"]

  #   case HTTPoison.post url, payload, headers do
  #     {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
  #       myBody = Jason.decode!(body)
  #       IO.inspect myBody
  #       json conn, myBody
  #     {:ok, %HTTPoison.Response{status_code: 404}} ->
  #       json conn, "Not found :("
  #     {:error, %HTTPoison.Error{reason: reason}} ->
  #       json conn, reason
  #   end
  # end
end
