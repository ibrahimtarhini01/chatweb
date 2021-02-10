import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUsername } from '../../../actions/auth';
import PropTypes from 'prop-types';

import Avatar from '../../layout/Avatar';
import Alert from '../../layout/Alert';

const UserProfile = ({ open, setProfileOpen, user, updateUsername }) => {
  const [username, setUsername] = useState(user.username);

  const [edit, setEdit] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <div
      className={`profile text-center profile-animation-${
        open ? 'open' : open === false ? 'close' : ''
      }`}
    >
      <div className='d-flex mt-5 align-items-center py-3'>
        <i
          className='fas fa-arrow-left  mx-4'
          onClick={() => setProfileOpen(false)}
        ></i>{' '}
        <h4 className='mb-0 '>Profile</h4>
      </div>
      <div className='profile-inner px-3  pt-3 '>
        <div className='mt-2'>
          <Alert />
        </div>
        <div className='d-flex justify-content-around w-100 py-4'>
          <div className='profile-avatar text-center'>
            <Avatar
              avatar={user.avatar}
              width='200'
              open={open}
              edit={true}
              cancel={cancel}
              confirm={confirm}
              setSelected={setSelected}
              setCancel={setCancel}
              setConfirm={setConfirm}
            />
          </div>
        </div>
        {selected && (
          <div className='d-flex justify-content-around'>
            <div
              className='rounded-circle bg-success btn text-white btn-profile '
              onClick={() => {
                setConfirm(true);
                setProfileOpen(false);
              }}
            >
              <i class='fas fa-check'></i>
            </div>
            <div
              className='rounded-circle bg-danger btn text-white btn-profile '
              onClick={() => {
                setCancel(true);
              }}
            >
              <i class='fas fa-times'></i>
            </div>
          </div>
        )}
        <div
          className={`teal text-left mx-4 ${
            edit ? 'border-bottom border-teal' : ''
          } `}
        >
          <label htmlFor='username'>Your Name</label>
          <div className='form-inline  bg-transparent'>
            <div className='input-group w-100 bg-transparent'>
              {!edit ? (
                <input
                  disabled
                  type='text'
                  className='form-control rounded-0  text-white bg-transparent border-0 '
                  id='username'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                <input
                  type='text'
                  className='form-control rounded-0  text-white bg-transparent border-0 '
                  id='username'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              )}
              <div className='input-group-prepend bg-transparent border-0'>
                <span
                  className='input-group-text border-0 cursor-pointer bg-transparent '
                  id='inputGroupFileAddon01'
                  onClick={() => {
                    if (edit && username !== user.username) {
                      updateUsername(username);
                    }
                    setEdit(!edit);
                  }}
                >
                  {edit ? (
                    <i className='fas fa-check teal'></i>
                  ) : (
                    <i className='fas fa-pen'></i>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  open: PropTypes.bool,
  setProfileOpen: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  updateUsername: PropTypes.func.isRequired,
};

export default connect(null, { updateUsername })(UserProfile);
