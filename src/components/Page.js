import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Auth from './Auth';
import AuthPart2 from './AuthPart2';

import { authUser } from '../actions/candidate';

const PageAuth = (props) => {
  const isConfigured = process.env.REACT_APP_CLIENT_ID || process.env.REACT_APP_CLIENT_SECRET;
  const { isAuthenticated } = props;

  if (window.location.hash) {
    props.authUser();
  }

  return (
    <div>
      {!isConfigured && <h1 className="heading heading--bordered">Please add Your Spotify Client ID to the .env file</h1>}
      {(isConfigured && !isAuthenticated) && <Auth />}
      {(isConfigured && isAuthenticated) && <AuthPart2 location={window.location} {...props} />}
    </div>
  )
}

PageAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.candidate.isAuthenticated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authUser: () => dispatch(authUser())
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PageAuth);
