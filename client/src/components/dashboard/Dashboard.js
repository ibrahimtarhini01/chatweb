import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../layout/Loading';
import DashboardSideBar from './SideBar/DashboardSideBar';
import UserProfile from './Profile/UserProfile';
import { Redirect } from 'react-router-dom';
import ChatRoom from './Chat/ChatRoom';

const Dashboard = ({
  isAuthenticated,
  user,
  loading,
  userRoomsLoading,
  userRooms,
  room,
  next,
}) => {
  const [profileOpen, setProfileOpen] = useState(null);

  if (!isAuthenticated && !loading) {
    return <Redirect to='/account' />;
  }
  return (
    <Fragment>
      {userRoomsLoading ? (
        <Loading />
      ) : (
        <div>
          <div className='dashboard bg-main d-flex position-relative'>
            <UserProfile
              open={profileOpen}
              setProfileOpen={setProfileOpen}
              user={user}
            />
            <DashboardSideBar
              user={user}
              setProfileOpen={setProfileOpen}
              rooms={userRooms}
              room={room}
              next={next}
            />

            <ChatRoom user={user} room={room} next={next} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  userRoomsLoading: PropTypes.bool.isRequired,
  userRooms: PropTypes.array,
  room: PropTypes.object,
  next: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  loading: state.auth.loading,
  userRooms: state.room.userRooms,
  userRoomsLoading: state.room.userRoomsLoading,
  room: state.room.room,
  next: state.room.next,
});

export default connect(mapStateToProps, {})(Dashboard);
