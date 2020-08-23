import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";

import MM from "src/img/mm.png";
import Header from "src/components/Header";
import UserContext from "src/contexts/UserContext";
import CreateDeck from "src/components/CreateDeck";
import { axios } from "src/utils/utils.js";
import EndScreen from "../components/EndScreen";

const debug = require("debug")("app:Dashboard");

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function f() {
      const resp = await axios.get("/api/decks");
      const decks = resp.data.data;
      debug("Got decks", decks);
      setDecks(decks);
    }

    f();
  }, []);

  useEffect(() => {
    if (user) {
      toast(`Hello ${user && user.name}`);
    } else {
      toast("Not logged in");
    }
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center font-sans">
        <div className="flex flex-col justify-center container">
          <div className="w-full flex flex-row justify-between items-center my-2">
            <div className="w-1 h-1" />
            <CreateDeck />
          </div>
          <h1> Hello {user && user.name} </h1>
          <h3>Decks</h3>
          <div className="grid grid-cols-3">
            {Object.entries(decks).map(([id, value]) => {
              return (
                <Link to={`/deck/${value.id}`} key={id}>
                  <div className="flex p-6">
                    <img
                      src={MM}
                      className="h-48 w-48 flex-none bg-cover border-t border-b border-l border-gray-400 rounded-l text-center overflow-hidden object-contain"
                      alt="Megamind holding a mug"
                    />
                    <div className="border-r border-b border-t border-gray-400 lg:border-l-0 lg:border-gray-400 bg-green-900 hover:bg-green-200 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal text-white hover:text-black hover:border-transparent">
                      <div className="mb-8">
                        <div className="font-bold text-xl mb-2">
                          <div key={id}>{value.title}</div>
                        </div>
                        <p className="text-base">{value.subtitle}</p>
                      </div>
                      <div className="flex items-center">
                        <img
                          className="w-10 h-10 rounded-full mr-4"
                          src={value.user.picture}
                          alt="Tighten"
                        ></img>
                        <div className="text-sm">
                          <p className="leading-none">{value.user.name}</p>
                          <p className="">
                            {format(new Date(value.inserted_at), "MMM yy")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
