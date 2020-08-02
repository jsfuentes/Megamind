defmodule ReactPhoenixWeb.QuestionView do
  use ReactPhoenixWeb, :view
  alias ReactPhoenixWeb.QuestionView

  def render("index.json", %{questions: questions}) do
    %{data: render_many(questions, QuestionView, "question.json")}
  end

  def render("show.json", %{question: question}) do
    %{data: render_one(question, QuestionView, "question.json")}
  end

  def render("question.json", %{question: question}) do
    IO.inspect question
    %{id: question.id,
      text: question.text,
      user: question.user && render_one(question.user, ReactPhoenixWeb.UserView, "user.json"),
      user_id: question.user_id
    }
  end
end
