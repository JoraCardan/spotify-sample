import { combineReducers } from 'redux';

import candidateReducer from './candidate';
import pageReducer from './page';

const allReducers = combineReducers({
  candidate: candidateReducer,
  page: pageReducer,
});

export default allReducers;
