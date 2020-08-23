import React, { useState } from "react";
import { useSpring, animated as a } from "react-spring";

export default function Flashcard(props) {
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div
      className="w-128 h-88 relative"
      onClick={() => setFlipped((state) => !state)}
    >
      <a.div
        className="c back w-full h-full"
        style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
      >
        <FlashCardSide title="Question" text={props.FrontText} />
      </a.div>
      <a.div
        className="c front w-full h-full"
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
        }}
      >
        <FlashCardSide title="Answer" text={props.BackText} />
      </a.div>
    </div>
  );
}

function FlashCardSide(props) {
  return (
    <div className="w-full h-full py-4 px-8">
      <div className="text-3xl font-bold py-3">{props.title}</div>
      <div>{props.text}</div>
    </div>
  );
}
