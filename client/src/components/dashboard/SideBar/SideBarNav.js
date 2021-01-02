import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../layout/Avatar';
const SideBarNav = ({ user, setProfileOpen }) => {
  return (
    <div className='sidebar-nav bg-main d-flex justify-content-between align-items-center'>
      <div
        onClick={() => {
          setProfileOpen(true);
        }}
      >
        <Avatar avatar={user.avatar} width='40' />
      </div>
      <div>
        <button className='btn btn-link text-center menu rounded-circle text-muted '>
          <i class='fas fa-user-plus'></i>
        </button>
        <div class='dropdown d-inline '>
          <button
            className='btn btn-link text-center menu rounded-circle text-muted '
            id='dropdownMenuButton'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            <i class='fas fa-ellipsis-v '></i>
          </button>
          <div
            class='dropdown-menu dropdown-menu-right border-0 shadow   bg-main text-white'
            aria-labelledby='dropdownMenuButton'
          >
            <Link class='dropdown-item text-white py-2' to='/'>
              Add Room
            </Link>
            <Link class='dropdown-item text-white  py-2' to='/'>
              Join Room
            </Link>
            <Link class='dropdown-item text-white  py-2' to='/'>
              User Profile
            </Link>
            <Link class='dropdown-item text-white  py-2' to='/'>
              Settings
            </Link>
            <Link class='dropdown-item text-white  py-2' to='/'>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarNav;
