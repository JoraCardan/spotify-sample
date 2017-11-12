import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

import Auth from './Auth';
import { updateUserTopTracks, toggleToFavorites } from '../actions/candidate';

class User extends Component {
  constructor(props) {
    super(props);

    this.showTracks = this.showTracks.bind(this);
    this.toggleItem = this.toggleItem.bind(this);

    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me/top/tracks',
      headers: {
        'Authorization': `Bearer ${props.spotify.accessToken}`
      }
    }).then(r => {
      props.updateUserTopTracks(r.data.items);
    }).catch(err => {
      console.log(err);
    });
  }

  toggleItem(e, item) {
    console.log(item.id);
    this.props.toggleToFavorites(item.id);
  }

  getRecommendations() {
    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/recommendations',
      params: {
        seed_tracks: this.props.candidate.seed
      },
      headers: {
        'Authorization': `Bearer ${this.props.spotify.accessToken}`
      }
    }).then(r => {
      this.props.updateUserTopTracks(r.data.items);
    }).catch(err => {
      console.log(err);
    });
  }

  showTracks() {
    const { favorites } = this.props.candidate;
    if (!favorites.length) {
      return null;
    }

    const tracks = favorites.map(item => {
      return (
        <li key={item.id} onClick={e => this.toggleItem(e, item)}>
          <figure>
            <img src={item.album.images[0].url} />
          </figure>
          <div className="content">
            <a href={item.external_urls.spotify} target="_blank">
              <h3>Album: {item.album.name}</h3>
              <h4>Song: {item.name}</h4>
            </a>
          </div>
        </li>
      );
    });

    return (
      <ul>
        {tracks}
      </ul>
    );
  }

  render() {
    const { candidate } = this.props;

    return (
      <div>
        {(!candidate.isLoaded && !candidate.isAuthenticated) && <Auth />}
        <h1>Hi {candidate.display_name} </h1>
        <h2>We're looking for your top tracks</h2>
        {this.showTracks()}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    candidate: state.candidate,
    spotify: state.spotify,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleToFavorites: id => dispatch(toggleToFavorites(id)),
    updateUserTopTracks: tracks => dispatch(updateUserTopTracks(tracks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
