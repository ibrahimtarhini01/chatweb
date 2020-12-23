import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetPassword } from '../../actions/auth';
import { setAlert } from '../../actions/alerts';
import Alert from '../layout/Alert';
import { Link } from 'react-router-dom';

const ResetPassword = ({ match, resetPassword, reset }) => {
  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (password === password2) {
      resetPassword(match.params.token, password);
    } else {
      setAlert("Passwords don't match", 'danger');
    }
  };

  return (
    <div className='container px-0 px-sm-3 mt-5'>
      <div className='card text-white mb-3 bg-main rounded-0 account'>
        <div className='card-header bg-main mb-4 rounded-0'>
          <h2 className='mb-0'>Reset Password:</h2>
        </div>
        <div className='card-body' style={{ height: '20rem' }}>
          <Alert />
          {!reset ? (
            <form onSubmit={(e) => onSubmit(e)}>
              <label htmlFor='password'>Password</label>
              <div className='form-inline mb-4 '>
                <div className='input-group w-100 account-input'>
                  <input
                    type={hidden ? 'password' : 'text'}
                    className='form-control rounded-0'
                    id='password'
                    placeholder='Enter a password...'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength='8'
                  />{' '}
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text border-left-0 cursor-pointer'
                      id='inputGroupFileAddon01'
                      onClick={() => setHidden(!hidden)}
                    >
                      {!hidden ? (
                        <i className='far fa-eye-slash'></i>
                      ) : (
                        <i className='far fa-eye'></i>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <label htmlFor='password'>Confirm Password</label>
              <div className='form-inline mb-4 '>
                <div className='input-group w-100 account-input'>
                  <input
                    type={hidden2 ? 'password' : 'text'}
                    className='form-control rounded-0'
                    id='password2'
                    placeholder='Enter a password...'
                    required
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                  />{' '}
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text border-left-0 cursor-pointer'
                      id='inputGroupFileAddon01'
                      onClick={() => setHidden2(!hidden2)}
                    >
                      {!hidden2 ? (
                        <i className='far fa-eye-slash'></i>
                      ) : (
                        <i className='far fa-eye'></i>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className='d-flex align-items-center my-4 '>
                <button
                  type='submit'
                  className='btn bg-selected border-0 account-btn btn-block
                  btn-dark rounded-0 ml-auto'
                >
                  Reset
                </button>
              </div>
            </form>
          ) : (
            <div className='text-center'>
              <h4>Your Password has been reset successfully</h4>
              <Link to='/account'>Log In</Link>
            </div>
          )}
        </div>{' '}
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  reset: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  reset: state.auth.reset,
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
