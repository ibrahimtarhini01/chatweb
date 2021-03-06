import React, { useState, useEffect } from 'react';
import RoomItem from './RoomItem';

const UserRooms = ({ rooms, socket, user }) => {
  const [search, setSearch] = useState(null);

  useEffect(() => {
    if (search !== null) {
      setSearch(rooms);
    }
  }, [rooms, setSearch]);
  useEffect(() => {
    if (search === null) {
      setSearch(rooms);
      rooms.forEach((room) => {
        console.log(room);
        if (socket.current !== undefined)
          socket.current.emit('joinUser', room._id, user.username);
      });
    }
  }, [rooms, setSearch, socket]);
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
                className='form-control bg-transparent  border-0  text-white'
                id='search'
                placeholder='Search...'
                onChange={(e) => {
                  if (e.target.value !== '')
                    setSearch(
                      search.filter((room) =>
                        room.title
                          .toUpperCase()
                          .includes(e.target.value.toUpperCase()),
                      ),
                    );
                  else setSearch(rooms);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {search !== null && (
        <div className='overflow-auto rooms'>
          {search.map((room, id) => {
            return <RoomItem room={room} key={id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default UserRooms;
