import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { getChats, afterPostMessage } from '../../../actions/chat';
import ChatRoomFooter from './ChatRoomFooter';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomMessages from './ChatRoomMessages';

const ChatRoom = ({ user, getChats, afterPostMessage }) => {
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
      <ChatRoomFooter user={user} />
    </div>
  );
};

export default connect(null, { getChats, afterPostMessage })(ChatRoom);
