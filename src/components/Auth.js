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
    const url = `https://accounts.spotify.com/authorize?client_id=${this.state.CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent('http://localhost:3000/logged_in')}&scope=${encodeURIComponent('user-top-read user-library-read')}`;

    const win = window.open(url, '_top');

    win.addEventListener("message", (e) => {
      console.log(e);
    })
  }

  render() {
    return (
      <div>
        <h1>You have to authenticate to Spotify First</h1>
        <button onClick={this.authUser.bind(this)}>Auth Me</button>
      </div>
    )
  }
}

export default Auth;
