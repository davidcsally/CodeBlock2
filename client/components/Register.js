import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister() {
    axios.post('/create', { name: document.getElementById('username').value, password: document.getElementById('password').value })
      .then((response) => {
        console.log(response.status);
        if (response.data !== null) {

          // log in after registration
          this.handleCredentials();

        } else {
          alert('Please type a username and password');
        }
      })
      .catch((err) => {
        console.log(err);
        alert('Please try again');
      });
  }

  handleCredentials() {
    axios.post('/login', { name: document.getElementById('username').value, password: document.getElementById('password').value })
    .then((response) => {
      if (response.data !== null) {
        const username = response.data.name;
        console.log('logging in...');
        this.props.getBack(username, 'game');
      }
    })
    .catch((err) => {
      console.log(err);
      alert('Invalid Login!');
    });
  }

  onEnterPress(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      this.handleRegister();
    }
  }

  render() {
    return (
      <div className="register">
        <div id="header"><h1>typeof</h1></div>

        <div className="register-box">
          <h5> Register </h5>

          <form onKeyUp={(event) => { this.onEnterPress(event); }}>
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
          <button onClick={this.handleRegister} className="btn-primary btn-lg " > Register </button>
          <p>Have an account? <a onClick={this.props.buttonClick} ><span className="link">Sign In</span></a></p>
        </div>
      </div>
    );
  }
}

export default Register;
