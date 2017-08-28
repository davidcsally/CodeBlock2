import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import CodeBlock from './CodeBlock';

class Views extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ['Cliff', 'Jason', 'Mila'],
      active : 'Login',
      isLoggedIn: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let active = this.state.active;
    let switchActive = active === 'Login' ? 'Register' : 'Login';
    this.setState({
      active: switchActive
    });
  }

  handleChange(value) {
    let users = this.state.username;

    for (let i = 0; i < users.length; i++) {
      if (users[i] === value) {
        this.setState({isLoggedIn: true});
      }
    }
  }

  render() {
    let active = this.state.active;
    let testPage = this.state.isLoggedIn;
    return (
      <div>
        {active === 'Login' ? (
          <Login code={this.handleChange}/>
        ) : testPage === true ? (
          <CodeBlock />
        ) : active === 'Register' ? (
          <Register />
        ) : null}
        <button type="button" onClick={this.handleClick}>
         Login/Register
        </button>
      </div>
    );
  }
}

export default Views;
