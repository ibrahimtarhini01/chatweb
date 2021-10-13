import React from 'react';
import { connect } from 'react-redux';
import { setCurrentRoom } from '../../../actions/room';
import PropTypes from 'prop-types';

const RoomItem = ({ room, setCurrentRoom }) => {
  return (
    <div
      className='d-flex sidebar-room '
      onClick={() => {
        console.log(room);
        setCurrentRoom(room);
      }}
    >
      <div className='sidebar-room-image'>
        <img
          className='rounded-circle'
          src={`https://res.cloudinary.com/tweetco/image/upload/w_49/${room.avatar}`}
          alt=''
          width='49'
          height='49'
        />
      </div>
      <div className='flex-grow-1 border-bottom border-dark sidebar-room-info'>
        <div className='sidebar-room-info-top'>
          <div className='sidebar-room-title'>{room.title}</div>
          {room.lastMessage.createdAt !== undefined ? (
            <div className='sidebar-room-time secondary '>
              {new Date(room.lastMessage.createdAt).toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </div>
          ) : (
            <div className='sidebar-room-time secondary '></div>
          )}
        </div>
        {room.lastMessage.username !== undefined ? (
          <div className='sidebar-room-message secondary'>
            <div className='sidebar-room-user'>
              {room.lastMessage.username}:&nbsp;{' '}
            </div>
            <div className='sidebar-room-text '>{room.lastMessage.message}</div>
          </div>
        ) : (
          <div className='sidebar-room-message secondary'>
            <div className='sidebar-room-user'></div>
            <div className='sidebar-room-text '></div>
          </div>
        )}
      </div>
    </div>
  );
};

RoomItem.propTypes = {
  room: PropTypes.object.isRequired,
  setCurrentRoom: PropTypes.func.isRequired,
};
export default connect(null, { setCurrentRoom })(RoomItem);
