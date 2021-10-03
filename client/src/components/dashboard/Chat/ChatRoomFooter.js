import React, { useState } from 'react';
import { moment } from 'moment';
const ChatRoomFooter = ({ user }) => {
  const [message, setMessage] = useState('');
  return (
    <div className='chatroom-footer'>
      <form
        className='form-inline w-100 border-0 rounded-pill '
        onSubmit={(e) => {
          e.preventDefault();
          const data = {
            text: message,
            time: new Date().toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }),
            username: user.username,
            user: true,
          };
          console.log(data);
        }}
      >
        <div className='d-flex w-100 '>
          <div className='input-group  bg-input w-100 rounded-pill  border-0 '>
            <input
              type='text'
              className='form-control bg-transparent text-white w-100 mx-2  border-0 '
              id='message'
              placeholder='Type a message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
