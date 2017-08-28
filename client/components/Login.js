import React, {Component} from 'react';
import Register from './Register';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: [
        'Cliff', 'Jason', 'Mila'
      ],
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.passer = this.passer.bind(this);
  }

  handleChange(event) {
    setState({username: event.target.username, password: event.target.password});
  }

  // when server is set up we want this to sent a GET request
  handleSubmit(event) {
    let arr = this.state.username;
    let input = this.refs.input.value;

    for (let i = 0; i < arr.length; i++) {
      if (input === arr[i]) {
        alert('Welcome ' + input);
        event.preventDefault();
        return
      }
    }
    alert('Wrong username or password');
  }
  passer(event) {
    this.props.code(this.refs.input.value);
  }

  render() {
    return (
      <div>
        <div id="bander">
          <h2>Login</h2>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                Username:
                <input type="text" ref='input' onSubmit={this.handleSubmit} onChange={this.passer}/>
              </label>
            </div>
            <div>
              <label>
                Password:
                <input type="password" value={this.state.password} onChange={this.handleChange}/>
              </label>
            </div>
          </form>
          <span>Don't have an account?</span>
        </div>
      </div>
    );
  }
}

export default Login;
