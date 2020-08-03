import React, { useState } from 'react';
import combineReducers from 'react-combine-reducers';

import Flashcard from "../flashcard/FlashCard"
import { SAMPLE_FLASHCARDS } from "../../pages/DecklistApp"


export default function Deck(props){
    const deck = props.deck
    const [collapsedState, setCollapsedState] = useState(false);
    var flashcards = deck.card_ids.map( card_id => {
        const FlashcardProps = SAMPLE_FLASHCARDS.find( flashcard => flashcard.id === card_id )
        return (
          <Flashcard
          key = {FlashcardProps.id}
          FrontTitle = {FlashcardProps.FrontTitle}
          FrontText = {FlashcardProps.FrontText}
          BackTitle ={FlashcardProps.BackTitle}
          BackText = {FlashcardProps.BackText}
          ></Flashcard>
        );
      });
    return(
        <div>
            <button onClick = { () =>
                setCollapsedState(!collapsedState)}>
                {deck.title}
            </button>
            {collapsedState ? null : flashcards}
        </div>
    );
}