import React, { Component } from 'react';
import io from 'socket.io-client';
import SetNameForm from './SetNameForm';
import PeopleList from './PeopleList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleAddMessage = this.handleAddMessage.bind(this);
    this.handleSetUsername = this.handleSetUsername.bind(this);

    this.state = {
      socket: io(),
      username: '',
      userList: [],
      messages: []
    };
  }

  componentDidMount() {
    //this.state.socket.on('uid', console.log);
    //this.state.socket.on('enterUser', console.log);
    this.state.socket.on('updateUserList', (userList) => {
      this.setState(() => ({
        userList
      }));
    });
    this.state.socket.on('newMessage', (m) => {
      this.setState((prevState) => ({
        messages: [...prevState.messages, m]
      }));
    });
  }

  handleAddMessage(newMsg) {
    this.state.socket.emit('createMessage', {
      from: this.state.username,
      text: newMsg
    });
  }

  handleSetUsername(username) {
    this.setState(() => ({ username }));
    this.state.socket.emit('enter', { username });
  }

  render() {
    let renderEl = (
      <SetNameForm
        { ...this.props }
        handleSetUsername={this.handleSetUsername}
      />
    );
    if (this.state.username) {
      renderEl = (
        <div className="chat">
          <PeopleList userList={this.state.userList} />

          <div className="chat__main">
            <MessageList messages={this.state.messages} />
            <MessageForm handleAddMessage={this.handleAddMessage} />
          </div>
        </div>
      );
    }
    return (
      renderEl
    );
  }
}

export default App;
