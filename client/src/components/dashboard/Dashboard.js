import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../layout/Loading';
import DashboardSideBar from './DashboardSideBar';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ isAuthenticated, user, loading }) => {
  if (!isAuthenticated && !loading) {
    return <Redirect to='/account' />;
  }
  return (
    <Fragment>
      {user === null ? (
        <Loading />
      ) : (
        <div>
          <div className='dashboard bg-main d-flex'>
            <DashboardSideBar user={user} />
            <div className='chat-desktop'>1</div>
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
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(Dashboard);
