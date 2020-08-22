import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import decks from "./decks.json";
import Flashcardlist from "src/components/Flashcardlist";
const debug = require("debug")("app:Deck");

export default function Deck(props) {
  const { id } = props.match.params;
  const deck = decks[id];
  debug("Deck", id, deck);
  if (!deck) return null;

  return (
    <div className="text-white text-3xl">
      <div>{deck.title}</div>
      <div className="flashcardlist-wrapper">
        <Flashcardlist deck={deck}></Flashcardlist>
      </div>
    </div>
  );
}
