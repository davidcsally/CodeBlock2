import React, { Component } from 'react';
import ErrorCount from './ErrorCount';
import Score from './Score';
import Accuracy from './Accuracy'
import Timer from './Timer'
import axios from 'axios'

let i = 0;
const NUM_SECONDS = 5;
const codeProblems = [["You ain't ready"],
                      ["for (let i = 0; i < array.length; i++)"],
                      ['s = s.match(/\S+/g);'],
                      ['var repl = str.replace(/^\s+|\s+$|\s+(?=\s)/g, " ")']];

class CodeBlock extends Component {
  constructor() {
    super();
    this.state = {
      code: ["Prepare Yourself"],
      textbox: [""],
      errors: 0,
      seconds: NUM_SECONDS,
      score: 0,
      accuracy: 0,
      length: 0,
    };
    this.timer = 0;
    this.countDown = this.countDown.bind(this);
  }

  handleError = () => {
    this.setState({ errors: this.state.errors + 1 });
  };
  
  handleChange = (event) => {
    let typedCode = this.state.code; //Prepare loser yourself
    let userInput = this.refs.userinput.value;
    let newTextbox = this.state.textbox;

    if (typedCode[0].length == 1) {
      this.refs.userinput.value = "";
      this.setState({ code: codeProblems[i], textbox: [""] }, () => {
        i++

        //if the player reaches the end..
        if (i === codeProblems.length+1) {
          alert("Good Job");

          //update data in server (axios patch request)
          axios.patch('http://localhost:3000/updateUser', { name: this.props.user, score: this.state.score, accuracy: this.state.accuracy, WPM: 0 })
          console.log('updated database')
          
          // reset game
          this.setState({
            code: ["Prepare Yourself"],
            textbox: [""],
            errors: 0,
            seconds: 20,
            score: 0,
            accuracy: 0,
            length: 0,
          })
        }
      });
      this.setState({ seconds: 20 })
    } else if (userInput == typedCode[0].charAt()) {
      let correct = typedCode[0].substring(1);
      typedCode.shift();
      typedCode.push(correct);
      newTextbox.push(userInput);
      this.refs.userinput.value = "";
      this.setState({
        code: typedCode,
        textbox: newTextbox,
        score: this.state.score + 10,
        length: this.state.length + 1,
        accuracy: 100 - Math.round((this.state.errors / this.state.length) * 100),
      });
    } else {
      this.refs.userinput.value = "";
      this.handleError();
    };
  };

  /** Start the countdown timer */
  startTimer = () => {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  /** POST highscores to database */
  postHighscore = () => {
    const newData = {
      name: this.props.user,
      score: this.state.score,
      accuracy: this.state.accuracy,
      WPM: 0,
    }

    // POST new score
    axios.patch('http://localhost:3000/updateUser', newData);
  }

  /** function to countdown the timer, this will update the state every second */
  countDown() {
    // Remove one second, set state so a re-render happens.
    const seconds = this.state.seconds - 1;
    this.setState({ seconds: seconds });

    // Check if we're at zero.
    if (seconds === -1) {
      clearInterval(this.timer);
      alert("Game over.. Game is resetting..GO!");

      this.postHighscore();
      
      // clear timer
      this.timer = 0;

      // reset game      
      this.setState({
        code: ["Prepare Yourself"],
        textbox: [""],
        errors: 0,
        seconds: 20,
        score: 0,
        accuracy: 0,
        length: 0,
      });
    }
  }

  render() {
    return (
      <div>
        <p><span id="correct">{this.state.textbox}</span>{this.state.code}</p>

        <label id="input">
          User Input:
            <input type="text" onChange={this.handleChange} onKeyDown={this.startTimer} ref="userinput" />
        </label>

        <Timer minutes="0" seconds={this.state.seconds} />
        <Score score={this.state.score} />
        <Accuracy accuracy={this.state.accuracy} />
        <div id="errorbox"> <ErrorCount errors={this.state.errors} /> </div>
      
      </div>
    )
  };
}

export default CodeBlock;
