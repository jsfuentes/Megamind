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
                <Card.Body>
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
        </div>
        </>
    );
};
