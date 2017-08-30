import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import CodeBlock from './CodeBlock';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      view: false,
      checkMe: false
    };
    this.changeView = this.changeView.bind(this);
    this.changeGame = this.changeGame.bind(this);
    this.sendPartialInfo = this.sendPartialInfo.bind(this);
  }

  // Changes Views between Login and Register (only sets this.state.view to true)
  changeView(event) {
    this.setState({ view: !this.state.view });
  }
  // Change View from Login to Game (only sets this.state.checkMe to true)
  changeGame(event) {
    this.setState({ checkMe: !this.state.checkMe });
  }
  // Supposed to retain username from the Login.js
  sendPartialInfo(username, check){
    this.setState({ username, checkMe: check.checkMe });
  }

  render() {
    let needsToRender;
    // Handles the logic for pages toggled
    if (!this.state.view) {
      needsToRender = <Login buttonClick={this.changeView.bind(this)} loginTrue={this.changeGame.bind(this)} getBack={this.sendPartialInfo.bind(this)} /> // Passing these methods down to the child
    } else {
      needsToRender = <Register buttonClick={this.changeView.bind(this)} />;
    }

    if(this.state.checkMe) {
      needsToRender = <CodeBlock user={this.state.username} />
    }

    // The app's view
    return (
      <div className="App">
        {/* <CodeBlock user="david" /> */}
        {needsToRender}
      </div>
    );
  };
};

export default App;
