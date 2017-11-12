const initialState = {
  clientID: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  accessToken: '',
  tokenType: 'Bearer'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return Object.assign({}, state, {
        accessToken: action.payload.accessToken,
        tokenType: action.payload.tokenType
      })
    default:
      return state;
  }
}
