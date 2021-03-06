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
import EndScreen from "../components/EndScreen";

const debug = require("debug")("app:Deck");

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

  async function refreshDeck() {
    const resp = await axios.get(`/api/decks/${id}`);
    const newDeck = resp.data.data;
    debug("Got deck", newDeck);
    setDeck(newDeck);
    refreshCards(newDeck.id);
  }

  useEffect(() => {
    refreshDeck();
  }, []);

  async function addCard() {
    const resp = await axios.post(`/api/cards`, {
      card: {
        front: { text: "" },
        back: { text: "" },
        deck_id: deck.id,
        next_session: deck.current_session,
      },
    });
    const newCard = resp.data.data;
    debug("Got card", newCard);
    refreshCards(deck.id);
  }

  async function nextSession() {
    const newDeck = { ...deck, current_session: deck.current_session + 1 };
    const resp = await axios.patch(`/api/decks/${deck.id}`, {
      deck: newDeck,
    });
    debug("Next session", resp);
    refreshDeck();
  }

  if (deck === null) {
    return null;
  }

  const currentCards = shuffle(cards).filter(
    (c) => c.next_session <= deck.current_session
  );
  const deckComplete = currentCards.length === 0 && cards.length > 0;
  debug({ cards, currentCards, deckComplete });
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
          {deckComplete ? (
            <EndScreen nextSession={nextSession} />
          ) : (
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
          )}
        </div>
      ) : (
        <Loading full={true} />
      )}
    </div>
  );
}

function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
