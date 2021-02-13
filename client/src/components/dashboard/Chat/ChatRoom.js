import React from 'react';
import ChatRoomFooter from './ChatRoomFooter';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomMessages from './ChatRoomMessages';

const ChatRoom = ({ user }) => {
  return (
    <div className='chat-desktop'>
      <div
        className='chat-desktop'
        style={{
          backgroundImage:
            'url("https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png")',
          backgroundRepeat: 'repeat',
          opacity: 0.06,
          backgroundAttachment: 'fixed',
        }}
      ></div>
      <ChatRoomHeader user={user} />
      <ChatRoomMessages />
      <ChatRoomFooter />
    </div>
  );
};

export default ChatRoom;
