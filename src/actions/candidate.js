
export const updateInfo = (data) => {
  return {
    type: 'UPDATE_INFO',
    payload: data
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
