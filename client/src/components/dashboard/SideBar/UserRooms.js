import React, { useState } from 'react';
import RoomItem from './RoomItem';

const UserRooms = ({ rooms }) => {
  const [input, setInput] = useState('');
  return (
    <div>
      <div className=' border-bottom border-dark py-2 px-4  '>
        <div className='form-inline w-100 bg-input border-0 rounded-pill '>
          <div className='d-flex w-100'>
            <button className='search btn text-muted d-flex text-center align-items-center justify-content-around'>
              <i className='fas fa-search'></i>
            </button>
            <div className='input-group  bg-transparent  border-0 w-50'>
              <input
                type='text'
                className='form-control bg-transparent  border-0 '
                id='password'
                placeholder='Search...'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div className='overflow-auto rooms'>
        {rooms.map((room, id) => {
          return <RoomItem room={room} key={id} />;
        })}
      </div>
    </div>
  );
};

export default UserRooms;
