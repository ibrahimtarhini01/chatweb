import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getChats, afterPostMessage } from '../../../actions/chat';
import ChatRoomMessage from './ChatRoomMessage';

const ChatRoomMessages = ({ getChats, afterPostMessage, chats }) => {
  useEffect(() => {
    if (chats === null) {
      getChats();
    }
  }, [getChats]);
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
const mapStateToProps = (state) => ({
  chats: state.chat.chats,
});
export default connect(mapStateToProps, { getChats, afterPostMessage })(
  ChatRoomMessages,
);
