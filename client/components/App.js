import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import CodeBlock from './CodeBlock';
import Gameover from './Gameover.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      view: 'gameover',
    };
    this.changeView = this.changeView.bind(this);
    this.changeGame = this.changeGame.bind(this);
    this.sendPartialInfo = this.sendPartialInfo.bind(this);
    this.refreshView = this.refreshView.bind(this);
  }

  // Changes Views between Login and Register (only sets this.state.view to true)
  changeView(string) {
    this.setState({ view: string });
    // this.setState({ view: !this.state.view });
  }
  // Change View from Login to Game (only sets this.state.checkMe to true)
  changeGame (event) {
    this.setState({ checkMe: !this.state.checkMe });
  }
  // Supposed to retain username from the Login.js
  sendPartialInfo(username, view) {
    this.setState({ username, view });
  }

  refreshView(string) {
    this.setState({ view: string });
  }

  render() {
    let needsToRender;
    console.log('APP View: ', this.state.view);
    // console.log('checkme: ', this.state.checkMe);
    if (this.state.view === 'login') {
      needsToRender = <Login  buttonClick={this.changeView} loginTrue={this.changeGame} getBack={this.sendPartialInfo} />;
    }

    else if (this.state.view === 'register') {
      needsToRender = <Register refreshView={this.refreshView} buttonClick={this.changeView} />;
    }

    else if (this.state.view === 'game') {
      needsToRender = <CodeBlock user={this.state.username} refreshView={this.refreshView} />;
    }

    else if (this.state.view === 'gameover') {
      needsToRender = <Gameover refreshView={this.refreshView} />;
    }

    else {
      needsToRender = <Login  buttonClick={this.changeView} loginTrue={this.changeGame} getBack={this.sendPartialInfo} />;
    }

    // The app's view
    return (
      <div className="App">
        {needsToRender}
      </div>
    );
  };
};

export default App;
