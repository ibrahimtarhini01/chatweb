import React, { useState } from 'react';
import api from '../../../utils/api';
const ChatRoomFooter = ({
  user,
  setMessages,
  messages,
  socket,
  room,
  setLastMessage,
}) => {
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      message: message,
      createdAt: new Date(),
      username: user.username,
      sender: user.id,
    };

    setLastMessage({
      sender: { id: data.sender, username: data.username },
      room: room._id,
      message: data.message,
      createdAt: data.createdAt,
    });

    setMessages([
      ...messages,
      {
        sender: { id: data.sender, username: data.username },
        room: room._id,
        message: data.message,
        createdAt: data.createdAt,
      },
    ]);

    setMessage('');

    socket.current.emit('sendMessage', {
      sender: { id: data.sender, username: data.username },
      room: room._id,
      message: data.message,
    });

    try {
      await api.post('/chat', { ...data, room: room._id });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='chatroom-footer'>
      <form
        className='form-inline w-100 border-0 rounded-pill '
        onSubmit={(e) => onSubmit(e)}
      >
        <div className='d-flex w-100 '>
          <div className='input-group  bg-input w-100 rounded-pill  border-0 '>
            <input
              type='text'
              className='form-control bg-transparent text-white w-100 mx-2  border-0 '
              id='message'
              placeholder='Type a message'
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
              autoComplete='off'
            />
          </div>
          <button className='text-white btn p-0 ml-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
            >
              <path
                fill='currentColor'
                d='M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z'
              ></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoomFooter;
