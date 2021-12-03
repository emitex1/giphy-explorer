import { combineReducers } from 'redux';
import { giphyReducer } from './reducers/giphyReducer';

export const totalReducers = combineReducers({
  giphyReducer,
});