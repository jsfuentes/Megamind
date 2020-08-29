import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSpring, animated as a } from "react-spring";
import { Edit, Save, Trash } from "react-feather";
import Button from "../components/Button";

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

  return (
    <div className="flex flex-col">
      <div
        className="w-128 h-88 relative"
        onClick={() => {
          setFlipped((state) => !state);
          debug("FLIP");
        }}
      >
        <a.div
          className="c back w-full h-full"
          style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
        >
          <FlashCardSide
            title="Question"
            text={props.FrontText}
            edit={edit}
            startEdit={startEdit}
            saveCard={saveCard}
            deleteCard={deleteCard}
          />
        </a.div>
        <a.div
          className="c front w-full h-full"
          style={{
            opacity,
            transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
          }}
        >
          <FlashCardSide
            title="Answer"
            text={props.BackText}
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
        <Button
          onClick={() => props.notifyReactionClicked()}
          variant="pink"
          size="large"
        >
          1
        </Button>
        <Button variant="pink" size="large">
          2
        </Button>
        <Button variant="pink" size="large">
          3
        </Button>
        <Button variant="pink" size="large">
          4
        </Button>
        <Button variant="pink" size="large">
          5
        </Button>
        <Button variant="pink" size="large">
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
      <div className="text-3xl font-bold py-3">{props.title}</div>
      <div>{props.text}</div>
    </div>
  );
}
