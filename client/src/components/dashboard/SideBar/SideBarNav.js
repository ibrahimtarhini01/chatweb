import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../actions/auth';
import PropTypes from 'prop-types';

import Avatar from '../../layout/Avatar';

const SideBarNav = ({ user, setProfileOpen, logout }) => {
  return (
    <div className='sidebar-nav bg-main d-flex justify-content-between align-items-center'>
      <div
        onClick={() => {
          setProfileOpen(true);
        }}
      >
        <Avatar
          avatar={user.avatar}
          width='40'
          edit={false}
          cancel={false}
          confirm={false}
        />
      </div>
      <div>
        <button className='btn btn-link text-center menu rounded-circle text-muted '>
          <i className='fas fa-user-plus'></i>
        </button>
        <div className='dropdown d-inline '>
          <button
            className='btn btn-link text-center menu rounded-circle text-muted '
            id='dropdownMenuButton'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <i className='fas fa-ellipsis-v '></i>
          </button>
          <div
            className='dropdown-menu dropdown-menu-right border-0 shadow cursor-pointer  bg-main text-white'
            aria-labelledby='dropdownMenuButton'
          >
            <div className='dropdown-item text-white py-2 '>
              <i className='fas fa-plus'></i> Add Room
            </div>
            <div className='dropdown-item text-white  py-2'>
              <i className='fas fa-user-plus'></i> Join Room
            </div>
            <div
              className='dropdown-item text-white  py-2'
              onClick={() => {
                setProfileOpen(true);
              }}
            >
              <i className='fas fa-user'></i> User Profile
            </div>

            <div
              className='dropdown-item text-white  py-2'
              onClick={() => {
                logout();
              }}
            >
              <i className='fas fa-sign-out-alt'></i> Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SideBarNav.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setProfileOpen: PropTypes.func.isRequired,
};

export default connect(null, { logout })(SideBarNav);