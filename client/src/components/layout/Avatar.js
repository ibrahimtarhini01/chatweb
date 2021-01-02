import React, { Fragment, useState } from 'react';

const Avatar = ({ avatar, width, open, edit }) => {
  const [fileInputState1, setFileInputState1] = useState('');
  const [previewSource1, setPreviewSource1] = useState('');
  const [selectedFile1, setSelectedFile1] = useState();

  const handleFileInputChange1 = (e) => {
    const file = e.target.files[0];
    previewFile1(file);
    setSelectedFile1(file);
    setFileInputState1(e.target.value);
  };

  const previewFile1 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource1(reader.result);
    };
  };
  return (
    <div
      style={{ width: width + 'px', minHeight: width + 'px' }}
      className='position-relative'
    >
      {edit && (
        <input
          type='file'
          name='profilePic'
          accept='image/*'
          value={fileInputState1}
          onChange={handleFileInputChange1}
          className='profile-avatar-upload'
        />
      )}

      <img
        src={
          previewSource1 !== ''
            ? previewSource1
            : `https://res.cloudinary.com/tweetco/image/upload/c_thumb,w_${width},g_face/${avatar}`
        }
        alt='avatar'
        width={width}
        height={width}
        className={`rounded-circle ${
          open ? 'avatar-animation-open' : 'avatar-animation-close'
        } `}
      />
    </div>
  );
};

export default Avatar;
