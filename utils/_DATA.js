import { AsyncStorage } from 'react-native';

export const APP_DATA = 'APP_DATA';
const DATA_INITIALIZED = 'DATA_INITIALIZED';

// Initial Dummy Data
let mobileDecks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      },
       {
        question: 'What is Redux and Mobx',
        answer: 'Redux and Mobx, help us with the state management'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is let',
        answer: 'Variables declared with the let keyword can have Block Scope.'
      }
    ]
  }
}

// We want to start with at least some data the first time the App is ran
export async function __setInitialDataInStorage () {
  return new Promise((res, rej) => {
    setTimeout( async () => {
      try {

        //AsyncStorage.clear()
        const dataIsInitialized = await AsyncStorage.getItem(DATA_INITIALIZED);
        if (dataIsInitialized) {
          const appData = await AsyncStorage.getItem(APP_DATA)
          res(appData)
        } else {
          await AsyncStorage.setItem(DATA_INITIALIZED, "true");
          AsyncStorage.setItem('APP_DATA', JSON.stringify(mobileDecks),  async() => {
            const data = await AsyncStorage.getItem(APP_DATA)
            res(data)
          });
        }
      } catch (err) {
        rej(err)
      }
    }, 1000)
  })
}

export async function __addNewDeck (deck) {
  return new Promise((res, rej) => {
    setTimeout(async () => {
      try {
        const appData = await AsyncStorage.getItem(APP_DATA)
        parsedData = JSON.parse(appData)
        const newData = {
          ...parsedData,
          [deck]:{
            ['questions']: [],
            ['title']: deck
          }
        }

        await AsyncStorage.setItem('APP_DATA', JSON.stringify(newData));
          const data = await AsyncStorage.getItem(APP_DATA)
          res(JSON.parse(data))
      } catch (err) {
        rej(err)
      }
    },1000)
  })
}

export async function __addNewCard (deckId, question) {
  return new Promise((res, rej) => {
    setTimeout(async () => {
      try {
        const appData = await AsyncStorage.getItem(APP_DATA)
        parsedData = JSON.parse(appData)
        const newData = {
          ...parsedData,
          [deckId]:{
            ...parsedData[deckId],
            ['questions']: parsedData[deckId].questions.concat(question)
          }
        }
        await AsyncStorage.setItem('APP_DATA', JSON.stringify(newData));
        res(question)
      } catch (err) {
        rej(err)
      }
    }, 1000)
  })
}

export async function __deleteDeck (deck) {
  return new Promise((res, rej) => {
    const deckToBeRemoved = deck
    setTimeout(async () => {
      try {
        const appData = await AsyncStorage.getItem(APP_DATA)
        const parsedData = JSON.parse(appData)
        const newData = Object.keys(parsedData).reduce((object, key) => {
          if (key !== deckToBeRemoved) {
            object[key] = parsedData[key]
          }
          return object
        }, {})
        await AsyncStorage.setItem('APP_DATA', JSON.stringify(newData));
        res(newData);
      } catch(err) {
        rej(err)
      }
    }, 1000)
  })
}

function getEmptyDeck (deckName) {
  return {
      title: deckName,
      questions: []
    }
}
