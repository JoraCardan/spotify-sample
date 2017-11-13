import { combineReducers } from 'redux';

import candidateReducer from './candidate';
import spotifyReducer from './spotify';

const allReducers = combineReducers({
  candidate: candidateReducer,
  spotify: spotifyReducer,
});

export default allReducers;
