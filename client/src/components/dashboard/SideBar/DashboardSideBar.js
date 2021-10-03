import React, { useState } from 'react';
import SideBarNav from './SideBarNav';
import UserRooms from './UserRooms';
const DashboardSideBar = ({
  user,
  setProfileOpen,
  rooms,
  room,
  next,
  roomPreview,
  setUserProfile,
}) => {
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
        roomPreview={roomPreview}
        setUserProfile={setUserProfile}
      />
      <UserRooms rooms={rooms} />
    </div>
  );
};

export default DashboardSideBar;
