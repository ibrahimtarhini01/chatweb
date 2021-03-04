import React, { Fragment, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { getChats, afterPostMessage } from '../../../actions/chat';
import ChatRoomFooter from './ChatRoomFooter';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomMessages from './ChatRoomMessages';
import ChatRoomDefault from './ChatRoomDefault';

const ChatRoom = ({ user, getChats, afterPostMessage, room }) => {
  return (
    <Fragment>
      {room !== null ? (
        <div
          className={`${
            room !== null && window.innerWidth < 800
              ? 'chat-mobile'
              : 'chat-desktop'
          }`}
        >
          <div
            className=''
            style={{
              backgroundImage:
                'url("https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png")',
              height: '100%',
              width: '100%',
              backgroundRepeat: 'repeat',
              opacity: 0.06,
              backgroundAttachment: 'fixed',
            }}
          ></div>
          <ChatRoomHeader user={user} room={room} />
          <ChatRoomMessages />
          <ChatRoomFooter user={user} />
        </div>
      ) : (
        <ChatRoomDefault />
      )}
    </Fragment>
  );
};

export default connect(null, { getChats, afterPostMessage })(ChatRoom);
