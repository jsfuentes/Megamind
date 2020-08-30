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

  function startEdit(e) {
    debug("startEdit ");
    console.log(e);
    e.stopPropagation();
    setEdit(true);
  }

  function saveCard(e) {
    debug("saveCard ");

    e.stopPropagation();
    setEdit(false);
  }

  function deleteCard(e) {
    debug("deleteCard ");

    e.stopPropagation();
    setEdit(false);
  }

  async function answerCard(q) {
    debug("Card", `/api/cards/${props.card.id}/answer?q=${q}`);
    const resp = await axios.post(`/api/cards/${props.card.id}/answer?q=${q}`);
    const newCards = resp.data.data;
    debug("Got cards", newCards);
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
            text={props.card.front.text}
            edit={edit}
            startEdit={startEdit}
            saveCard={saveCard}
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
            text={props.card.back.text}
            edit={edit}
            startEdit={startEdit}
            saveCard={saveCard}
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
    const titleRef = useRef();
    const descRef = useRef();
  
  return (
    <div className="w-full h-full py-4 px-8 relative">
      {props.edit ? (
        <>
          <div
            className="absolute text-white z-10"
            style={{ top: 4, left: 4 }}
            onClick={props.saveCard}
          >
            <Trash />
          </div>
          <div
            className="absolute text-white z-10"
            style={{ top: 4, right: 4 }}
            onClick={props.deleteCard}
          >
            <Save />
          </div>
        </>
      ) : (
        <div
          className="absolute text-white z-10"
          style={{ top: 4, right: 4 }}
          onClick={props.startEdit}
        >
          <Edit />
        </div>
      )}
      <div className="text-3xl font-bold py-3" contentEditable={props.edit} ref={titleRef}>{props.title}</div>
      <div ref={descRef} contentEditable={props.edit}>{props.text}</div>
    </div>
  );
}
