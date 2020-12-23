import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetLink } from '../../actions/auth';
import Alert from '../layout/Alert';

const Reset = ({ resetLink }) => {
  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    resetLink({ email });
  };

  return (
    <div className='container px-0 px-sm-3 mt-5'>
      <div className='card text-white mb-3 bg-main rounded-0 account'>
        <div className='card-header bg-main mb-4 rounded-0'>
          <h2 className='mb-0'>Reset Email:</h2>
        </div>
        <div className='card-body' style={{ height: '20rem' }}>
          <Alert />
          <form onSubmit={(e) => onSubmit(e)}>
            <label htmlFor='email'>Email: </label>
            <div className='form-inline  mb-4'>
              <input
                type='email'
                className='form-control rounded-0 account-input w-100'
                id='email'
                aria-describedby='emailHelp'
                placeholder='Enter your Email...'
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className='d-flex align-items-center mb-4'>
              <button
                type='submit'
                className='btn bg-selected border-0 account-btn btn-block
                  btn-dark rounded-0 ml-auto'
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>{' '}
    </div>
  );
};

Reset.propTypes = {
  resetLink: PropTypes.func.isRequired,
};

export default connect(null, { resetLink })(Reset);
