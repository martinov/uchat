import React, { Component } from 'react';
import io from 'socket.io-client';
import PeopleList from './PeopleList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleAddMessage = this.handleAddMessage.bind(this);

    this.state = {
      socket: undefined,
      username: '',
      messages: []
    };
  }

  componentDidMount() {
    const socket = io();
    this.setState(() => ({ socket }));
    // socket.on('connect', () => {
    //   console.log('connected');
    // });
    socket.on('newMessage', (m) => {
      //console.log('newMessage', m);
      this.setState((prevState) => ({
        messages: [...prevState.messages, m]
      }));
    });
  }

  handleAddMessage(newMsg) {
    this.state.socket.emit('createMessage', {
      from: this.state.socket.id,
      text: newMsg
    });
  }

  render() {
    return (
      <div className="chat">
        <PeopleList />

        <div className="chat__main">
          <MessageList messages={this.state.messages} />
          <MessageForm handleAddMessage={this.handleAddMessage} />
        </div>
      </div>
    );
  }
}

export default App;
