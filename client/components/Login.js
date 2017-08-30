import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      checkMe: false,
    };
    this.handleCredentials = this.handleCredentials.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(e) {
    console.log();
    this.setState({
      username: e.target.username,
      password: e.target.password,
    });
  }

  handleCredentials() {
    axios.post('/login', { name: document.getElementById('username').value, password: document.getElementById('password').value })
    .then((response) => {
      if (response.data !== null) {
            // console.log(response)
        let username = document.getElementById('username').value;
        this.props.getBack(username, { checkMe: !this.state.checkMe });
        // This is supposed to change views to CodeBlock.js
      } else {
        alert('Log in or register');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const checkMe = this.state.checkMe;
    return (
      // Always set to HTML Logic
      <div className="Login">
        <blockquote>
          <p>Log-In</p>
        </blockquote>
        <div>
          <label>Username:</label>
          <input type="text" id="username" ref={this.state.username} onSubmit={this.updateUser} />
          <br />
          <label >Password:</label>
          <input type="password" id="password" ref={this.state.password} onSubmit={this.updateUser} />
        </div>
        <button name="login" onClick={this.handleCredentials} >Log In</button>
        <button name="register" onClick={this.props.buttonClick}>Register</button>
      </div>
    );
  }
}

export default Login;
