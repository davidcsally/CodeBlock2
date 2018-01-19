import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

/** Check login credentials, on success log user in */
const handleCredentials = sendPartialInfo =>
  () => {
    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    axios.post('/login', { name, password })
      .then((res) => {
        if (res.data !== null) {
          const username = res.data.name;
          sendPartialInfo(username, 'game');
        }
      })
      .catch(err => console.log('Invalid Login', err));
  };

/** Add new user to database on success, then log newly created user in */
const handleRegister = sendPartialInfo =>
  () => {
    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    axios.post('/create', { name, password })
      // log in after registration
      .then((response) => {
        if (response.data !== null) handleCredentials(sendPartialInfo)();
        else console.log('Please type a username and password');
      })
      .catch(err => console.log('Invalid Signup', err));
  };

/** Button handler for pressing enter on <form> */
const onEnterPress = sendPartialInfo =>
  (e) => {
    e.preventDefault();
    if (e.key === 'Enter') handleRegister(sendPartialInfo)();
  };

// used in App.js
const Register = ({ onClick, sendPartialInfo }) => {
  const handleReg = handleRegister(sendPartialInfo);
  const onPress = onEnterPress(sendPartialInfo);

  return (
    <div className="register">
      <div id="header">
        <h1>typeof</h1>
      </div>
      <div className="register-box">
        <h5> Register </h5>
        <form onKeyUp={onPress}>
          <input
            placeholder="username"
            type="text"
            id="username"
          />
          <input
            placeholder="password"
            type="password"
            id="password"
          />
        </form>
        <button onClick={handleReg} className="btn-primary btn-lg large-btn" > Register </button>
        <div className="login-text-container">
          <p>Have an account?</p>
          <button className="small-btn" onClick={onClick} >Sign In</button>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  onClick: PropTypes.func.isRequired,
  sendPartialInfo: PropTypes.func.isRequired,
};

export default Register;
