import FlashCard from './flashcard'
import React, { useState } from 'react';
export default function Deck(props) {
  const [collapsed,setCollapsed] = useState('true');
  var data = {cards: [
    {FrontTitle: "Question" , FrontContent: "What is Abdominal Aortic Aneurysm", BackTitle: "Answer", BackContent: "An abdominal aortic aneurysm (AAA) is a swelling (aneurysm) of the aorta – the main blood vessel that leads away from the heart, down through the abdomen to the rest of the body." },
    {FrontTitle: "Question" , FrontContent: "What is ACNE", BackTitle: "Answer", BackContent: "Acne is a common skin condition that affects most people at some point. It causes spots, oily skin and sometimes skin that's hot or painful to touch." },
    {FrontTitle: "Question" , FrontContent: "What is Acute Cholecystitis", BackTitle: "Answer", BackContent: "Acute cholecystitis is swelling (inflammation) of the gallbladder. It is a potentially serious condition that usually needs to be treated in hospital." },
    {FrontTitle: "Question" , FrontContent: "What is Acute lymphoblastic leukaemia", BackTitle: "Answer", BackContent: "Leukaemia is cancer of the white blood cells. Acute leukaemia means the condition progresses rapidly and aggressively and requires immediate treatment." }
  ]}

  var items = data['cards'].map(function(cardData){
    return (
      <FlashCard
      FrontTitle = {cardData.FrontTitle}
      FrontContent = {cardData.FrontContent}
      BackTitle ={cardData.BackTitle}
      BackContent = {cardData.BackContent}
      ></FlashCard>
    );
  });
      return (
        <div id = {props.title}>
           <button onClick= {()=> {setCollapsed(!collapsed)}}>{props.title}</button>
          {collapsed ? null:items}
        </div>
      );
  }
