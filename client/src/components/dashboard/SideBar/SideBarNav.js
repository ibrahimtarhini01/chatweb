import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';
import { clearRoom } from '../../../actions/room';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Avatar from '../../layout/Avatar';
import Modal from '../../layout/Modal';
import AddRoom from './AddRoom';

const SideBarNav = ({
  user,
  setProfileOpen,
  logout,
  room,
  clearRoom,
  next,
}) => {
  return (
    <Fragment>
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
          <button
            className='btn btn-link text-center menu rounded-circle text-muted '
            onClick={() => {
              $('#addRoom').modal('show');
            }}
          >
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
              <div
                className='dropdown-item text-white py-2 '
                onClick={() => {
                  clearRoom();
                  $('#addRoom').modal('show');
                }}
              >
                <i className='fas fa-plus'></i> Add Room
              </div>
              <div
                className='dropdown-item text-white  py-2'
                onClick={() => {
                  $('#joinRoom').modal('show');
                }}
              >
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
      <Modal
        id='addRoom'
        Component={() => <AddRoom user={user} room={room} next={next} />}
      />
      <Modal
        id='joinRoom'
        Component={() => (
          <div className='modal-content rounded-0'>
            <div className='modal-header bg-main rounded-0'>
              <h4 className='modal-title ' id='staticBackdropLabel'>
                Join
              </h4>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span className='text-white' aria-hidden='true'>
                  &times;
                </span>
              </button>
            </div>
            <div className='modal-body text-center' style={{ height: '7rem' }}>
              {' '}
              <h4>You need to be logged in to access Meetings</h4>{' '}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                data-dismiss='modal'
                aria-label='Close'
                className='btn btn-dark bg-main rounded-0 '
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      />
    </Fragment>
  );
};

SideBarNav.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setProfileOpen: PropTypes.func.isRequired,
  clearRoom: PropTypes.func.isRequired,
};

export default connect(null, { logout, clearRoom })(SideBarNav);
