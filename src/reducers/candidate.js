const initialState = {
  isLoaded: false,
  isAuthenticated: false,
  favorites: [],
  recommendations: [],
  seed: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_INFO':
      return Object.assign({}, state, action.payload, {
        isLoaded: true,
        isAuthenticated: true,
      });

    case 'UPDATE_TRACKS':
      return Object.assign({}, state, {
        favorites: action.payload.tracks
      });

    case 'TOGGLE_FAVORITE':
      const newItem = action.payload.id;
      const newSeed = state.seed.slice();
      const index = newSeed.indexOf(newItem);
      if (index >= 0) {
        newSeed.splice(index, 1);
      } else {
        newSeed.push(newItem);
      }

      return Object.assign({}, state, {
        seed: newSeed
      })

    default:
      return state;
  }
};
