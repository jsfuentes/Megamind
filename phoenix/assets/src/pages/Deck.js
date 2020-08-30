import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Modal from "src/components/Modal";
import { axios } from "src/utils/utils.js";
import Flashcard from "src/components/Flashcard";
import Header from "src/components/Header";
import Loading from "src/components/Loading";
import Button from "src/components/Button";
import ProgressBar from "../components/ProgressBar";

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
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const { id } = props.match.params;

  async function refreshCards(deck_id) {
    let did = deck_id ? deck_id : deck.id;
    const resp = await axios.get(`/api/cards?deck_id=${did}`);
    const newCards = resp.data.data;
    debug("Got cards", newCards);
    setCards(newCards);
  }

  useEffect(() => {
    async function f() {
      const resp = await axios.get(`/api/decks/${id}`);
      const newDeck = resp.data.data;
      debug("Got deck", newDeck);
      setDeck(newDeck);
      refreshCards(newDeck.id);
    }

    f();
  }, []);

  async function addCard() {
    const resp = await axios.post(`/api/cards`, {
      card: {
        front: { text: "" },
        back: { text: "" },
        deck_id: deck.id,
      },
    });
    const newCard = resp.data.data;
    debug("Got card", newCard);
    refreshCards(deck.id);
  }

  if (deck === null) {
    return null;
  }

  const currentCards = cards.filter(
    (c) => c.next_session === deck.current_session
  );

  return (
    <div>
      <Header />
      {deck ? (
        <div className={"text-3xl container mx-auto"}>
          <div className="w-full py-6 flex flex-row justify-between">
            <div className="text-black text-3xl my-2">{deck.title}</div>
            <ProgressBar
              current={cards.length - currentCards.length}
              total={cards.length}
            />
            <Button onClick={addCard}>Add Card</Button>
          </div>
          <div className="text-white w-full flex items-center justify-center">
            {currentCards.length > 0 ? (
              <Flashcard
                key={currentCards[0].id}
                card={currentCards[0]}
                refreshCards={refreshCards}
              />
            ) : (
              <div className="text-3xl text-blue-900 font-semibold mt-4">
                Try adding a card
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading full={true} />
      )}
    </div>
  );
}
