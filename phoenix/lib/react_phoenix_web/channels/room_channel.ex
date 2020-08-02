defmodule ReactPhoenixWeb.RoomChannel do
  use Phoenix.Channel
  alias ReactPhoenixWeb.Presence
  alias ReactPhoenixWeb.Scheduler

  def join("room:lobby", _message, socket) do
    send(self(), :after_join)
    {:ok, :hiii, socket}
  end

  def join("room:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_info(:after_join, socket) do
    IO.puts "Track #{socket.assigns.user_id}"
    Scheduler.new_user(socket.assigns.user_id)
    {:ok, _} = Presence.track(socket, socket.assigns.user_id, %{
      online_at: inspect(System.system_time(:second)),
      user_id: socket.assigns.user_id
    })

    push(socket, "presence_state", Presence.list(socket))
    {:noreply, socket}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast!(socket, "new_msg", %{body: body})
    if body === "tick" do
      IO.puts "TICK MSG"
      # x = Scheduler.get_room(socket.assigns.user_id)
      # IO.puts("After get")
      # IO.inspect x
    end
    {:noreply, socket}
  end

  def terminate(_, socket) do
    IO.puts "TERMINATE SOCKET #{socket.assigns.user_id}"
    Scheduler.delete_user(socket.assigns.user_id)
  end
end