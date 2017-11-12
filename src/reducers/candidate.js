const initialState = {
  isLoaded: false,
  isAuthenticated: false,
  favorites: [],
  attributes: {},
  recommendations: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_INFO':
      return Object.assign({}, state, action.payload, {
        isLoaded: true,
        isAuthenticated: true,
      });

    case 'PARSE_TRACKS':
      return Object.assign({}, state);

    default:
      return state;
  }
};
