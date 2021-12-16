import React, { Fragment, useState } from 'react';
import Avatar from '../../layout/Avatar';
import { connect } from 'react-redux';
import { createRoom, clearRoom } from '../../../actions/room';
import PropTypes from 'prop-types';

const AddRoom = ({ user, createRoom, room, next, clearRoom }) => {
  const [hidden, setHidden] = useState(true);
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    password: '',
    description: '',
  });

  //Avatar
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [selected, setSelected] = useState(false);

  const { title, password, description } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmitCreate = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    if (password === '') {
      createRoom({ title, description });
    } else {
      createRoom({ title, description, password });
    }
  };

  return (
    <div className='modal-content border-0'>
      <div className='modal-header bg-main border-0 '>
        <h4 className='modal-title ' id='staticBackdropLabel'>
          Create a Room
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
      {!next ? (
        <div className='modal-body text-center border-0  bg-main'>
          <h6 className='text-muted mb-4'>
            Your Room is where you and your friends hangout. Make yours and
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
            <div className='form-group'>
              <label htmlFor='description'>
                Description <span className='text-muted'>(required)</span>
              </label>
              <textarea
                className='form-control'
                id='description'
                rows='3'
                placeholder='Add a description...'
                required
                value={description}
                onChange={(e) => onChange(e)}
              ></textarea>
            </div>
            <div className='form-check form-check-inlinemy-2'>
              <input
                className='form-check-input'
                type='checkbox'
                id='defaultCheck1'
                value={show}
                checked={show}
                onChange={() => setShow(!show)}
              />
              <label className='form-check-label' htmlFor='defaultCheck1'>
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
      ) : (
        <div className='modal-body  border-0  bg-main'>
          <div className='d-flex justify-content-around w-100 py-4'>
            <div className='profile-avatar text-center'>
              <Avatar
                room_id={room._id}
                avatar={room.avatar}
                width='200'
                edit={true}
                cancel={cancel}
                confirm={confirm}
                setSelected={setSelected}
                setCancel={setCancel}
                setConfirm={setConfirm}
              />
            </div>
          </div>
          {selected && (
            <div className='d-flex justify-content-around'>
              <div
                className='rounded-circle bg-success btn text-white btn-profile '
                onClick={() => {
                  setConfirm(true);
                }}
              >
                <i className='fas fa-check'></i>
              </div>
              <div
                className='rounded-circle bg-danger btn text-white btn-profile '
                onClick={() => {
                  setCancel(true);
                }}
              >
                <i className='fas fa-times'></i>
              </div>
            </div>
          )}
          <label htmlFor='link'>Invitation ID</label>
          <div className='form-inline mb-4 bg-transparent border-primary'>
            <div className='input-group w-100 '>
              <input
                type='text'
                className='form-control bg-transparent border-primary text-white '
                id='link'
                readOnly
                disabled
                value={room._id}
              />{' '}
              <div className='input-group-prepend  bg-transparent '>
                <button
                  className=' border-left-0 cursor-pointer border-primary btn btn-outline-primary text-white rounded-right'
                  id='copy'
                  data-toggle='tooltip'
                  title='Copy to Clipboard'
                  onClick={() => navigator.clipboard.writeText(room._id)}
                >
                  <i className='fas fa-copy'></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='modal-footer bg-main border-0 '>
        {!next ? (
          <button
            type='Submit'
            className='btn   border-0 account-btn btn-block
          btn-primary ml-auto '
            onClick={(e) => onSubmitCreate(e)}
          >
            Create Server
          </button>
        ) : (
          <button
            type='Submit'
            className='btn   border-0 account-btn btn-block
          btn-primary ml-auto '
            onClick={() => clearRoom()}
            data-dismiss='modal'
            aria-label='Close'
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
};

AddRoom.propTypes = {
  createRoom: PropTypes.func.isRequired,
};
export default connect(null, { createRoom, clearRoom })(AddRoom);
