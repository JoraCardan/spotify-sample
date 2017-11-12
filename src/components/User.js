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

    this.toggleItem = this.toggleItem.bind(this);

    if (props.candidate.isAuthenticated && props.candidate.isLoaded) {
      this.props.fetchUserTopTracks();
    }
  }

  toggleItem(e, item) {
    console.log(item.id);
    this.props.toggleToFavorites(item.id);
  }

  render() {
    const { candidate } = this.props;

    return (
      <div>
        {(!candidate.isLoaded && !candidate.isAuthenticated) && <Auth />}

        {candidate.isLoaded && <h1 className="heading heading--bordered">Hi {candidate.display_name} </h1>}
        {candidate.isLoaded && <button className="btn" onClick={() => this.props.fetchRecommendations()}>Load Recommendations</button>}
        <div className="row">
          <div className="col">
            {candidate.isLoaded && <Tracks items={candidate.favorites} toggleItem={this.toggleItem} />}
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
