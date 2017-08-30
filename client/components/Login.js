import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.handleCredentials = this.handleCredentials.bind(this);
  }

  handleCredentials() {
    axios.post('/login', { name: document.getElementById('username').value, password: document.getElementById('password').value })
    .then((response) => {
      if (response.data !== null) {
        const username = response.data.name;
        this.props.getBack(username, 'game');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  onEnterPress(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      this.handleCredentials();
    }
  }

  render() {
    return (
      // Always set to HTML Logic
      <div className="login">
        <h1> LOG IN </h1>
        <div className="login-box">
          <form onKeyUp={(event) => { this.onEnterPress(event); }}>
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

          <a onClick={() => {this.props.buttonClick('register'); }} ><p>Don't have an account? Sign up</p></a>          
        </div>
      </div>
    );
  }
}

export default Login;
