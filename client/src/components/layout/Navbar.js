import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { isAuth, logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ isAuth, isAuthenticated, logout }) => {
  useEffect(() => {
    if (isAuthenticated === false) {
      isAuth();
    }
  }, [isAuth, isAuthenticated]);
  return (
    <div className='navbar sticky-top  navbar-expand-lg bg-black  '>
      <NavLink
        className='navbar-brand text-white pt-2 text-center w-100  '
        to='/'
      >
        <img src='/chathub-brand.jpg' alt='brand' />
      </NavLink>
    </div>
  );
};

Navbar.propTypes = {
  isAuth: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { isAuth, logout })(Navbar);
