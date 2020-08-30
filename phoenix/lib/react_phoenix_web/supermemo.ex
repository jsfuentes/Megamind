defmodule ReactPhoenixWeb.Supermemo do
  def calculateNewValues(q, current_session, card) do
    easiness_factor =
      (card.easiness_factor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
      |> Float.round(3)
      |> Kernel.max(1.3)

    card =
      card
      |> Map.put(:easiness_factor, easiness_factor)

    if q < 3 do
      card
      |> Map.put(:next_session, current_session + 1)
      |> Map.put(:session_interval, 1)
      |> Map.put(:successful_session_count, 0)
    else
      successful_session_count = card.successful_session_count + 1

      card =
        card
        |> Map.put(:successful_session_count, successful_session_count)

      case successful_session_count do
        1 ->
          card
          |> Map.put(:next_session, current_session + 1)
          |> Map.put(:session_interval, 1)

        2 ->
          card
          |> Map.put(:next_session, current_session + 6)
          |> Map.put(:session_interval, 6)

        _ ->
          session_interval = card.session_interval * easiness_factor

          card
          |> Map.put(:next_session, current_session + session_interval)
          |> Map.put(:session_interval, session_interval)
      end
    end
  end
end

#  field :easiness_factor, :float
#  field :next_session, :integer
#  field :session_interval, :integer
#  field :successful_session_count, :integer
