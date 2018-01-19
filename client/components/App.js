import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';
import CodeBlock from './CodeBlock';
import Gameover from './Gameover';

const ViewEnum = {
  login: 'login',
  register: 'register',
  game: 'game',
  gameover: 'gameover',
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      view: ViewEnum.login,
    };
    this.changeGame = this.changeGame.bind(this);
    this.sendPartialInfo = this.sendPartialInfo.bind(this);
  }

  // Change View from Login to Game (only sets this.state.checkMe to true)
  changeGame(event) {
    this.setState({ checkMe: !this.state.checkMe });
  }
  // Supposed to retain username from the Login.js
  sendPartialInfo(username, view) {
    this.setState({ username, view });
  }

  refreshView = (string) => {
    return () => { this.setState({ view: string }) };
  }

  generateView = () => {
    const { view } = this.state;
    const { login, register, game, gameover } = ViewEnum
    switch (view) {
      case login: {
        return <Login buttonClick={this.refreshView('register')} getBack={this.sendPartialInfo} />
        break;
      }
      case register: {
        return <Register buttonClick={this.refreshView('login')} getBack={this.sendPartialInfo} />
        break;
      }
      case game: {
        return <CodeBlock user={this.state.username} refreshView={this.refreshView('gameover')} />
        break;
      }
      case gameover: {
        return <Gameover refreshView={this.refreshView('game')} />
        break;
      }
      default: {
        return <p>ERROR ???</p>
      }
    };
  }

  render() {
    return (
      <div className="App">
        {this.generateView()}
      </div>
    );
  };
};

export default App;
