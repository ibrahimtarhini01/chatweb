import React, { Fragment, useState } from 'react';

const AddRoom = () => {
  const [hidden, setHidden] = useState(true);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    password: '',
    description: '',
  });

  const { title, password, description } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    console.log(formData);
  };

  return (
    <div className='modal-content border-0'>
      <div className='modal-header bg-main border-0 '>
        <h4 className='modal-title ' id='staticBackdropLabel'>
          Create a Server
        </h4>
        <button
          type='button'
          className='close'
          data-dismiss='modal'
          aria-label='Close'
        >
          <span className='text-white' aria-hidden='true'>
            &times;
          </span>
        </button>
      </div>
      <div className='modal-body text-center border-0  bg-main'>
        <h6 className='text-muted mb-4'>
          Your Server is where you and your friends hangout. Make yours and
          start talking
        </h6>
        <form className='text-left'>
          <label htmlFor='title'>
            Title <span className='text-muted'>(required)</span>
          </label>
          <div className='form-inline  mb-4'>
            <input
              type='text'
              className='form-control   w-100'
              id='title'
              aria-describedby='emailHelp'
              placeholder='Enter a Title...'
              required
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class='form-group'>
            <label for='description'>
              Description <span className='text-muted'>(required)</span>
            </label>
            <textarea
              class='form-control'
              id='description'
              rows='3'
              placeholder='Add a description...'
              required
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <div class='form-check form-check-inlinemy-2'>
            <input
              class='form-check-input'
              type='checkbox'
              id='defaultCheck1'
              value={show}
              checked={show}
              onClick={() => setShow(!show)}
            />
            <label class='form-check-label' for='defaultCheck1'>
              Private
            </label>
          </div>
          {show && (
            <Fragment>
              <label htmlFor='password'>Password</label>
              <div className='form-inline mb-4'>
                <div className='input-group w-100 '>
                  <input
                    type={hidden ? 'password' : 'text'}
                    className='form-control '
                    id='password'
                    placeholder='Enter a password...'
                    value={password}
                    onChange={(e) => onChange(e)}
                  />{' '}
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text border-left-0 cursor-pointer rounded-right'
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
            </Fragment>
          )}
        </form>
      </div>
      <div className='modal-footer bg-main border-0 '>
        <button
          type='Submit'
          className='btn   border-0 account-btn btn-block
          btn-primary ml-auto '
          data-dismiss='modal'
          aria-label='Close'
          onClick={(e) => onSubmit(e)}
        >
          Create Server
        </button>
      </div>
    </div>
  );
};

export default AddRoom;
