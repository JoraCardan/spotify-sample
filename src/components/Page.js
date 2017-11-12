import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { getUrlParams } from '../helpers';
import { updateToken } from '../actions/spotify';
import { updateInfo } from '../actions/candidate';

class Page extends Component {
  componentDidMount() {
    const params = getUrlParams(this.props.location.hash.split('#')[1]);
    this.props.updateToken(params.access_token, params.token_type);

    axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: {
        'Authorization': `Bearer ${params.access_token}`
      }
    }).then(r => {
      this.props.updateUserInfo(r.data);
      this.props.history.push(`/user/${r.data.id}`)
    }).catch(err => {
      console.log(err);
    })
  }

  render() {
    return <h2>Still processing :)</h2>
  }
};

const mapStateToProps = (state) => {
  return {
    page: state.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateToken: (token, tokenType) => dispatch(updateToken(token, tokenType)),
    updateUserInfo: data => dispatch(updateInfo(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
