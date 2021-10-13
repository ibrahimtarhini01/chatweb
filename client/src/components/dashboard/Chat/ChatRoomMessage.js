import React from 'react';

const ChatRoomMessage = ({ username, text, time, user }) => {
  return (
    <div className={`chatroom-message${user ? '-user' : ''} py-2 px-3 my-2`}>
      {!user && <div className='text-primary'>{username}</div>}
      <div style={{ overflowWrap: 'break-word' }}>{text}</div>
      <div className='d-flex chatroom-message-time'>
        <span className='ml-auto'>
          {new Date(time).toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </span>
      </div>
    </div>
  );
};

export default ChatRoomMessage;
