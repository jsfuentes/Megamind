import React, { useState } from 'react';

import Flashcardlist from "../components/Flashcardlist"


export default function StudyApp(props) {
    const deck = props.deck
    const [flashcardList, setFlashcardList] = useState(null)
    return (
        <div className="container">
            <Flashcardlist deck={deck}></Flashcardlist>
        </div>
      );
  }