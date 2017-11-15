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

  handleSelectUser = e => {
    let userId = e.target.dataset.userId;
    this.setState(() => ({ chatWith: userId }));
  };

  render() {
    let renderEl = <SetNameForm {...this.props} />;
    if (this.props.user.username) {
      renderEl = (
        <div className="chat">
          <ChatList handleSelectUser={this.handleSelectUser} />

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
  user: state.user,
  chatWith: state.chat.chatWith
});

const mapDispatchToProps = dispatch => ({
  // addMessage: msg => dispatch(addMessage(msg))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
