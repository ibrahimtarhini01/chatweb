import React from 'react';

const Avatar = ({ avatar, width }) => {
  return (
    <img
      src={`https://res.cloudinary.com/tweetco/image/upload/c_thumb,w_${width},g_face/${avatar}`}
      alt='avatar'
      className='rounded-circle'
    />
  );
};

export default Avatar;
