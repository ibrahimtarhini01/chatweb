import React, { useEffect } from 'react';
import { isAuth } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Auth = ({ isAuth, isAuthenticated }) => {
  useEffect(() => {
    if (isAuthenticated === false) {
      isAuth();
    }
  }, [isAuth, isAuthenticated]);
  return <div></div>;
};

Auth.propTypes = {
  isAuth: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { isAuth })(Auth);
