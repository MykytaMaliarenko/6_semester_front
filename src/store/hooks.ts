import { createTypedHooks } from 'easy-peasy';
import { tWordsStore } from './types';

const { useStoreActions, useStoreState, useStoreDispatch, useStore } = createTypedHooks<tWordsStore>();

export {
  useStoreActions,
  useStoreState,
  useStoreDispatch,
  useStore
}
