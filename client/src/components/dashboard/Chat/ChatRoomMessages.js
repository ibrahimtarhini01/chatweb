import React, { useEffect, useRef } from 'react';

import ChatRoomMessage from './ChatRoomMessage';

const ChatRoomMessages = ({ messages, user }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div className='chatroom-container d-flex flex-column'>
      {messages.map((message, id) => (
        <ChatRoomMessage
          key={id}
          user={message.sender.id === user.id}
          username={message.sender.username}
          text={message.message}
          time={message.createdAt}
        />
      ))}
      <span ref={scrollRef}></span>
    </div>
  );
};

export default ChatRoomMessages;
