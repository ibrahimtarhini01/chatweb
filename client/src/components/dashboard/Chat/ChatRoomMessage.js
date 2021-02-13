import React from 'react';

const ChatRoomMessage = ({ username, text, time, user }) => {
  return (
    <div className={`chatroom-message${user ? '-user' : ''} py-2 px-3 my-2`}>
      {!user && <div className='text-primary'>{username}</div>}
      <div className=''>{text}</div>
      <div className='d-flex chatroom-message-time'>
        <span className='ml-auto'>{time}</span>
      </div>
    </div>
  );
};

export default ChatRoomMessage;
