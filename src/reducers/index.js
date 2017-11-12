import { combineReducers } from 'redux';

import candidateReducer from './candidate';
import pageReducer from './page';
import spotifyReducer from './spotify';

const allReducers = combineReducers({
  candidate: candidateReducer,
  page: pageReducer,
  spotify: spotifyReducer,
});

export default allReducers;
