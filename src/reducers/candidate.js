const initialState = {
  isLoaded: false,
  isAuthenticated: false,
  favorites: [],
  attributes: {},
  reccomendations: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_INFO':
      return Object.assign({}, state);

    case 'PARSE_TRACKS':
      return Object.assign({}, state);

    default:
      return state;
  }
};
