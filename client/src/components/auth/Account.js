import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SignIn from './SignIn';
import Register from './Register';

const Account = ({ isAuthenticated }) => {
  const [login, setLogin] = useState(true);
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div>
      <div className='card text-white mb-3 bg-main rounded-0 account border-0'>
        <div className='navbar sticky-top  navbar-expand-lg bg-black  '>
          <div className='navbar-brand text-white pt-2 text-center w-100  '>
            <img src='/chathub-brand.jpg' alt='brand' />
          </div>
        </div>
        {/**Header */}
        <div className='card-header d-flex flex-row p-0 mb-4 cursor-pointer'>
          <div
            className={`w-50 text-center p-3 ${login ? 'bg-selected' : ''}`}
            onClick={() => setLogin(true)}
          >
            <h5 className='m-0'> Login</h5>
          </div>
          <div
            className={`w-50 text-center p-3 ${!login ? 'bg-selected' : ''}`}
            onClick={() => setLogin(false)}
          >
            <h5 className='m-0'> Register</h5>
          </div>
        </div>
        {login ? <SignIn /> : <Register />}
      </div>
    </div>
  );
};

Account.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Account);
