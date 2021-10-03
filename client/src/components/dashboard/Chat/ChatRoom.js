import React, { Fragment, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { getChats, afterPostMessage } from '../../../actions/chat';
import ChatRoomFooter from './ChatRoomFooter';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomMessages from './ChatRoomMessages';
import ChatRoomDefault from './ChatRoomDefault';

const ChatRoom = ({
  user,
  getChats,
  afterPostMessage,
  room,
  next,
  setProfileOpen,
  setUserProfile,
  profileOpen,
}) => {
  return (
    <Fragment>
      {room !== null ? (
        <div
          className={`${
            room !== null && window.innerWidth < 800 && !next
              ? 'chat-mobile'
              : 'chat-desktop'
          }`}
        >
          <div
            className=''
            style={{
              backgroundImage: 'url("bg.png")',
              height: '100%',
              width: '100%',
              backgroundRepeat: 'repeat',
              opacity: 0.06,
              backgroundAttachment: 'fixed',
            }}
          ></div>
          <ChatRoomHeader
            user={user}
            room={room}
            setProfileOpen={setProfileOpen}
            setUserProfile={setUserProfile}
            profileOpen={profileOpen}
          />
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
