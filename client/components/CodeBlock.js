import React, { Component } from 'react';
import ErrorCount from './ErrorCount';
// import Timer from './Timer';

const codeProblems = [["You ain't ready"], ["for (let i = 0; i < array.length; i++)"],['s = s.match(/\S+/g);'], ['var repl = str.replace(/^\s+|\s+$|\s+(?=\s)/g, " ")']];

let i = 0;

class CodeBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      code: ["Prepare Yourself"],
      textbox: [""],
      errors : 0,
      time: {},
      seconds: 20
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  handleError = () => {
    let newError = this.state.errors;
    newError++;
    this.setState({errors: newError});
  };

  handleChange = (event) => {
    let typedCode = this.state.code;
    let userInput = this.refs.userinput.value;
    let newTextbox = this.state.textbox;
    if (typedCode[0].length == 1) {
      this.refs.userinput.value="";
      this.startTimer();
      this.setState({code: codeProblems[i], textbox: [""], errors: 0}, () => {i++});
    } else if (userInput == typedCode[0].charAt()) {
      let correct = typedCode[0].substring(1);
      typedCode.shift();
      typedCode.push(correct);
      newTextbox.push(userInput);
      this.refs.userinput.value = "";
      this.setState({code: typedCode, textbox: newTextbox});
    } else {
      alert("YOU WRONG!!!");
      this.refs.userinput.value="";
      this.handleError();
    };
  };

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      alert("LOSER!!!");
      clearInterval(this.timer);
    }
  }

  render() {
    return (
      <div>
          <p><span id="correct">{this.state.textbox}</span>{this.state.code}</p>
          <label id="input">
            User Input:
            <input type="text" onChange={this.handleChange} onKeyDown={this.startTimer} ref="userinput"/>
          </label>
          <div id="clock">
            {this.state.time.m}:{this.state.time.s}
          </div>
          <div id="errorbox">
        <ErrorCount errors={this.state.errors}/>
          </div>
      </div>
    )
  };
}

export default CodeBlock;
