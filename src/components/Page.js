import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const Page = (props) => {
  console.log(props);
  return(
    <div>
      <h1>{props.page.home.header.title}</h1>
      {props.children}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    page: state.page
  }
}

export default connect(mapStateToProps)(Page)
