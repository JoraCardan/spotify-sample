import React, { Component } from 'react'
import PropTypes from 'prop-types';
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

    this.loadRecommendations = this.loadRecommendations.bind(this);
  }

  loadRecommendations() {
    const { candidate } = this.props;
    if (candidate.isLoaded && candidate.seed.length && !candidate.tracksLoading) {
      return <button className="btn" onClick={() => this.props.fetchRecommendations()}>Load Recommendations</button>;
    } else if (candidate.tracksLoading) {
      return (
        <div className="text--center">
          <img src="https://media.giphy.com/media/3y0oCOkdKKRi0/giphy.gif" alt="loading" />
        </div>
      );
    } else if (candidate.isLoaded) {
      return <button className="btn btn--disabled">Please Add to Favorites at least a couple of songs</button>
    }
  }

  render() {
    const { candidate, toggleToFavorites } = this.props;

    return (
      <div>
        {(!candidate.isLoaded && !candidate.isAuthenticated) && <Auth />}

        {candidate.isLoaded && <h1 className="heading heading--bordered">Hi {candidate.display_name} </h1>}
        <div className="row">
          <div className="col">
            {candidate.isLoaded && <Tracks items={candidate.favorites} seed={candidate.seed} toggleItem={toggleToFavorites} />}
          </div>
          <div className="col">
            {candidate.isLoaded && <Tracks items={candidate.recommendations}>{this.loadRecommendations()}</Tracks>}
          </div>
        </div>
      </div>
    );
  }
};

User.propTypes = {
  candidate: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    tracksLoading: PropTypes.bool,
    isLoaded: propTypes.bool,
    display_name: PropTypes.string,
    seed: PropTypes.array,
    favorites: PropTypes.array,
    recommendations: PropTypes.array,
  }).isRequired,
  spotify: PropTypes.object.isRequired,
  fetchUserTopTracks: PropTypes.func.isRequired,
  fetchRecommendations: PropTypes.func.isRequired,
  toggleToFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    candidate: state.candidate,
    spotify: state.spotify,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserTopTracks: () => dispatch(fetchUserTopTracks()),
    fetchRecommendations: () => dispatch(fetchRecommendations()),
    toggleToFavorites: id => dispatch(toggleToFavorites(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
