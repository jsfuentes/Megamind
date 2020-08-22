import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { axios } from "src/utils/utils.js";
import decks from "./decks.json";
import Flashcardlist from "src/components/Flashcardlist";
import Header from "src/components/Header";
const debug = require("debug")("app:Deck");

export default function Deck(props) {
  const [deck, setDeck] = useState(null);
  const { id } = props.match.params;

  useEffect(() => {
    async function f() {
      const resp = await axios.get(`/api/decks/${id}`);
      const newDeck = resp.data.data;
      debug("Got deck", newDeck);
      setDeck(newDeck);
    }

    f();
  }, []);

  return (
    <div className="text-white text-3xl">
      <Header />
      {deck && (
        <div>
          <div>{deck.title}</div>
          <div className="w-128 h-64">
            <Flashcardlist deck={decks["deck_1"]} />
          </div>
        </div>
      )}
    </div>
  );
}
