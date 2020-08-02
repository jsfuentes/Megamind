import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
const debug = require("debug")("app:Home");

import { axios } from "src/utils/utils.js";
import Navbar from "src/components/Navbar.js";
import Footer from "src/components/Footer.js";
import UserContext from "src/contexts/UserContext";

function Home(props) {
  const { user } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();

  async function onSubmit(data) {
    debug(data);
  }

  return (
    <div className="w-screen h-screen flex flex-col">
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
      <div className="flex-1 flex justify-center items-center">
        Welcome to my World
      </div>
      <Footer />
    </div>
  );
}

Home.propTypes = {};
export default Home;
