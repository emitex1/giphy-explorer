import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { totalReducers } from './totalReducers';

export const store = createStore(
  totalReducers,
  applyMiddleware(
    createLogger(),
  )
);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
