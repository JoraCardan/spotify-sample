import React from 'react';

import Auth from './Auth';

const PageAuth = (props) => {
  const isConfigured = process.env.REACT_APP_CLIENT_ID;

  return (
    <div>
      {isConfigured && <Auth />}
      {!isConfigured && <h1>Please add Your Spotify Client ID to the .env file</h1>}
    </div>
  )
}

export default PageAuth;
