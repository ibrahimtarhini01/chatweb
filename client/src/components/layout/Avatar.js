import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateProfilePic } from '../../actions/auth';
import PropTypes from 'prop-types';

const Avatar = ({
  avatar,
  width,
  open,
  edit,
  updateProfilePic,
  cancel,
  confirm,
  setSelected,
  setCancel,
  setConfirm,
}) => {
  const [fileInputState1, setFileInputState1] = useState('');
  const [previewSource1, setPreviewSource1] = useState('');
  const [selectedFile1, setSelectedFile1] = useState();

  useEffect(() => {
    console.log(1);
    if (cancel) {
      setFileInputState1('');
      setPreviewSource1('');
      setSelectedFile1();
      setSelected(false);
      setConfirm(false);
      setCancel(false);
    }
    if (fileInputState1 !== '' && confirm) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile1);
      reader.onloadend = () => {
        const data = { image: reader.result };
        console.log(1);
        updateProfilePic(data);
        setFileInputState1('');
        setPreviewSource1('');
        setSelectedFile1();
        setSelected(false);
        setConfirm(false);
        setCancel(false);
      };
    }
  }, [
    confirm,
    cancel,
    fileInputState1,
    selectedFile1,
    setSelected,
    updateProfilePic,
    setCancel,
    setConfirm,
  ]);

  const handleFileInputChange1 = (e) => {
    setSelected(true);
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
            : `https://res.cloudinary.com/tweetco/image/upload/w_${width}/${avatar}`
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

Avatar.propTypes = {
  avatar: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  open: PropTypes.bool,
  confirm: PropTypes.bool.isRequired,
  cancel: PropTypes.bool.isRequired,
  edit: PropTypes.bool.isRequired,
  setSelected: PropTypes.func,
  updateProfilePic: PropTypes.func.isRequired,
};

export default connect(null, { updateProfilePic })(Avatar);
