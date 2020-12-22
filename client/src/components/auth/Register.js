import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alerts';
import Alert from '../layout/Alert';
import PropTypes from 'prop-types';

const Register = ({ register, setAlert, sent }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    username: '',
  });

  const [hidden, setHidden] = useState(true);
  const [hidden2, setHidden2] = useState(true);
  //const [verify, setVerify] = useState(false);

  const { username, password, password2, email } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      register(formData);
    } else {
      setAlert('Passwords do not match');
    }
    window.scrollTo(0, 0);
  };
  return (
    <div className='card-body '>
      <Alert />
      {!sent ? (
        <form onSubmit={(e) => onSubmit(e)}>
          <label htmlFor='username'>Username</label>
          <div className='form-inline  mb-4'>
            <input
              type='text'
              className='form-control rounded-0 account-input w-100 '
              id='username'
              placeholder='Username...'
              required
              value={username}
              onChange={(e) => onChange(e)}
            />
          </div>{' '}
          <label htmlFor='email'>Email</label>
          <div className='form-inline  mb-4'>
            <input
              type='email'
              className='form-control rounded-0 account-input w-100 '
              id='email'
              aria-describedby='emailHelp'
              placeholder='Enter an Email...'
              required
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <label htmlFor='password'>Password</label>
          <div className='form-inline mb-4 '>
            <div className='input-group account-input w-100 '>
              <input
                type={hidden ? 'password' : 'text'}
                className='form-control rounded-0'
                id='password'
                placeholder='Enter a password...'
                required
                value={password}
                onChange={(e) => onChange(e)}
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
            <div className='input-group account-input w-100 '>
              <input
                type={hidden2 ? 'password' : 'text'}
                className='form-control rounded-0'
                id='password2'
                placeholder='Enter a password...'
                required
                value={password2}
                onChange={(e) => onChange(e)}
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
              Register
            </button>
          </div>
        </form>
      ) : (
        <div className='' style={{ height: '15rem' }}>
          <h4 className='text-center'>
            A verification email <i className='fas fa-envelope text-main'></i>{' '}
            was sent to your email address
          </h4>
          <h5 className='text-center mt-3'>Please check your inbox</h5>
        </div>
      )}
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  sent: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  sent: state.auth.sent,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
