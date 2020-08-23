import React, { useReducer, useState } from "react";
import combineReducers from "react-combine-reducers";
import { useSpring, animated as a } from "react-spring";

const sideInitialState = {
  side: "front",
};

const currentQualityOfResponseInitialState = {
  currentQualityOfResponse: 0,
};

const sideReducer = (state, action) => {
  switch (action.type) {
    case "flip_to_front":
      return { ...state, side: "front" };
    case "flip_to_back":
      return { ...state, side: "back" };
    case "reset":
      return sideInitialState;
    default:
      return state;
  }
};

const currentQualityOfResponseReducer = (state, action) => {
  switch (action.type) {
    case 5:
      return changeCurrentQualityOfResponse(5, state);
    case 4:
      return changeCurrentQualityOfResponse(4, state);
    case 3:
      return changeCurrentQualityOfResponse(3, state);
    case 2:
      return changeCurrentQualityOfResponse(2, state);
    case 1:
      return changeCurrentQualityOfResponse(1, state);
    case 0:
      return changeCurrentQualityOfResponse(0, state);
    default:
      return state;
  }
};

function changeCurrentQualityOfResponse(enteredQualityOfResponse, state) {
  return { ...state, currentQualityOfResponse: enteredQualityOfResponse };
}

const [rootReducerCombined, initialStateCombined] = combineReducers({
  side: [sideReducer, sideInitialState],
  currentQualityOfResponse: [
    currentQualityOfResponseReducer,
    currentQualityOfResponseInitialState,
  ],
});

export default function Flashcard(props) {
  const [state, dispatch] = useReducer(
    rootReducerCombined,
    initialStateCombined
  );
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <>
      <div onClick={() => setFlipped((state) => !state)}>
        <a.div
          className="c back"
          style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
        >
          <div className="flashcard-content">
            <div>{props.FrontTitle}</div>
            <div>{props.FrontText}</div>
          </div>
        </a.div>
        <a.div
          className="c front"
          style={{
            opacity,
            transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
          }}
        >
          <div>{props.BackTitle}</div>
          <div>{props.BackText}</div>
        </a.div>
      </div>
    </>
  );
  // return(
  //     <>
  //     <div className="flashcard">
  //       <div className="flashcard-content">
  //         <div>
  //           {state.side.side.localeCompare("back")===0 ? props.FrontTitle : null}
  //         </div>
  //         <div>
  //           {state.side.side.localeCompare("back")===0 ? props.FrontText : null}
  //         </div>
  //         <div>
  //           {state.side.side.localeCompare("front")===0 ? props.FrontTitle : props.BackTitle}
  //         </div>
  //         <div>
  //           {state.side.side.localeCompare("front")===0 ? props.FrontText : props.BackText}
  //         </div>
  //       </div>
  //     <button
  //         onClick={() => dispatch({
  //             type : state.side.side.localeCompare("front")===0 ? "flip_to_back" : "flip_to_front"
  //         })}>Click Me!
  //     </button>
  //     </div>
  //     </>
  // );
}
