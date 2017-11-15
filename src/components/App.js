import React, { Component } from 'react';
import { connect } from 'react-redux';
import SetNameForm from './SetNameForm';
import ChatList from './ChatList';
import MessageList from './MessageList';
import MessageForm from './MessageForm';

import './App.css';

class App extends Component {
  handleIsTyping = isTyping => {
    this.setState(() => ({ isTyping }));
    this.props.socket.emit('isTyping', isTyping);
  };

  render() {
    let renderEl = <SetNameForm {...this.props} />;
    if (this.props.username) {
      renderEl = (
        <div className="chat">
          <ChatList />

          <div className="chat__main">
            <MessageList />
            <MessageForm handleIsTyping={this.handleIsTyping} />
          </div>
        </div>
      );
    }
    return renderEl;
  }
}

const mapStateToProps = state => ({
  username: state.user.username
});

export default connect(mapStateToProps)(App);
