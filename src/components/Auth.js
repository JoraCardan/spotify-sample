import React from 'react';

const Auth = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

  const authUser = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent('http://localhost:3000/')}&scope=${encodeURIComponent('user-top-read user-library-read')}`;
    window.open(url, '_self');
  }

  return (
    <div className="text--center">
      <h2 className="heading heading--bordered">You have to authenticate to Spotify First</h2>
      <button
        className="btn btn--accent"
        onClick={() => authUser()}
      >Auth Me</button>
    </div>
  );
}

export default Auth;
