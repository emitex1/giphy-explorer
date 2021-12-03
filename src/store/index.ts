import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { totalReducers } from './totalReducers';

export const store = createStore(
  totalReducers,
  applyMiddleware(
    createLogger(),
  )
);
