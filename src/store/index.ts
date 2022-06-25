import {createStore, action, thunk} from 'easy-peasy';
import {tWordsStore, tWordSearchResponse, tWordSearchNotFoundResponse, tWordSearchSuccessfulResponse} from "./types"
import axios, {AxiosError} from "axios";

export const model: tWordsStore = {
  idCounter: 0,
  history: [],
  current: null,
  error: null,

  search: thunk(async (actions, {word}) => {
    try {
      let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data: tWordSearchResponse = response.data[0];

      if ((data as tWordSearchNotFoundResponse).title) {
        actions.failedSearch({error: 'Word not found =('});
      } else {
        actions.successfulSearch(data as tWordSearchSuccessfulResponse);
      }
    } catch (error) {
      actions.failedSearch({error});
    }
  }),
  successfulSearch: action((state, payload) => {
    payload.phonetics = payload.phonetics.map(
      (phonetic) => ({
        ...phonetic,
        key: Math.random().toString()
      })
    );

    const wordData = {id: state.idCounter, ...payload};

    state.history.unshift(wordData);
    state.current = wordData;
    state.idCounter++;
    state.error = null;

    if (state.history.length > 5) {
      state.history.pop();
    }
  }),
  failedSearch: action((state, {error}) => {
    if (error instanceof AxiosError) {
      console.log({error});
      state.error = error.response?.status === 404 ? 'Word not found =(' : error.message;
    } else if (error instanceof Error) {
      state.error = error.message;
    } else {
      state.error = 'Something went wrong';
    }
  }),

  returnToPreviousWord: action((state, {id}) => {
    state.current = state.history.find((entry) => entry.id === id) || state.current;
  })
};

export const store = createStore<tWordsStore>(model);
