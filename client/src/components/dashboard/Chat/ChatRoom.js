import React, { Fragment, useEffect, useState, useRef } from 'react';
import ChatRoomFooter from './ChatRoomFooter';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomMessages from './ChatRoomMessages';
import ChatRoomDefault from './ChatRoomDefault';

const ChatRoom = ({
  user,
  room,
  next,
  setProfileOpen,
  setUserProfile,
  profileOpen,
  socket,
  setLastMessage,
}) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    if (room !== null && socket.current !== undefined)
      socket.current.emit('addRoom', room._id);
  }, [room]);

  useEffect(() => {
    if (socket.current !== undefined)
      socket.current.on('getMessage', (data) => {
        if (data.sender.id !== user.id) {
          setLastMessage(data);
          setArrivalMessage({
            sender: data.sender,
            message: data.message,
            room: data.room,
            createdAt: Date.now(),
          });
        }
      });
  }, [socket]);

  /*useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    console.log(arrivalMessage);
  }, [arrivalMessage]);*/

  useEffect(() => {
    if (room !== null) {
      setMessages(room.chat);
    }
  }, [room]);

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
          <ChatRoomMessages
            user={user}
            messages={messages === undefined ? [] : messages}
          />
          <ChatRoomFooter
            user={user}
            setMessages={setMessages}
            messages={messages}
            socket={socket}
            setLastMessage={setLastMessage}
            room={room}
          />
        </div>
      ) : (
        <ChatRoomDefault />
      )}
    </Fragment>
  );
};

export default ChatRoom;
