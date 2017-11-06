import React, { Component } from 'react';
import PeopleList from './PeopleList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleAddMessage = this.handleAddMessage.bind(this);

    this.state = {
      username: '',
      messages: []
    };
  }

  handleAddMessage(newMsg) {
    this.setState(prevState => {
      return {
        messages: [...prevState.messages, newMsg]
      };
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
