import React, { Component } from 'react';
import io from 'socket.io-client';
import SetNameForm from './SetNameForm';
import ChatList from './ChatList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleAddMessage = this.handleAddMessage.bind(this);
    this.handleSetUsername = this.handleSetUsername.bind(this);

    this.socket = io();

    this.state = {
      uid: '',
      username: '',
      userList: [],
      messages: [],
      chatWith: 'mainChat'
    };
  }

  componentDidMount() {
    this.socket.on('uid', uid => {
      this.setState(() => ({ uid }));
    });
    //this.socket.on('enterUser', console.log);
    this.socket.on('updateUserList', userList => {
      this.setState(() => ({
        userList
      }));
    });
    this.socket.on('newMessage', m => {
      this.setState(prevState => ({
        messages: [...prevState.messages, m]
      }));
    });
    this.socket.on('userIsTyping', u => {
      this.setState(prevState => {
        let { userList } = prevState;
        userList[u.socketId].isTyping = u.isTyping;
        return {
          userList
        };
      });
    });
  }

  handleAddMessage(newMsg) {
    this.socket.emit('createMessage', {
      from: this.state.username,
      to: this.state.chatWith,
      text: newMsg
    });
  }

  handleSetUsername(username) {
    this.setState(() => ({ username }));
    this.socket.emit('enter', { username });
  }

  handleIsTyping = isTyping => {
    this.setState(() => ({ isTyping }));
    this.socket.emit('isTyping', isTyping);
  };

  handleSelectUser = e => {
    let userId = e.target.dataset.userId;
    this.setState(() => ({ chatWith: userId }));
  };

  render() {
    let renderEl = (
      <SetNameForm {...this.props} handleSetUsername={this.handleSetUsername} />
    );
    if (this.state.username) {
      renderEl = (
        <div className="chat">
          <ChatList
            uid={this.state.uid}
            userList={this.state.userList}
            chatWith={this.state.chatWith}
            handleSelectUser={this.handleSelectUser}
          />

          <div className="chat__main">
            <MessageList messages={this.state.messages} />
            <MessageForm
              handleAddMessage={this.handleAddMessage}
              handleIsTyping={this.handleIsTyping}
            />
          </div>
        </div>
      );
    }
    return renderEl;
  }
}

export default App;
