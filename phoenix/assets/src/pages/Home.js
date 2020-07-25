import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
const debug = require("debug")("app:Home");

import { axios } from "src/utils/utils.js";
import Navbar from "src/components/Navbar.js";
import Footer from "src/components/Footer.js";
import UserContext from "src/contexts/UserContext";

function Home(props) {
  const [questions, setQuestions] = useState([]);
  const { user } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();

  async function onSubmit(data) {
    debug(data);
    const resp = await axios.post("/api/questions", {
      question: { ...data, user_id: user.id },
    });
    debug(resp.data);
    refreshQuestions();
  }

  async function refreshQuestions() {
    const resp = await axios.get("/api/questions");
    const newQuestions = resp.data.data;
    setQuestions(newQuestions);
    debug(newQuestions);
  }

  useEffect(() => {
    refreshQuestions();
  }, []);

  const questionList = questions.map((q) => <QuestionCard key={q.id} {...q} />);

  return (
    <>
      <Navbar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex justify-between items-center p-8"
      >
        <input
          className="rounded-lg bg-gray-300 w-full py-1 px-2"
          name="text"
          placeholder="Ask a question"
          ref={register({ required: true })}
        />
        {errors.text && <span>This field is required</span>}
        <button
          className="rounded w-auto cursor-pointer outline-none flex items-center justify-center relative text-white bg-black font-semibold px-2 py-2 ml-8"
          type="submit"
        >
          Submit
        </button>
      </form>
      {questionList}
      <Footer />
    </>
  );
}

Home.propTypes = {};
export default Home;

function QuestionCard(props) {
  return (
    <div className="flex flex-row border bg-gray-400 justify-between items-center px-4 py-2">
      <div className="flex flex-col">
        <img className="w-16 h-16 rounded mb-2" src={props.user.picture} />
        <div>{props.user.name}</div>
      </div>
      {props.text}
    </div>
  );
}

QuestionCard.propTypes = {};
