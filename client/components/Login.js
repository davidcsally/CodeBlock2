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

/** Button handler for pressing enter on <form> */
const onEnterPress = sendPartialInfo =>
  (e) => {
    e.preventDefault();
    if (e.key === 'Enter') handleCredentials(sendPartialInfo)();
  };

// used in App.js
const Login = ({ onClick, sendPartialInfo }) => {
  const handleLogin = handleCredentials(sendPartialInfo);
  const onPress = onEnterPress(sendPartialInfo);

  return (
    <div className="login">
      <div className="header">
        <h1>typeof</h1>
      </div>
      <div className="login-box">
        <h5> Log In </h5>
        <form onKeyUp={onPress}>
          <input
            type="text"
            id="username"
            placeholder="username"
          />
          <input
            placeholder="password"
            type="password"
            id="password"
          />
        </form>
        <button onClick={handleLogin} className="btn-primary btn-lg large-btn" > Log In </button>
        <div className="login-text-container">
          <p>Don{'\''}t have an account?</p>
          <button className="small-btn" onClick={onClick} >Sign Up</button>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onClick: PropTypes.func.isRequired,
  sendPartialInfo: PropTypes.func.isRequired,
};

export default Login;
