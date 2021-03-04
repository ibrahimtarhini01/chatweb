import React from 'react';
import Wave from 'react-wavify';
const ChatRoomDefault = () => {
  return (
    <div className='chat-desktop-default'>
      <Wave
        className='wave '
        fill='#087c71'
        paused={false}
        options={{
          height: 20,
          amplitude: 55,
          speed: 0.2,
          points: 2,
        }}
      />
      <Wave
        className='wave wave2'
        fill='#087c71'
        paused={false}
        options={{
          height: 20,
          amplitude: 40,
          speed: 0.25,
          points: 3,
        }}
      />
      <Wave
        className='wave wave3'
        fill='#087c71'
        paused={false}
        options={{
          height: 20,
          amplitude: 30,
          speed: 0.3,
          points: 4,
        }}
      />
      <Wave
        className='wave wave4'
        fill='#087c71'
        paused={false}
        options={{
          height: 20,
          amplitude: 20,
          speed: 0.35,
          points: 5,
        }}
      />
      <div className='chat-room-default-content'></div>
    </div>
  );
};

export default ChatRoomDefault;
