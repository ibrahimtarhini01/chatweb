import React, { useState } from 'react';
import Alert from '../layout/Alert';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const SignIn = ({ login }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [hidden, setHidden] = useState(true);

  const { username, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    login(username, password);
    //setFormData({ username: '', password: '' });
    console.log(formData);
  };

  return (
    <div className='card-body '>
      <Alert />
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor='username'>Username</label>
        <div className='form-inline  mb-4'>
          <input
            type='text'
            className='form-control rounded-0 account-input w-100'
            id='username'
            aria-describedby='emailHelp'
            placeholder='Enter a Username...'
            required
            value={username}
            onChange={(e) => onChange(e)}
          />
        </div>

        <label htmlFor='password'>Password</label>
        <div className='form-inline mb-4'>
          <div className='input-group w-100 account-input'>
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

        <div className=''>
          <Link className='text-muted' to='/reset'>
            forgot Password?
          </Link>
        </div>

        <div className='d-flex align-items-center mb-4'>
          <button
            type='submit'
            className='btn bg-selected border-0 account-btn btn-block
             btn-dark rounded-0 ml-auto'
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(SignIn);
