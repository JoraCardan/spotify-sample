
export const updateInfo = (state) => {
  return {
    type: 'UPDATE_INFO',
    payload: {
      user: state.user
    }
  }
}

export const parseUserTracks = (something) => {
  return {
    type: 'PARSE_TRACKS',
    payload: {
      tracks: something
    }
  }
}
