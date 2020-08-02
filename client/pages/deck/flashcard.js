import React, { useReducer } from 'react';
import combineReducers from 'react-combine-reducers';
import { Card } from 'react-bootstrap';

const sideInitialState = {
    side: "front"
}

const memdataInitialState = {
    currentQualityOfResponse: 0 
}

const sideReducer = (state, action) => {
    switch (action.type) {
        case "flip_to_front":
            return { ...state,
                side : "front"
            };
        case "flip_to_back":
            return { ...state,
                side: "back"
            };
        case "reset":
            return sideInitialState;
        default: return state;
    }
}

const memdataReducer = (state, action) => {
    console.log(state)
    switch (action.type) {
        case 5:
            return changeMemdataCurrentQualityOfResponse(5, state);
        case 4:
            return changeMemdataCurrentQualityOfResponse(4, state);
        case 3:
            return changeMemdataCurrentQualityOfResponse(3, state);
        case 2:
            return changeMemdataCurrentQualityOfResponse(2, state);
        case 1:
            return changeMemdataCurrentQualityOfResponse(1, state);
        case 0:
            return changeMemdataCurrentQualityOfResponse(0, state);
        default: return state;
        ;
    }
}

function changeMemdataCurrentQualityOfResponse(enteredQualityOfResponse, state) {
    return { ...state,
        currentQualityOfResponse: enteredQualityOfResponse
    }
}

const [rootReducerCombined, initialStateCombined] = combineReducers({
    side: [sideReducer, sideInitialState],
    memdata: [memdataReducer,  memdataInitialState]
});

export default function FlashCard(props){
    // if side == true then the FRONT of the card is shown
    // else, the BACK of the card is shown 
    const [state, dispatch] = useReducer(rootReducerCombined, initialStateCombined);
    console.log(state)
    return(
        <>
        <div>
            <Card 
            style={{ "width" : '18rem' }, { "borderStyle" : "solid" }}
            onClick={() => dispatch({
                type : state.side.side.localeCompare("front")==0 ? "flip_to_back" : "flip_to_front"
            })}
            >
                <Card.Body class = "card">
                    <Card.Title>
                        {state.side.side.localeCompare("front")==0 ? props.FrontTitle : props.BackTitle}
                    </Card.Title>
                    <Card.Text>
                        {state.side.side.localeCompare("front")==0 ? props.FrontContent : props.BackContent}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
        <div>
        <button 
            onClick={() => dispatch({
                type: 5
                })}>
            Perfect response (5)
        </button>
        </div>
        <div>
        <button 
            onClick={() => dispatch({
                type: 4
                })}>
            Correct with some hesitation (4)
        </button>
        </div>
        <div>
        <button 
            onClick={() => dispatch({
                type: 3
                })}>
            Correct with great difficulty (3)
        </button>
        </div>
        <div>
        <button 
            onClick={() => dispatch({
                type: 2
                })}>
            Incorrect response; remembered after flipping (2)
        </button>
        </div>
        <div>
        <button 
            onClick={() => dispatch({
                type: 1
                })}>
            Incorrect response; recognized after flipping (1)
        </button>
        </div>
        <div>
        <button 
            onClick={() => dispatch({
                type: 0
                })}>
            Complete blackout (0)
        </button>
        </div>
        <div>
        <button 
            onClick={() => dispatch({
                type: "reset"
                })}>
            Reset
        </button>
        <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
        </div>
        </>
    );
};
