import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar sticky-top  navbar-expand-lg bg-black  '>
      <div className='container-lg'>
        <NavLink className='navbar-brand text-white pt-2 text-center  ' to='/'>
          <img
            src='https://pu.edu.lb/sites/default/files/new-upper-logo.png'
            height='72'
            width='72'
            alt='brand'
            className='d-inline-block'
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
