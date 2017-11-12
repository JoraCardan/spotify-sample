import axios from 'axios';


export const updateInfo = (data) => {
  return {
    type: 'UPDATE_INFO',
    payload: data
  }
}

export const getUserInfo = (token) => {
  return axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const updateUserTopTracks = (tracks) => {
  return {
    type: 'UPDATE_TRACKS',
    payload: {
      tracks
    }
  }
}

export const toggleToFavorites = (id) => {
  return {
    type: 'TOGGLE_FAVORITE',
    payload: {
      id
    }
  }
}
