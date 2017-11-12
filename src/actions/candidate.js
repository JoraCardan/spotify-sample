import axios from 'axios';

export const authUser = () => {
  return {
    type: 'AUTH_USER'
  }
}

export const loadingUserInfo = () => {
  return {
    type: 'LOADING_USER_INFO',
    paylod: {
      isLoading: true,
    }
  }
}

export const fetchInfo = () => {
  return (dispatch, getState) => {
    dispatch(loadingUserInfo())
    const { accessToken } = getState().spotify;
    return axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(r => {
      dispatch(updateInfo(r.data))
    })
  }
}

export const updateInfo = (data) => {
  return {
    type: 'UPDATE_INFO',
    payload: data
  }
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
