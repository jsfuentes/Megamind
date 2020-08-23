import React, { useReducer, useState } from "react";
import combineReducers from "react-combine-reducers";

import Flashcard from "./Flashcard";
import { SAMPLE_FLASHCARDS } from "../pages/dashboard";

// Todo: pass a function down to the child parent that sets a parent state variable, telling the parent that
// the deck is completed 

function getNextCard(curCardIndex, cardIds) {
  // Todo: this is gonna crash at the end. Make sure this doesnt happen lol.
  return SAMPLE_FLASHCARDS[cardIds[curCardIndex+1]];
}


export default function Flashcardlist(props) {
  const [curCardIndex, setCardIndex] = useState(0);
  const [card, setCard] = useState(null);
  console.log("THOMAS GOT HERE");
  const deck = props.deck;
  const cardIds = deck.card_ids;
  // const card = getNextCard(curCardIndex, cardIds);
  this.setCard(() => {
    console.log("WHAT");
    getNextCard(curCardIndex, cardIds)});
  console.log("THOMAS" + card);

  // function notifyReactionClicked() {
  //   setCardIndex((prevIndex) => prevIndex + 1)
  //   setCard(curCardIndex, cardIds);
  // }
  
  //const [state, dispatch] = useReducer(rootReducerCombined, initialStateCombined);
  // const flashcards = deck.card_ids.map((card_id) => {
  //   const FlashcardProps = SAMPLE_FLASHCARDS.find(
  //     (flashcard) => flashcard.id === card_id
  //   );
  //   return (
  //     <Flashcard
  //       key={FlashcardProps.id}
  //       FrontTitle={FlashcardProps.FrontTitle}
  //       FrontText={FlashcardProps.FrontText}
  //       BackTitle={FlashcardProps.BackTitle}
  //       BackText={FlashcardProps.BackText}
  //     ></Flashcard>
  //   );
  // });
  return (
    <div className="flashcardlist">
      <Flashcard
        key={card.id}
        FrontTitle={card.FrontTitle}
        FrontText={card.FrontText}
        BackTitle={card.BackTitle}
        BackText={card.BackText}
      ></Flashcard>
    </div>
  );
}
