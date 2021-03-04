import React, { useState } from 'react';
import SideBarNav from './SideBarNav';
import UserRooms from './UserRooms';
const DashboardSideBar = ({ user, setProfileOpen, rooms, room, next }) => {
  return (
    <div
      className={` sidebar border-right border-dark ${
        room !== null && window.innerWidth < 800 && !next ? 'd-none' : ''
      }`}
    >
      <SideBarNav
        user={user}
        setProfileOpen={setProfileOpen}
        room={room}
        next={next}
      />
      <UserRooms rooms={rooms} />
    </div>
  );
};

export default DashboardSideBar;
