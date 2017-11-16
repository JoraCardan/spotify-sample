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
    this.state = {
      recommendations: props.recommendations || []
    }

    if (props.candidate.isAuthenticated && props.candidate.isLoaded) {
      this.props.fetchUserTopTracks();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.candidate.seed.length !== this.props.candidate.seed.length) {
      this.props.fetchRecommendations();
    }
  }

  render() {
    const { candidate, toggleToFavorites, fetchRecommendations } = this.props;

    return (
      <div>
        {(!candidate.isLoaded && !candidate.isAuthenticated) && <Auth />}

        {candidate.isLoaded && <h1 className="heading heading--bordered">Hi {candidate.display_name} </h1>}
        <div className="row">
          <div className="col">
            {candidate.isLoaded && <Tracks items={candidate.favorites} seed={candidate.seed} toggleItem={toggleToFavorites} />}
          </div>
          <div className="col">
            {candidate.isLoaded && <Tracks items={candidate.recommendations}></Tracks>}
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
    isLoaded: PropTypes.bool,
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
