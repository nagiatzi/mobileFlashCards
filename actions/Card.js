import * as API from '../utils/api';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';

export function addNewCard (deckId, question) {
  return (dispatch) => {
    return API.addNewCard(deckId, question)
      .then((question) => {
        dispatch(addCard(question, deckId));
      })
  }
}

function addCard(question, deckId) {
  return {
    type: ADD_NEW_CARD,
    question,
    deckId
  }
}
