import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearRoom, leaveRoom } from '../../../actions/room';

const ChatRoomHeader = ({
  user,
  room,
  clearRoom,
  leaveRoom,
  setProfileOpen,
  setUserProfile,
  profileOpen,
}) => {
  return (
    <div className='chatroom-nav  bg-main d-flex  align-items-center '>
      <i
        className='fas fa-arrow-left mr-4 ml-2 fa-lg cursor-pointer'
        onClick={() => {
          setProfileOpen(false);
          setUserProfile(null);
          clearRoom();
        }}
      ></i>
      <div className='mr-2 cursor-pointer'>
        <div
          className=''
          onClick={() => {
            setUserProfile(false);
            setProfileOpen(true);
          }}
        >
          <img
            className='rounded-circle'
            src={`https://res.cloudinary.com/tweetco/image/upload/w_40/${room.avatar}`}
            alt=''
            width='40'
            height='40'
          />
        </div>
      </div>
      <div className='chatroom-nav-info '>
        <div className='chatroom-nav-title '>{room.title}</div>
        <div className='chatroom-nav-message '>
          <span className='chatroom-nav-text secondary'>
            {room.members !== undefined
              ? room.members.map((m, id) => {
                  if (id !== room.members.length - 1) {
                    return m.username + ' , ';
                  } else {
                    return m.username;
                  }
                })
              : ''}
          </span>
        </div>
      </div>
      <div>
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
            <div className='dropdown-item text-white  py-2' onClick={() => {}}>
              <i className='fas fa-users mr-2'></i> Room Profile
            </div>

            <div
              className='dropdown-item text-white  py-2'
              onClick={() => {
                leaveRoom(room._id);
              }}
            >
              <i className='fas fa-sign-out-alt mr-2'></i> Leave
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ChatRoomHeader.propTypes = {
  clearRoom: PropTypes.func.isRequired,
  leaveRoom: PropTypes.func.isRequired,
};

export default connect(null, { clearRoom, leaveRoom })(ChatRoomHeader);
