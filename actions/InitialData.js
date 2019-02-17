import * as API from '../utils/api';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';

export function handleInitialData () {
  return (dispatch) => {
    return API.getInitialData()
      .then((questions) => {
        dispatch(receiveQuestions(JSON.parse(questions)));

      })
  }
}

function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}
