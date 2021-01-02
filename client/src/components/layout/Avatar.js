import React from 'react';

const Avatar = ({ avatar, width, open }) => {
  return (
    <div style={{ width: width + 'px', minHeight: width + 'px' }}>
      <img
        src={`https://res.cloudinary.com/tweetco/image/upload/c_thumb,w_${width},g_face/${avatar}`}
        alt='avatar'
        className={`rounded-circle ${
          open ? 'avatar-animation-open' : 'avatar-animation-close'
        } `}
      />
    </div>
  );
};

export default Avatar;
