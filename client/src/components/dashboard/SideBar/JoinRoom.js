import React, { Fragment, useState, useEffect } from 'react';
import Avatar from '../../layout/Avatar';
import Alert from '../../layout/Alert';
import { connect } from 'react-redux';
import { getRoomInfo, joinRoom, clearRoomPreview } from '../../../actions/room';
import PropTypes from 'prop-types';
import $ from 'jquery';

const JoinRoom = ({
  user,
  getRoomInfo,
  roomPreview,
  room,
  clearRoomPreview,
  joinRoom,
}) => {
  const [id, setId] = useState('');
  const [hidden, setHidden] = useState(true);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (roomPreview === null && room !== null) {
      $('#joinRoom').modal('hide');
    }
  }, [roomPreview, room]);

  return (
    <div className='modal-content border-0'>
      <div className='modal-header bg-main border-0 '>
        <h4 className='modal-title ' id='staticBackdropLabel'>
          Join a Room
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
      {roomPreview === null ? (
        <div className='modal-body text-center border-0  bg-main'>
          <h6 className='text-muted mb-4'>
            Your Room is where you and your friends hangout. Join a room and
            start talking
          </h6>
          <form className='text-left'>
            <label htmlFor='id'>Invitation ID</label>
            <div className='form-inline mb-4 bg-transparent  border-primary rounded'>
              <div className='input-group w-100 rounded '>
                <input
                  type='text'
                  className='form-control bg-transparent border rounded-left border-primary text-white '
                  id='id'
                  placeholder='Please Enter the Invitation ID'
                  onChange={(e) => setId(e.target.value)}
                  value={id}
                />{' '}
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className='modal-body  border-0  bg-main'>
          <Alert />
          <div className='d-flex justify-content-around w-100 py-4'>
            <div className='profile-avatar text-center'>
              <Avatar
                room_id={roomPreview._id}
                avatar={roomPreview.avatar}
                width='200'
                edit={false}
              />
            </div>
          </div>
          {!roomPreview.public && (
            <Fragment>
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
            </Fragment>
          )}
        </div>
      )}
      <div className='modal-footer bg-main border-0 '>
        {roomPreview === null ? (
          <button
            type='Submit'
            className='btn   border-0 account-btn btn-block
          btn-primary ml-auto '
            onClick={() => {
              console.log(id);
              getRoomInfo(id);
            }}
          >
            Search
          </button>
        ) : (
          <button
            type='Submit'
            className='btn   border-0 account-btn btn-block
          btn-primary ml-auto '
            onClick={() => {
              joinRoom(roomPreview._id, { password: password });
            }}
          >
            Join
          </button>
        )}
      </div>
    </div>
  );
};

JoinRoom.propTypes = {
  getRoomInfo: PropTypes.func.isRequired,
  joinRoom: PropTypes.func.isRequired,
};
export default connect(null, { getRoomInfo, clearRoomPreview, joinRoom })(
  JoinRoom,
);
