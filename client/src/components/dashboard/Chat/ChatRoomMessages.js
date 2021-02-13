import React from 'react';
import ChatRoomMessage from './ChatRoomMessage';

const ChatRoomMessages = () => {
  return (
    <div className='chatroom-container d-flex flex-column'>
      <ChatRoomMessage
        user={false}
        username={'oppailolitrap'}
        text={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, labore.'
        }
        time={'4:07 pm'}
      />
      <ChatRoomMessage
        user={true}
        username={'oppailolitrap'}
        text={'no'}
        time={'4:10 pm'}
      />
      <ChatRoomMessage
        user={false}
        username={'oppailolitrap'}
        text={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, labore.'
        }
        time={'4:07 pm'}
      />
      <ChatRoomMessage
        user={true}
        username={'oppailolitrap'}
        text={'no'}
        time={'4:10 pm'}
      />
      <ChatRoomMessage
        user={false}
        username={'oppailolitrap'}
        text={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, labore.'
        }
        time={'4:07 pm'}
      />
      <ChatRoomMessage
        user={true}
        username={'oppailolitrap'}
        text={'no'}
        time={'4:10 pm'}
      />
      <ChatRoomMessage
        user={false}
        username={'oppailolitrap'}
        text={
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, labore.'
        }
        time={'4:07 pm'}
      />
      <ChatRoomMessage
        user={true}
        username={'oppailolitrap'}
        text={'no'}
        time={'4:10 pm'}
      />
    </div>
  );
};

export default ChatRoomMessages;
