import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleRegister = this.handleRegister.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(e) {
    this.setState({
      username: e.target.username,
      password: e.target.password
    });
  }

  handleRegister() {
    axios.post('/create', { name: document.getElementById('username').value, password: document.getElementById('password').value })
      .then((response) => {
        console.log(response.status);
        if (response.data !== null) {
          alert('Thank you');
        } else {
          alert('Please type a username and password');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Please try again');
      });
  }

  render() {
    return (
      <div className="register">
        <blockquote>
          <p>Register</p>
        </blockquote>
        <div>
          <label>Username:</label>
          <input type="text" id="username" ref={this.state.password} onSubmit={this.updateUser} />
          <br />
          <label>Password:</label>
          <input type="text" id="password" ref={this.state.password} onSubmit={this.updateUser} />
        </div>
        <text>Or Login</text>
        <button name="login" onClick={this.props.buttonClick}>Log In</button>
        <button name="register" onClick={this.handleRegister}>Register</button>
      </div>
    );
  }
}

export default Register;
