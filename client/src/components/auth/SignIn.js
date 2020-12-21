import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const SignIn = ({ login, user }) => {
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

    //setFormData({ username: '', password: '' });
    console.log(formData);
  };

  return (
    <div className='card-body '>
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

        <div className='d-flex align-items-center mb-4'>
          <div className='form-inline flex-grow-1 text-muted mr-3 '>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                id='gridCheck'
              />
              <label className='form-check-label' htmlFor='gridCheck'>
                Remember me
              </label>
            </div>
          </div>
          <div className=''>
            <div className='text-muted' to='/account/reset'>
              forgot Password?
            </div>
          </div>
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

export default SignIn;
