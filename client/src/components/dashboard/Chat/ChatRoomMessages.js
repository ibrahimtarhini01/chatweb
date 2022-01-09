import React, { useEffect, useRef } from 'react';

import ChatRoomMessage from './ChatRoomMessage';

const ChatRoomMessages = ({ messages, user, room }) => {
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
    const date1 = new Date(new Date(Date.now()).toDateString());
    const date2 = new Date(new Date(date).toDateString());
    const diffTime = date1.getTime() - date2.getTime();
    const DiffDays = diffTime / (1000 * 3600 * 24);

    return Math.floor(DiffDays);
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
                {getDiff(message.createdAt) < 1
                  ? 'Today'
                  : getDiff(message.createdAt) === 1
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
