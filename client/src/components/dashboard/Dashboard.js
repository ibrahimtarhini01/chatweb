import React, { Fragment, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../layout/Loading';
import DashboardSideBar from './SideBar/DashboardSideBar';
import UserProfile from './Profile/UserProfile';
import RoomProfile from './Profile/RoomProfile';
import ChatRoom from './Chat/ChatRoom';
import { setLastMessage } from '../../actions/room';

const Dashboard = ({
  isAuthenticated,
  user,
  loading,
  userRoomsLoading,
  userRooms,
  room,
  next,
  roomPreview,
  setLastMessage,
}) => {
  const [profileOpen, setProfileOpen] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const socket = useRef();

  useEffect(() => {
    socket.current = io('https://chattweb.herokuapp.com:8900', {
      withCredentials: true,
      extraHeaders: { 'my-custom-header': 'abcd' },
    });
  }, []);

  if (!isAuthenticated && !loading) {
    return <Redirect to='/account' />;
  }
  return (
    <Fragment>
      {userRoomsLoading || (!isAuthenticated && !loading) || loading ? (
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
              socket={socket}
            />

            <ChatRoom
              user={user}
              room={room}
              next={next}
              setProfileOpen={setProfileOpen}
              setUserProfile={setUserProfile}
              setLastMessage={setLastMessage}
              profileOpen={profileOpen}
              socket={socket}
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
  setLastMessage: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, { setLastMessage })(Dashboard);
