import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useSpring, animated as a } from "react-spring";
import { Edit, Save, Trash } from "react-feather";

import Button from "src/components/Button";
import { axios } from "src/utils/utils.js";

Flashcard.propTypes = {
  card: PropTypes.object,
  refreshCards: PropTypes.func,
};

const debug = require("debug")("app:FlashCard");
export default function Flashcard(props) {
  const [edit, setEdit] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  const [card, setCard] = useState(props.card);

  function startEdit() {
    debug("startEdit");
    setEdit(true);
  }

  function saveCardCurry(key) {
    return async (newText) => {
      const newCard = { ...card };
      newCard[key].text = newText;
      debug("saveCard");
      const resp = await axios.patch(`/api/cards/${card.id}`, {
        card: newCard,
      });
      const respCard = resp.data.data;
      debug("Edited card", respCard);
      setCard(respCard);
      setEdit(false);
    };
  }

  async function deleteCard() {
    debug("deleteCard");
    const resp = await axios.delete(`/api/cards/${card.id}`);
    debug("Deleted card", resp);
    setEdit(false);
    props.refreshCards();
  }

  async function answerCard(q) {
    debug("Card", `/api/cards/${card.id}/answer?q=${q}`);
    const resp = await axios.post(`/api/cards/${card.id}/answer?q=${q}`);
    const newCards = resp.data.data;
    debug("Got cards", newCards);
    console.log("calling refresh cards");
    props.refreshCards();
  }

  return (
    <div className="flex flex-col">
      <div
        className="w-128 h-88 relative"
        onClick={() => {
          if (!edit) {
            setFlipped((state) => !state);
            debug("FLIP");
          }
        }}
      >
        <a.div
          className="c back w-full h-full card-face"
          style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
        >
          <FlashCardSide
            title="Question"
            text={card.front.text}
            edit={edit}
            startEdit={startEdit}
            saveCard={saveCardCurry("front")}
            deleteCard={deleteCard}
          />
        </a.div>
        <a.div
          className="c front w-full h-full card-face"
          style={{
            opacity,
            transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
          }}
        >
          <FlashCardSide
            title="Answer"
            text={card.back.text}
            edit={edit}
            startEdit={startEdit}
            saveCard={saveCardCurry("back")}
            deleteCard={deleteCard}
          />
        </a.div>
      </div>
      <a.div
        className={"reactionContainer flex flex-row justify-between mt-5"}
        style={{
          opacity: opacity,
          visibility: opacity.interpolate((o) =>
            o == 0 ? "hidden" : "visible"
          ),
        }}
      >
        <Button onClick={() => answerCard(0)} variant="pink" size="large">
          1
        </Button>
        <Button onClick={() => answerCard(1)} variant="pink" size="large">
          2
        </Button>
        <Button onClick={() => answerCard(2)} variant="pink" size="large">
          3
        </Button>
        <Button onClick={() => answerCard(3)} variant="pink" size="large">
          4
        </Button>
        <Button onClick={() => answerCard(4)} variant="pink" size="large">
          5
        </Button>
        <Button onClick={() => answerCard(5)} variant="pink" size="large">
          6
        </Button>
      </a.div>
    </div>
  );
}

FlashCardSide.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  edit: PropTypes.bool,
  startEdit: PropTypes.func,
  saveCard: PropTypes.func,
  deleteCard: PropTypes.func,
};

function FlashCardSide(props) {
  const [text, setText] = useState(props.text);

  return (
    <div className="w-full h-full py-4 px-8 relative flex flex-col">
      {props.edit ? (
        <>
          <div
            className="absolute text-white z-10"
            style={{ top: 4, left: 4 }}
            onClick={(e) => {
              e.stopPropagation();
              props.deleteCard();
            }}
          >
            <Trash />
          </div>
          <div
            className="absolute text-white z-10"
            style={{ top: 4, right: 4 }}
            onClick={(e) => {
              e.stopPropagation();
              props.saveCard(text);
            }}
          >
            <Save />
          </div>
        </>
      ) : (
        <div
          className="absolute text-white z-10"
          style={{ top: 4, right: 4 }}
          onClick={(e) => {
            e.stopPropagation();
            props.startEdit();
          }}
        >
          <Edit />
        </div>
      )}
      <div className="text-3xl font-bold py-3">{props.title}</div>
      {props.edit ? (
        <textarea
          type="text"
          className="text-3xl font-bold py-3 text-black w-full bg-inherit mb-4"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <div className="text-3xl font-bold py-3">{props.text}</div>
      )}
    </div>
  );
}
