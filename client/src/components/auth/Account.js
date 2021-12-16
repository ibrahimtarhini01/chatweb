import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Wave from 'react-wavify';
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
      <div className='container px-0 px-sm-3 position-relative'>
        <div
          className='card text-white  bg-main rounded-0 account border-0 '
          style={{ zIndex: '200' }}
        >
          <div className='navbar sticky-top  navbar-expand-lg bg-black  '>
            <div className='navbar-brand text-white pt-2 text-center w-100  '>
              <img src='/chatweb-brand.jpg' alt='brand' />
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
      <div className=''>
        <Wave
          className='wave '
          fill='#087c71'
          paused={false}
          options={{
            height: 20,
            amplitude: 55,
            speed: 0.2,
            points: 2,
          }}
        />
        <Wave
          className='wave wave2'
          fill='#087c71'
          paused={false}
          options={{
            height: 20,
            amplitude: 40,
            speed: 0.25,
            points: 3,
          }}
        />
        <Wave
          className='wave wave3'
          fill='#087c71'
          paused={false}
          options={{
            height: 20,
            amplitude: 30,
            speed: 0.3,
            points: 4,
          }}
        />
        <Wave
          className='wave wave4'
          fill='#087c71'
          paused={false}
          options={{
            height: 20,
            amplitude: 20,
            speed: 0.35,
            points: 5,
          }}
        />
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
