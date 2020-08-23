defmodule ReactPhoenixWeb.Supermemo do
  def calculateNewValues(q, current_session, card) do
    if q < 3 do
      card
      |> Map.put(:next_session, current_session + 1)
      |> Map.put(:session_interval, 1)
      |> Map.put(:successful_session_count, 1)
    end

    successful_session_count = card.successful_session_count + 1
    easiness_factor = card.easiness_factor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))

    if new_successful_session_count === 2 do
      card
      |> Map.put(:next_session, current_session + 6)
      |> Map.put(:session_interval, 6)
      |> Map.put(:successful_session_count, successful_session_count)
      |> Map.put(:easiness_factor, easiness_factor)
    else
      session_interval = card.session_interval * easiness_factor

      card
      |> Map.put(:next_session, current_session + session_interval)
      |> Map.put(:session_interval, session_interval)
      |> Map.put(:successful_session_count, successful_session_count)
      |> Map.put(:easiness_factor, easiness_factor)
    end
  end
end

#  field :easiness_factor, :float
#  field :next_session, :integer
#  field :session_interval, :integer
#  field :successful_session_count, :integer
