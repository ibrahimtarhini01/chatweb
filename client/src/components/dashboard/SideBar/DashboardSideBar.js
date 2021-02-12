import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../layout/Avatar';
import SideBarNav from './SideBarNav';
import UserRooms from './UserRooms';
const DashboardSideBar = ({ user, setProfileOpen }) => {
  return (
    <div className=' sidebar border-right border-dark'>
      <SideBarNav user={user} setProfileOpen={setProfileOpen} />
      <UserRooms />
    </div>
  );
};

export default DashboardSideBar;
