import React from 'react';

const ChatRoomHeader = ({ user, room }) => {
  return (
    <div className='chatroom-nav  bg-main d-flex  align-items-center '>
      <div className='mr-2'>
        <div className=''>
          <img
            className='rounded-circle'
            src={`https://res.cloudinary.com/tweetco/image/upload/w_49/${room.avatar}`}
            alt=''
            width='49'
            height='49'
          />
        </div>
      </div>
      <div className='chatroom-nav-info'>
        <div className='chatroom-nav-title'>{room.title}</div>
        <div className='chatroom-nav-message'>
          <span className='chatroom-nav-text secondary'>
            {room.members.map((m) => m.username + ' , ')}
          </span>
        </div>
      </div>

      <div className=''>
        <div className='dropdown d-inline '>
          <button
            className='btn btn-link text-center menu rounded-circle text-muted '
            id='dropdownMenuButton'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <i className='fas fa-ellipsis-v '></i>
          </button>
          <div
            className='dropdown-menu dropdown-menu-right border-0 shadow cursor-pointer  bg-main text-white'
            aria-labelledby='dropdownMenuButton'
          >
            <div className='dropdown-item text-white py-2 '>
              <i className='fas fa-plus'></i> Add Room
            </div>
            <div className='dropdown-item text-white  py-2'>
              <i className='fas fa-user-plus'></i> Join Room
            </div>
            <div className='dropdown-item text-white  py-2'>
              <i className='fas fa-user'></i> User Profile
            </div>

            <div className='dropdown-item text-white  py-2'>
              <i className='fas fa-sign-out-alt'></i> Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomHeader;
