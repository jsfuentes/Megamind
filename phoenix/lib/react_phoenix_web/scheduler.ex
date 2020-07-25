#Will send messages with a topic for each user_id
defmodule ReactPhoenixWeb.Scheduler do
  use GenServer
  alias ReactPhoenixWeb.Endpoint

  def start_link(_) do
    GenServer.start_link(__MODULE__, "room:lobby", name: __MODULE__)
  end

  # def start_link(topic) do
  #   GenServer.start_link(__MODULE__, topic, name: __MODULE__)
  # end

  def new_user(id) do
    IO.puts("SCH: NEW_USER #{id}")
    %{topic: topic} = GenServer.call(__MODULE__, {:new_user, id})
    IO.puts("SCH: AFTER NEW_USER #{topic}")
    send(__MODULE__, :try_schedule)
  end

  def delete_user(id) do
    IO.puts("SCH: delete_user #{id}")
    GenServer.cast(__MODULE__, {:delete_user, id})
  end

  # def get_room(id) do
  #   IO.puts("SCH: get_room#{id}")
  #   GenServer.call(__MODULE__, {:get_data, id})
  # end
  
  #GenServer Functions
  def init(topic) do
    IO.puts("SCH: init#{topic}")
    body = %{topic: topic, users: []}
    # :timer.send_interval(60 * 1000, :update)
    {:ok, body}
  end

  # def handle_call({:get_data, id}, _, state) do
  #   %{topic: topic, users: users} = state
  #   IO.puts("SCH: handle_call#{id}")
  #   IO.puts("USERS: #{users}")

  #   # user_data = users[id]
  #   {:reply, state, state}
  # end

  def handle_cast({:delete_user, id}, %{topic: topic, users: users}) do
    IO.puts("SCH: handle_call:delete_user#{id}")
    newUsers = List.keydelete(users, id, 0)
    newState = %{topic: topic, users: newUsers}
    {:noreply, newState}
  end

  def handle_call({:new_user, id}, _, %{topic: topic, users: users}) do
    IO.puts("SCH: handle_call:new_user#{id}")
    newUsers = [{id, %{}} | users]
    newState = %{topic: topic, users: newUsers}
    {:reply, newState, newState}
  end

  #only one user
  def handle_info(:try_schedule, %{topic: topic, users: [{uid, data}]}), do: {:noreply,  %{topic: topic, users: [{uid, data}]}}

  def handle_info(:try_schedule, %{topic: topic, users: users}) do
    IO.puts("SCH: handle_info:try_schedule MULTI USER")
    shuffledKeys = Enum.map(users, fn {uid, _} -> uid end) |> Enum.shuffle()
    #need length so can't chain
    {firstHalf, secondHalf} = Enum.split(shuffledKeys, div(Enum.count(shuffledKeys), 2))
    uidToDaily = Enum.zip(firstHalf, secondHalf) |>
      IO.inspect |>
      Enum.flat_map(fn {uid1, uid2} -> 
        dailyRoom = createDailyRoom()
        Endpoint.broadcast!("user:#{uid1}", "new_room", dailyRoom)
        Endpoint.broadcast!("user:#{uid2}", "new_room", dailyRoom)
        [{uid1, dailyRoom}, {uid2, dailyRoom}]
      end) |>
      Map.new

    IO.puts("NEW USERS:")
    #can't just use the uidToDaily as users, because there could be an odd number of user
    users = Enum.map(users, fn {uid, _oldDaily} -> 
      case Map.fetch(uidToDaily, uid) do 
        {:ok, newDaily} -> {uid, newDaily}
        :error -> {uid, %{}}
      end
    end) |> IO.inspect
    
    {:noreply, %{topic: topic, users: users}}
  end

  #Helpers
  defp createDailyRoom() do
    rawPayload = %{
      privacy: "public"
    }
    payload = Jason.encode!(rawPayload)
    url = "https://api.daily.co/v1/rooms"
    headers = ["Accept": "Application/json; Charset=utf-8", "Content-Type": "Application/json; charset=utf-8", 
      "Authorization": "Bearer #{Application.fetch_env!(:react_phoenix, :daily_api)}"]
    %HTTPoison.Response{status_code: 200, body: body} = HTTPoison.post! url, payload, headers
    IO.puts "CREATED DAILY ROOM"
    Jason.decode!(body)
  end
end