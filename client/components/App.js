import React, { Component } from 'react';
import Login from './Login.js';
import Register from './Register';
import Views from './Views';
import CodeBlock from './CodeBlock';
import axios from 'axios';

class App extends Component {


  render() {

    return (
      <div>
        <Views/>
      </div>
    );
  };
};

export default App;
