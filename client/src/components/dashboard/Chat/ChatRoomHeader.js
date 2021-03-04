import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearRoom } from '../../../actions/room';
const ChatRoomHeader = ({ user, room, clearRoom }) => {
  return (
    <div className='chatroom-nav  bg-main d-flex  align-items-center '>
      <i
        className='fas fa-arrow-left mr-4 ml-2 fa-lg'
        onClick={() => {
          clearRoom();
        }}
      ></i>
      <div className='mr-2'>
        <div className=''>
          <img
            className='rounded-circle'
            src={`https://res.cloudinary.com/tweetco/image/upload/w_40/${room.avatar}`}
            alt=''
            width='40'
            height='40'
          />
        </div>
      </div>
      <div className='chatroom-nav-info'>
        <div className='chatroom-nav-title'>{room.title}</div>
        <div className='chatroom-nav-message'>
          <span className='chatroom-nav-text secondary'>
            {room.members.map((m) => m.username + ' , ')}
          </span>
        </div>
      </div>
    </div>
  );
};

ChatRoomHeader.propTypes = {
  clearRoom: PropTypes.func.isRequired,
};

export default connect(null, { clearRoom })(ChatRoomHeader);
