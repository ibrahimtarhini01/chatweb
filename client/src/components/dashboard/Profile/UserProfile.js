import React, { useState } from 'react';
import Avatar from '../../layout/Avatar';
const UserProfile = ({ open, setProfileOpen, user }) => {
  const [username, setUsername] = useState(user.username);

  const [edit, setEdit] = useState(true);

  return (
    <div
      className={`profile text-center profile-animation-${
        open ? 'open' : open === false ? 'close' : ''
      }`}
    >
      <div className='d-flex mt-5 align-items-center py-3'>
        <i
          class='fas fa-arrow-left  mx-4'
          onClick={() => setProfileOpen(false)}
        ></i>{' '}
        <h4 className='mb-0 '>Profile</h4>
      </div>
      <div className='profile-inner px-3  '>
        <div className='d-flex justify-content-around w-100 py-4'>
          {' '}
          <Avatar avatar={user.avatar} width='200' />
        </div>
        <div
          className={`teal text-left mx-4 ${
            !edit ? 'border-bottom border-teal' : ''
          } `}
        >
          <label htmlFor='username'>Your Name</label>
          <div className='form-inline  bg-transparent'>
            <div className='input-group w-100 bg-transparent'>
              {edit ? (
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
                  onClick={() => setEdit(!edit)}
                >
                  {!edit ? (
                    <i class='fas fa-check teal'></i>
                  ) : (
                    <i class='fas fa-pen'></i>
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

export default UserProfile;
