import React, { useReducer } from 'react';
import { Card } from 'react-bootstrap';

const initialState = {
    side : true
}

function reducer(state, action) {
    switch (action.type) {
        case "flip_to_front":
            return {
                side : true
            };
        case "flip_to_back":
            return {
                side: false
            };
        default:
            throw new Error();
    }
}

export default function FlashCard(props){
    // if side == true then the FRONT of the card is shown
    // else, the BACK of the card is shown 
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <>
        <div>
            <Card 
            style={{ width: '18rem'}, {"borderStyle":"solid"}}
            onClick={() => dispatch({
                type : state.side ? "flip_to_back" : "flip_to_front"
            })}
            >
                <Card.Body>
                    <Card.Title>
                        {state.side ? props.FrontTitle : props.BackTitle}
                    </Card.Title>
                    <Card.Text>
                        {state.side ? props.FrontContent : props.BackContent}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
        </>
    );
};