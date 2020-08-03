import React, { useReducer } from 'react';
import combineReducers from 'react-combine-reducers';
import Link from "next/link";

import Flashcardlist from "./Flashcardlist"
import StudyApp from '../pages/StudyApp';

const studyInitialState = {
    study: false
}

const showDeckInitialState = {
    showDeck: true
}

const studyReducer = (state, action) => {
    switch (action.type) {
        case "start studying":
            return { ...state,
                side : true
            };
        case "not being studied":
            return { ...state,
                side: false
            };
        default: return state;
    }
}

const showDeckReducer = (state, action) => {
    switch (action.type) {
        case "hide deck":
            return { ...state,
                showDeck : false
            };
        case "show deck":
            return { ...state,
                showDeck : true
            };
        default: return state;
    }
}

const [rootReducerCombined, initialStateCombined] = combineReducers({
    study: [studyReducer, studyInitialState],
    showDeck: [showDeckReducer, showDeckInitialState]
});



export default function Deck(props){
    const deck = props.deck
    const [state, dispatch] = useReducer(rootReducerCombined, initialStateCombined);
    return(
        <div>
            <Link href="/StudyApp">
                <a className="deck">{deck.title}</a>
            </Link>
        </div>
    );
}