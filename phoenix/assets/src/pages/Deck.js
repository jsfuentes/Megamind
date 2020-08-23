import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { axios } from "src/utils/utils.js";
import decks from "./decks.json";
import Flashcardlist from "src/components/Flashcardlist";
import Header from "src/components/Header";
const debug = require("debug")("app:Deck");

export default function Deck(props) {
  const [curCardIndex, setCardIndex] = useState(0);
  console.log("nuts");

  // const [deck, setDeck] = useState(null);
  const { id } = props.match.params;

  // useEffect(() => {
  //   async function f() {
  //     const resp = await axios.get(`/api/decks/${id}`);
  //     const newDeck = resp.data.data;
  //     debug("Got deck", newDeck);
  //     setDeck(newDeck);
  //   }

  //   f();
  // }, []);
  const deck = decks["deck_1"];

  console.log(deck);

  return (
    <div className={"text-white text-3xl"}>
      <div className={"text-white text-3xl"}>{deck.title}</div>
      <div className="flashcardlist-wrapper">
        <Flashcardlist curCardIndex={curCardIndex} deck={deck}></Flashcardlist>
      </div>
    </div>
  );
}
