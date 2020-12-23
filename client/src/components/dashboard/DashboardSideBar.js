import React, { useState } from 'react';
import Avatar from '../layout/Avatar';
const DashboardSideBar = ({ user }) => {
  return (
    <div className='bg-primary sidebar border-right border-dark'>
      <div className='sidebar-nav bg-main d-flex justify-content-between align-items-center'>
        <Avatar avatar={user.avatar} width='40' />
        <div>
          <button className='btn btn-link text-center menu rounded-circle text-muted '>
            <i class='fas fa-user-plus'></i>
          </button>
          <button className='btn btn-link text-center menu rounded-circle text-muted '>
            <i class='fas fa-ellipsis-v '></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSideBar;
