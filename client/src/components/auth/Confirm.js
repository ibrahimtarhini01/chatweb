import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmUser } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';

const Confirm = ({ match, confirmUser, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/' />;
  } else {
    confirmUser(match.params.token);
  }
  return (
    <div className='container px-0 px-sm-3 mt-5'>
      <div className='card text-white mb-3 bg-main rounded-0 account'>
        {/**Header */}
        <div className='card-header '>
          <h2>Confirmed</h2>
        </div>
        <div className='card-body text-center p-5'>
          <h2> Confirmation Completed</h2>
          <div>
            now you can go and <Link to='/account'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
Confirm.propTypes = {
  confirmUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { confirmUser })(Confirm);
