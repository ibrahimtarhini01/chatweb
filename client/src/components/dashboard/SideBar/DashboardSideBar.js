import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../layout/Avatar';
import SideBarNav from './SideBarNav';
import UserRooms from './UserRooms';
const DashboardSideBar = ({ user, setProfileOpen, rooms, room }) => {
  return (
    <div
      className={` sidebar border-right border-dark ${
        room !== null && window.innerWidth < 800 ? 'd-none' : ''
      }`}
    >
      <SideBarNav user={user} setProfileOpen={setProfileOpen} />
      <UserRooms rooms={rooms} />
    </div>
  );
};

export default DashboardSideBar;
