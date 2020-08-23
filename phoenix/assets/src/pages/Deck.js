import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { axios } from "src/utils/utils.js";
import Flashcard from "src/components/Flashcard";
import Header from "src/components/Header";
import Button from "src/components/Button";
const debug = require("debug")("app:Deck");

const card = {
  id: 4,
  FrontTitle: "Question",
  FrontText: "What is Acute lymphoblastic leukaemia",
  BackTitle: "Answer",
  BackText:
    "Leukaemia is cancer of the white blood cells. Acute leukaemia means the condition progresses rapidly and aggressively and requires immediate treatment.",
};

export default function Deck(props) {
  const [curCardIndex, setCardIndex] = useState(0);
  console.log("nuts");

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

  if (deck === null) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className={"text-3xl container mx-auto"}>
        <div className="w-full py-6 flex flex-row justify-between">
          <div className="text-black text-3xl my-2">{deck.title}</div>
          <Button>Add Card</Button>
        </div>
        <div className="text-white w-full flex items-center justify-center">
          <Flashcard
            key={card.id}
            FrontTitle={card.FrontTitle}
            FrontText={card.FrontText}
            BackTitle={card.BackTitle}
            BackText={card.BackText}
          />
        </div>
      </div>
    </div>
  );
}
