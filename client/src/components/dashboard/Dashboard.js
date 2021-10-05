import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../layout/Loading';
import DashboardSideBar from './SideBar/DashboardSideBar';
import UserProfile from './Profile/UserProfile';
import RoomProfile from './Profile/RoomProfile';
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
  roomPreview,
}) => {
  const [profileOpen, setProfileOpen] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  if (!isAuthenticated && !loading) {
    return <Redirect to='/account' />;
  }
  return (
    <Fragment>
      {userRoomsLoading || loading ? (
        <Loading />
      ) : (
        <div>
          <div className='dashboard bg-main d-flex position-relative'>
            {userProfile === true && (
              <UserProfile
                open={profileOpen}
                setProfileOpen={setProfileOpen}
                user={user}
              />
            )}

            {userProfile === false && (
              <RoomProfile
                open={profileOpen}
                setProfileOpen={setProfileOpen}
                user={user}
                room={room}
              />
            )}

            <DashboardSideBar
              roomPreview={roomPreview}
              user={user}
              setProfileOpen={setProfileOpen}
              setUserProfile={setUserProfile}
              rooms={userRooms}
              room={room}
              next={next}
            />

            <ChatRoom
              user={user}
              room={room}
              next={next}
              setProfileOpen={setProfileOpen}
              setUserProfile={setUserProfile}
              profileOpen={profileOpen}
            />
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
  roomPreview: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  loading: state.auth.loading,
  userRooms: state.room.userRooms,
  userRoomsLoading: state.room.userRoomsLoading,
  room: state.room.room,
  next: state.room.next,
  roomPreview: state.room.roomPreview,
});

export default connect(mapStateToProps, {})(Dashboard);
