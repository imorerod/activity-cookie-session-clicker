import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    name: '',
    clickCount: 0,
  }

  componentDidMount() {
    this.getCount();
  }

  handleClick = () => {
    axios.post('/add-click')
      .then(() => this.getCount())
      .catch(error => {
        console.log('error making add click post', error);
      });
  }

  handleUser = () => {
    axios.post('/current-user')
      .then(() => this.getUser())
      .catch(error => {
        console.log('error making user post', error);
      });
  }

  getCount = () => {
    axios.get('/get-clicks')
      .then(response => {
        this.setState({
          clickCount: response.data.totalClicks,
        });
      })
      .catch(error => {
        console.log('error making add click post', error);
      });
  }

  getUser = () => {
    axios.get('/get-user')
      .then(response => {
        this.setState({
          name: response.data.user,
        });
      })
      .catch(error => {
        console.log('error getting user', error);
      });
  }

  editUsername = () => {
    this.setState({
      usernameIsEditable: true,
    });
  }

  saveUsername = () => {
    this.setState({
      usernameIsEditable: false,
    });
  }

  handleNameChange = event => {
    this.setState({
        name: event.target.value
    });
    console.log(event.target.value);
  }

  render() {
    return (
      <div>
        <center>
          <h1>Click the Cookie!!</h1>
            {/* Username should go here */}
            {/* The next block of code is conditional rendering.
            Look at the documentation https://reactjs.org/docs/conditional-rendering.html
            if this is new to you. */}
            {this.state.usernameIsEditable ?
              <div>
                <p>{this.handleUser}</p>
                <input placeholder="name" onChange={this.handleNameChange}/>
                <button onClick={this.saveUsername}>Save Username</button>
              </div> :
              <div>
                <p>{this.state.name}</p>
              <button onClick={this.editUsername}>Edit Username</button>
              </div>  
            }
          <p>{this.state.clickCount}</p>
          <span
            role="img"
            aria-label="cookie"
            style={{fontSize: '100px', cursor: 'pointer'}}
            onClick={this.handleClick}
          >
            🍪
          </span>
        </center>
      </div>
    );
  }
}

export default App;
