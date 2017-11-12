import React, { Component } from 'react'
import { connect } from 'react-redux';

import Auth from './Auth';
import Tracks from './Tracks';
import {
  toggleToFavorites,
  fetchUserTopTracks,
  fetchRecommendations,
} from '../actions/candidate';

class User extends Component {
  constructor(props) {
    super(props);

    if (props.candidate.isAuthenticated && props.candidate.isLoaded) {
      this.props.fetchUserTopTracks();
    }
  }

  render() {
    const { candidate, toggleToFavorites } = this.props;

    return (
      <div>
        {(!candidate.isLoaded && !candidate.isAuthenticated) && <Auth />}

        {candidate.isLoaded && <h1 className="heading heading--bordered">Hi {candidate.display_name} </h1>}
        {candidate.isLoaded && <button className="btn" onClick={() => this.props.fetchRecommendations()}>Load Recommendations</button>}
        <div className="row">
          <div className="col">
            {candidate.isLoaded && <Tracks items={candidate.favorites} seed={candidate.seed} toggleItem={toggleToFavorites} />}
          </div>
          <div className="col">
            {candidate.isLoaded && <Tracks items={candidate.recommendations} />}
          </div>
        </div>
        {candidate.isLoaded && <button className="btn" onClick={() => this.props.fetchRecommendations()}>Load Recommendations</button>}
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
    fetchRecommendations: () => dispatch(fetchRecommendations()),
    toggleToFavorites: id => dispatch(toggleToFavorites(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
