import React, { useState, useEffect } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { connect } from 'react-redux';
import {
  kickMember,
  makeAdmin,
  removeAdmin,
  updateRoomInfo,
  editPassword,
} from '../../../actions/room';
import PropTypes from 'prop-types';

import Avatar from '../../layout/Avatar';
import Alert from '../../layout/Alert';
import { setAlert } from '../../../actions/alerts';

const RoomProfile = ({
  open,
  setProfileOpen,
  room,
  user,
  kickMember,
  makeAdmin,
  removeAdmin,
  updateRoomInfo,
  editPassword,
  setAlert,
}) => {
  const [priv, setPriv] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [title, setTitle] = useState(room !== null ? room.title : '');
  const [description, setDescription] = useState(
    room !== null ? room.description : '',
  );
  const [admin, setAdmin] = useState(
    room !== null
      ? room.admin.filter((item) => item.user === user.id).length > 0
      : false,
  );

  const [titleEdit, setTitleEdit] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
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
          className='fas fa-arrow-left  mx-4 cursor-pointer'
          onClick={() => setProfileOpen(false)}
        ></i>{' '}
        <h4 className='mb-0 '>Room Profile</h4>
      </div>
      <div className='profile-inner px-3  pt-3 overflow-auto'>
        <div className='mt-2'>
          <Alert />
        </div>
        <div className='d-flex justify-content-around w-100 py-4'>
          <div className='profile-avatar text-center'>
            {room !== null && (
              <Avatar
                avatar={room.avatar}
                room_id={room._id}
                width='200'
                open={open}
                edit={admin}
                cancel={cancel}
                confirm={confirm}
                setSelected={setSelected}
                setCancel={setCancel}
                setConfirm={setConfirm}
              />
            )}
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
            titleEdit ? 'border-bottom border-teal' : ''
          } `}
        >
          <label htmlFor='title'>Title</label>
          <div className='form-inline  bg-transparent'>
            <div className='input-group w-100 bg-transparent'>
              {!titleEdit ? (
                <input
                  disabled
                  type='text'
                  className='form-control rounded-0  text-white bg-transparent border-0 '
                  id='title'
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                <input
                  type='text'
                  className='form-control rounded-0  text-white bg-transparent border-0 '
                  id='title'
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              )}
              {admin && (
                <div className='input-group-prepend bg-transparent border-0'>
                  <span
                    className='input-group-text border-0 cursor-pointer bg-transparent '
                    id='inputGroupFileAddon01'
                    onClick={() => {
                      if (titleEdit && title !== user.title) {
                        updateRoomInfo(room._id, { description, title });
                      }
                      setTitleEdit(!titleEdit);
                    }}
                  >
                    {titleEdit ? (
                      <i className='fas fa-check teal'></i>
                    ) : (
                      <i className='fas fa-pen'></i>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='teal text-left mx-4 my-2 '>
          <label htmlFor='description'>Description</label>
          <div className='form-inline  bg-transparent'>
            <div className='input-group w-100 bg-transparent'>
              {!descriptionEdit ? (
                <textarea
                  disabled
                  className='form-control rounded  text-white bg-transparent border border-secondary '
                  id='description'
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              ) : (
                <textarea
                  className={
                    'form-control rounded  text-white bg-transparent border border-teal '
                  }
                  id='description'
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              )}
              {admin && (
                <div className='input-group-prepend bg-transparent border-0'>
                  <span
                    className='input-group-text border-0 cursor-pointer bg-transparent '
                    id='inputGroupFileAddon01'
                    onClick={() => {
                      if (descriptionEdit && description !== room.description) {
                        updateRoomInfo(room._id, { description, title });
                      }
                      setDescriptionEdit(!descriptionEdit);
                    }}
                  >
                    {descriptionEdit ? (
                      <i className='fas fa-check teal'></i>
                    ) : (
                      <i className='fas fa-pen'></i>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {admin && (
          <div className=''>
            {room.public ? (
              <div className={`teal text-left mx-4 my-4  `}>
                {!priv && (
                  <div
                    className='ml-auto bg-teal text-white btn teal-hover'
                    onClick={() => {
                      setPriv(true);
                    }}
                  >
                    Make Private
                  </div>
                )}
                {priv && (
                  <div
                    className='ml-auto  text-white btn btn-danger'
                    onClick={() => {
                      setPriv(false);
                    }}
                  >
                    Cancel
                  </div>
                )}
                {priv && (
                  <div className=' mt-4'>
                    <Alert />
                    <label htmlFor='password'>Password</label>
                    <div className='form-inline mb-4'>
                      <div className='input-group w-100 '>
                        <input
                          type={hidden ? 'password' : 'text'}
                          className='form-control '
                          id='password'
                          placeholder='Enter a password...'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />{' '}
                        <div className='input-group-prepend'>
                          <span
                            className='input-group-text border-left-0 cursor-pointer rounded-right'
                            id='inputGroupFileAddon01'
                            onClick={() => setHidden(!hidden)}
                          >
                            {!hidden ? (
                              <i className='far fa-eye-slash'></i>
                            ) : (
                              <i className='far fa-eye'></i>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <label htmlFor='confirmpassword'>Confirm Password</label>
                    <div className='form-inline mb-4'>
                      <div className='input-group w-100 '>
                        <input
                          type={hidden2 ? 'password' : 'text'}
                          className='form-control '
                          id='password2'
                          placeholder='Enter a password...'
                          value={password2}
                          onChange={(e) => setPassword2(e.target.value)}
                        />{' '}
                        <div className='input-group-prepend'>
                          <span
                            className='input-group-text border-left-0 cursor-pointer rounded-right'
                            id='inputGroupFileAddon01'
                            onClick={() => setHidden2(!hidden2)}
                          >
                            {!hidden2 ? (
                              <i className='far fa-eye-slash'></i>
                            ) : (
                              <i className='far fa-eye'></i>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                      <div
                        className='ml-auto bg-teal text-white btn teal-hover'
                        onClick={() => {
                          if (password === password2) {
                            editPassword(room._id, { password }).then(() =>
                              setPriv(false),
                            );
                          } else {
                            setAlert("Passwords Don't Match", 'danger');
                          }
                        }}
                      >
                        Add Password
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className={`teal text-left mx-4 my-4  `}>
                <div
                  className='ml-auto bg-teal text-white btn teal-hover'
                  onClick={() => {
                    editPassword(room._id, { password: undefined });
                  }}
                >
                  Make Public
                </div>
              </div>
            )}
          </div>
        )}
        {admin && !room.public && (
          <div className={`teal text-left mx-4 my-4  `}>
            {!priv ? (
              <div
                className='ml-auto bg-teal text-white btn teal-hover'
                onClick={() => setPriv(true)}
              >
                Change Password
              </div>
            ) : (
              <div
                className='ml-auto  text-white btn btn-danger'
                onClick={() => {
                  setPriv(false);
                }}
              >
                Cancel
              </div>
            )}
            {priv && (
              <div className=' mt-4'>
                <Alert />
                <label htmlFor='password'>Old Password</label>
                <div className='form-inline mb-4'>
                  <div className='input-group w-100 '>
                    <input
                      type={hidden ? 'password' : 'text'}
                      className='form-control '
                      id='password'
                      placeholder='Enter a password...'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />{' '}
                    <div className='input-group-prepend'>
                      <span
                        className='input-group-text border-left-0 cursor-pointer rounded-right'
                        id='inputGroupFileAddon01'
                        onClick={() => setHidden(!hidden)}
                      >
                        {!hidden ? (
                          <i className='far fa-eye-slash'></i>
                        ) : (
                          <i className='far fa-eye'></i>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <label htmlFor='confirmpassword'>New Password</label>
                <div className='form-inline mb-4'>
                  <div className='input-group w-100 '>
                    <input
                      type={hidden2 ? 'password' : 'text'}
                      className='form-control '
                      id='password2'
                      placeholder='Enter a password...'
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />{' '}
                    <div className='input-group-prepend'>
                      <span
                        className='input-group-text border-left-0 cursor-pointer rounded-right'
                        id='inputGroupFileAddon01'
                        onClick={() => setHidden2(!hidden2)}
                      >
                        {!hidden2 ? (
                          <i className='far fa-eye-slash'></i>
                        ) : (
                          <i className='far fa-eye'></i>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='d-flex justify-content-end'>
                  <div
                    className='ml-auto bg-teal text-white btn teal-hover'
                    onClick={() => {
                      editPassword(room._id, {
                        password: password2,
                        currentPassword: password,
                      }).then(() => {
                        setPriv(false);
                        setPassword('');
                        setPassword2('');
                      });
                    }}
                  >
                    Update Password
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className='teal text-left mx-4 my-3 '>
          <div>Members</div>
          <div className=' mt-2 rounded'>
            {room.members.map((member, id) => (
              <div key={id}>
                <ContextMenuTrigger
                  id={'same_unique_identifier' + member._id}
                  holdToDisplay={500}
                >
                  <div className='d-flex align-items-center justify-content-between py-2  sidebar-room border-bottom px-2 border-secondary position-relative'>
                    <div className='d-flex align-items-center '>
                      <img
                        className='rounded-circle'
                        src={`https://res.cloudinary.com/tweetco/image/upload/w_40/${member.avatar}`}
                        alt=''
                        width='40'
                        height='40'
                      />
                      <div className='mx-3 text-white'>{member.username}</div>
                    </div>
                    <div className='d-flex flex-column justify-content-center'>
                      {room.admin.filter((item) => item.user === member.user)
                        .length > 0 && (
                        <span
                          class={`badge badge-success bg-teal ${
                            member.user === user.id ? 'mb-1' : ''
                          }`}
                        >
                          Admin
                        </span>
                      )}
                      {member.user === user.id && (
                        <span class='badge badge-success bg-teal'>you</span>
                      )}
                    </div>
                  </div>
                </ContextMenuTrigger>
                {admin && member.user !== user.id && (
                  <ContextMenu
                    id={'same_unique_identifier' + member._id}
                    className='card react-contextmenu  bg-main border-0 shadow py-2'
                  >
                    <MenuItem
                      onClick={() => {
                        kickMember(room._id, member.user);
                      }}
                      className='react-contextmenu-item d-flex align-items-center justify-content-start text-white rounded-0 text-left'
                    >
                      <div>Kick User</div>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        if (
                          room.admin.filter((item) => item.user === member.user)
                            .length > 0
                        ) {
                          removeAdmin(room._id, member.user);
                        } else {
                          makeAdmin(room._id, member.user);
                        }
                      }}
                      className='react-contextmenu-item d-flex align-items-center justify-content-start text-white rounded-0 text-left'
                    >
                      {room.admin.filter((item) => item.user === member.user)
                        .length > 0 ? (
                        <div>Remove Admin</div>
                      ) : (
                        <div>Make An Admin</div>
                      )}
                    </MenuItem>
                  </ContextMenu>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

RoomProfile.propTypes = {
  open: PropTypes.bool,
  setProfileOpen: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  kickMember: PropTypes.func.isRequired,
  makeAdmin: PropTypes.func.isRequired,
  removeAdmin: PropTypes.func.isRequired,
  updateRoomInfo: PropTypes.func.isRequired,
  editPassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, {
  kickMember,
  makeAdmin,
  removeAdmin,
  updateRoomInfo,
  editPassword,
  setAlert,
})(RoomProfile);
