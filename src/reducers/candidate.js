const initialState = {
  isLoaded: false,
  isAuthenticated: false,
  isLoading: false,
  tracksLoading: false,
  favorites: [],
  recommendations: [],
  seed: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'AUTH_USER':
      return Object.assign({}, state, {
        isAuthenticated: true,
      });

    case 'UPDATE_INFO':
      return Object.assign({}, state, action.payload, {
        isLoaded: true,
        isLoading: false,
      });

    case 'UPDATE_TRACKS':
      return Object.assign({}, state, {
        favorites: action.payload.tracks,
        tracksLoading: false,
      });

    case 'UPDATE_RECOMMENDATIONS_TRACKS':
      return Object.assign({}, state, {
        recommendations: action.payload.tracks,
        tracksLoading: false,
      });

    case 'LOADING_TRACKS':
      return Object.assign({}, state, {
        tracksLoading: true,
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
