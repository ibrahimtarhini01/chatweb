import React, { useState } from 'react';

import SignIn from './SignIn';

import Register from './Register';

const Account = () => {
  const [login, setLogin] = useState(true);
  return (
    <div>
      <div className='card text-white mb-3 bg-main rounded-0 account'>
        {/**Header */}
        <div className='card-header d-flex flex-row p-0 mb-4 cursor-pointer'>
          <div
            className={`w-50 text-center p-3 ${login ? 'bg-selected' : ''}`}
            onClick={() => setLogin(true)}
          >
            <h5 className='m-0'> Login</h5>
          </div>
          <div
            className={`w-50 text-center p-3 ${!login ? 'bg-selected' : ''}`}
            onClick={() => setLogin(false)}
          >
            <h5 className='m-0'> Register</h5>
          </div>
        </div>
        {login ? <SignIn /> : <Register />}
      </div>
    </div>
  );
};

export default Account;
