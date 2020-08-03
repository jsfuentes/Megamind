import React, { useReducer } from 'react';
import combineReducers from 'react-combine-reducers';

import Deck from './Deck'


export default function Decklist(props){
    const decks = props.decks
    //const [state, dispatch] = useReducer(rootReducerCombined, initialStateCombined);
    return(
        <div className="deck-grid">
            {decks.map(deck => {
                return <Deck key={deck.id} deck={deck}></Deck>
            })}
        </div>
    );
}