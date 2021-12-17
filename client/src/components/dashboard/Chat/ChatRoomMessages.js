import React, { useEffect, useRef } from 'react';

import ChatRoomMessage from './ChatRoomMessage';

const ChatRoomMessages = ({ messages, user }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const compareDates = (date_1, date_2) => {
    const D1 = new Date(date_1);
    const D2 = new Date(date_2);
    if (D1.getFullYear() === D2.getFullYear() && D1.getDay() === D2.getDay())
      return true;
    else return false;
  };

  const getDiff = (date) => {
    const diffInMs = Date.now() - new Date(date);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return Math.ceil(diffInDays);
  };
  return (
    <div className='chatroom-container d-flex flex-column'>
      {messages.map((message, id) =>
        compareDates(
          message.createdAt,
          messages[id - 1] !== undefined
            ? messages[id - 1].createdAt
            : '10/10/1975',
        ) ? (
          <ChatRoomMessage
            key={id + message}
            user={message.sender.id === user.id}
            username={message.sender.username}
            text={message.message}
            time={message.createdAt}
          />
        ) : (
          <div className=''>
            <div className='w-100 d-flex justify-content-center'>
              <div className='chatroom-day-indicator px-2'>
                {getDiff(message.createdAt) === 1
                  ? 'yesterday'
                  : getDiff(message.createdAt) + ' days ago'}
              </div>
            </div>
            <ChatRoomMessage
              key={id + message}
              user={message.sender.id === user.id}
              username={message.sender.username}
              text={message.message}
              time={message.createdAt}
            />
          </div>
        ),
      )}
      <span ref={scrollRef}></span>
    </div>
  );
};

export default ChatRoomMessages;
