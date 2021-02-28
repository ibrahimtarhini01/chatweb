import React from 'react';

const Modal = ({ width, Component, id }) => {
  return (
    <div
      className='modal fade rounded-0'
      id={id}
      data-backdrop='static'
      data-keyboard='false'
      aria-labelledby='staticBackdropLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog rounded-0 modal-dialog-centered'>
        <Component />
      </div>
    </div>
  );
};

export default Modal;
