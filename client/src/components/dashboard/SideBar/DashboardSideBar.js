import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../layout/Avatar';
import SideBarNav from './SideBarNav';
const DashboardSideBar = ({ user, setProfileOpen }) => {
  return (
    <div className=' sidebar border-right border-dark'>
      <SideBarNav user={user} setProfileOpen={setProfileOpen} />
    </div>
  );
};

export default DashboardSideBar;
