import React, { useState } from 'react';

import Decklist from '../components/decklist/Decklist'

export default function DecklistApp(props) {
  const [decks, setDecks] = useState(SAMPLE_DECKLIST)
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
      return (
        <div>
          <Decklist decks={decks}/>
        </div>
      );
  }

const SAMPLE_DECKLIST = [
  {
   id: 1,
   title: "Anatomy",
   subtitle: "POOP",
   author: "Euano Boobina",
   card_ids: [1, 2]
  },
  {
  id: 2,
  title: "Physiology",
  subtitle: "POOPY",
  author: "Shakthano Donglehead", 
  card_ids: [3, 4]
  } 
]

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    FrontTitle: "Question",
    FrontContent: "What is Abdominal Aortic Aneurysm",
    BackTitle: "Answer",
    BackContent: "An abdominal aortic aneurysm (AAA) is a swelling (aneurysm) of the aorta – the main blood vessel that leads away from the heart, down through the abdomen to the rest of the body."
  },
  {
    id: 2,
    FrontTitle: "Question",
    FrontContent: "What is ACNE",
    BackTitle: "Answer",
    BackContent: "Acne is a common skin condition that affects most people at some point. It causes spots, oily skin and sometimes skin that's hot or painful to touch."
  },
  {
    id: 3,
    FrontTitle: "Question",
    FrontContent: "What is Acute Cholecystitis",
    BackTitle: "Answer",
    BackContent: "Acute cholecystitis is swelling (inflammation) of the gallbladder. It is a potentially serious condition that usually needs to be treated in hospital."
  },
  {
    id: 4,
    FrontTitle: "Question",
    FrontContent: "What is Acute lymphoblastic leukaemia",
    BackTitle: "Answer",
    BackContent: "Leukaemia is cancer of the white blood cells. Acute leukaemia means the condition progresses rapidly and aggressively and requires immediate treatment."
  }
]

export { SAMPLE_FLASHCARDS };
