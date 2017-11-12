import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// starts up the Redux extension
import { composeWithDevTools } from 'redux-devtools-extension';

import allReducers from '../reducers/index';

const loggerMiddleware = createLogger();
const store = createStore(
  allReducers, {},
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )),
);

export default store;
