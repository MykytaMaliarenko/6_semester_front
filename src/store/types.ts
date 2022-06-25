import {Action, Thunk} from "easy-peasy";

export interface tWordDefinition {
  definition: string;
  synonyms: string[];
  antonyms: string[];
}

export type tWordPartOfSpeech = 'noun' | 'pronoun' | 'verb' | 'adjective'
  | 'adverb' | 'preposition' | 'conjunction' | 'interjection';

export interface tWordMeaning {
  partOfSpeech: tWordPartOfSpeech;
  definitions: tWordDefinition[];
  synonyms: string[];
  antonyms: string[];
}

export interface tExtendedWordPhonetic {
  key: string;
  text: string;
  audio?: string;
  sourceUrl?: string;

}

export type tWordSearchSuccessfulResponse = {
  word: string;
  phonetics: tExtendedWordPhonetic[];
  meanings: tWordMeaning[];
}

export type tWordSearchNotFoundResponse = {
  title: string;
  message: string;
  resolution: string;
}

export type tWordSearchResponse = tWordSearchSuccessfulResponse | tWordSearchNotFoundResponse;

export interface tWordData extends tWordSearchSuccessfulResponse {
  id: number;
}

export interface tWordsStore {
  idCounter: number;
  current: tWordData | null;
  history: tWordData[];
  error: string | null;

  search: Thunk<tWordsStore, { word: string }, {}, tWordsStore>;
  successfulSearch: Action<tWordsStore, tWordSearchSuccessfulResponse>;
  failedSearch: Action<tWordsStore, { error: tWordSearchNotFoundResponse | unknown }>;
  returnToPreviousWord: Action<tWordsStore, { id: number }>;
}
