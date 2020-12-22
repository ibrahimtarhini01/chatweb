import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar sticky-top  navbar-expand-lg bg-black  '>
      <div className='container-lg'>
        <NavLink className='navbar-brand text-white pt-2 text-center  ' to='/'>
          <img src='chathub-brand.jpg' alt='brand' className='w-75 ' />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
