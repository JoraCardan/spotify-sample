import React, { Component } from 'react';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
      CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET,
    }
  }

  authUser() {
    const url = `https://accounts.spotify.com/authorize?client_id=${this.state.CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent('http://localhost:3000/')}&scope=${encodeURIComponent('user-top-read user-library-read')}`;
    window.open(url, '_self');
  }

  render() {
    return (
      <div className="text--center">
        <h2 className="heading heading--bordered">You have to authenticate to Spotify First</h2>
        <button
          className="btn btn--accent"
          onClick={this.authUser.bind(this)}
        >Auth Me</button>
      </div>
    )
  }
}

export default Auth;
