import React from 'react';

const Container = ({ size, Component, match }) => {
  return (
    <div className={size}>
      <Component />
    </div>
  );
};

export default Container;
