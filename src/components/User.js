import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';

import Auth from './Auth';
import Tracks from './Tracks';
import { toggleToFavorites, fetchUserTopTracks } from '../actions/candidate';

class User extends Component {
  constructor(props) {
    super(props);

    this.toggleItem = this.toggleItem.bind(this);

    if (props.candidate.isAuthenticated && props.candidate.isLoaded) {
      this.props.fetchUserTopTracks();
    }
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

  render() {
    const { candidate } = this.props;

    return (
      <div>
        {(!candidate.isLoaded && !candidate.isAuthenticated) && <Auth />}
        <h1>Hi {candidate.display_name} </h1>
        <Tracks items={candidate.favorites} toggleItem={this.toggleItem} />
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
    fetchUserTopTracks: () => dispatch(fetchUserTopTracks()),
    toggleToFavorites: id => dispatch(toggleToFavorites(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
