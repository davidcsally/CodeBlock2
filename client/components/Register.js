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

  onEnterPress(e) {
    e.preventDefault();
    if (e.key === 'Enter') {
      this.handleRegister();
    }
  }

  render() {
    return (
      <div className="register">
        <h1> REGISTER </h1>
        <div className="register-box">

        <form onKeyUp={(event) => { this.onEnterPress(event); }}>
          <input placeholder="username" type="text" id="username" ref={this.state.password} onSubmit={this.updateUser} />
          <input placeholder="password" type="password" id="password" ref={this.state.password} onSubmit={this.updateUser} />
        </form>
          <a onClick={() => {this.props.buttonClick('login'); }} ><p>Have an account? Log in</p></a>
        </div>

      </div>
    );
  }
}

export default Register;
