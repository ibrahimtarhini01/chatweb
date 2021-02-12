import React from 'react';

const RoomItem = () => {
  return (
    <div className='d-flex sidebar-room '>
      <div className='sidebar-room-image'>
        <img
          className='rounded-circle'
          src='https://pu-cs-society.herokuapp.com/static/media/new-upper-logo.e0e7cb52.webp'
          alt=''
          width='49'
          height='49'
        />
      </div>
      <div className='flex-grow-1 border-bottom border-dark sidebar-room-info'>
        <div className='sidebar-room-info-top'>
          <div className='sidebar-room-title'>CMPS</div>
          <div className='sidebar-room-time secondary '>10:40 am</div>
        </div>
        <div className='sidebar-room-message secondary'>
          <div className='sidebar-room-user'>Ibrahim:&nbsp; </div>
          <div className='sidebar-room-text '>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel hic
            omnis numquam ea necessitatibus possimus facere cupiditate eum
            libero illo.
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
