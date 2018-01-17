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
      this.handleCredentials();
    }
  }

  render() {
    return (
      // Always set to HTML Logic
      <div className="login">
        <div className="header"><h1>typeof</h1></div>

        <div className="login-box">
          <h5> Log In </h5>

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
          <button onClick={this.handleCredentials} className="btn-primary btn-lg " > Log In </button>
          <p>Don't have an account? <a onClick={() => { this.props.buttonClick('register'); }} ><span className="link">Sign Up</span></a></p>
        </div>
      </div>
    );
  }
}

export default Login;
