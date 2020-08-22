import React, { useReducer } from "react";
import combineReducers from "react-combine-reducers";

import Flashcard from "./Flashcard";
import { SAMPLE_FLASHCARDS } from "../pages/dashboard";

export default function Flashcardlist(props) {
  const deck = props.deck;
  //const [state, dispatch] = useReducer(rootReducerCombined, initialStateCombined);
  const flashcards = deck.card_ids.map((card_id) => {
    const FlashcardProps = SAMPLE_FLASHCARDS.find(
      (flashcard) => flashcard.id === card_id
    );
    return (
      <Flashcard
        key={FlashcardProps.id}
        FrontTitle={FlashcardProps.FrontTitle}
        FrontText={FlashcardProps.FrontText}
        BackTitle={FlashcardProps.BackTitle}
        BackText={FlashcardProps.BackText}
      ></Flashcard>
    );
  });
  return (
    <div className="w-full h-full">
      {flashcards.map((flashcard) => {
        return flashcard;
      })}
    </div>
  );
}
