import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUrlParams } from '../helpers';
import { updateToken } from '../actions/spotify';
import { fetchInfo } from '../actions/candidate';


class AuthPart2 extends Component {
  componentDidUpdate() {
    const { candidate } = this.props;

    if (candidate.isLoaded) {
      this.props.history.push(`/user/${candidate.id}`);
    }
  }
  componentDidMount() {
    const params = getUrlParams(this.props.location.hash.split('#')[1]);

    this.props.updateToken(params.access_token, params.token_type);
    this.props.fetchInfo();
  }

  render() {
    return (
      <div className="text--center">
        <img src="https://media.giphy.com/media/OiC5BKaPVLl60/giphy-tumblr.gif" alt="loading" />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    candidate: {
      isLoaded: state.candidate.isLoaded,
      id: state.candidate.id,
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInfo: () => dispatch(fetchInfo()),
    updateToken: (token, tokenType) => dispatch(updateToken(token, tokenType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthPart2)
