import React from 'react';

const Loading = () => {
  return (
    <div className='position-relative vh-100'>
      <div className='text-center  w-100 loading '>
        <div className='spinner-grow text-primary ' role='status'></div>
        <div className='spinner-grow text-secondary ' role='status'></div>
        <div className='spinner-grow text-success ' role='status'></div>
        <div className='spinner-grow text-danger ' role='status'></div>
        <div className='spinner-grow text-warning ' role='status'></div>
        <div className='spinner-grow text-info ' role='status'></div>
        <div className='spinner-grow text-light ' role='status'></div>
        <div className='spinner-grow text-dark' role='status'></div>
      </div>
    </div>
  );
};

export default Loading;
