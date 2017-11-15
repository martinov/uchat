import React from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import MessageItem from './MessageItem';
import selectMessages from '../selectors/messages';

class MessageList extends React.Component {
  render() {
    return (
      <ol id="messages" className="chat__messages" ref="messageList">
        {this.props.messages.map(m => <MessageItem key={m.id} msg={m} />)}
      </ol>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const { messageList } = this.refs;
    if (messageList.childNodes.length < 2) {
      // Ensure we've got a couple of previous messages to work with.
      return;
    }
    const newMessage =
      messageList.childNodes[messageList.childNodes.length - 1];
    const prevMessage =
      messageList.childNodes[messageList.childNodes.length - 2];
    const clientHeight = messageList.clientHeight;
    const scrollTop = messageList.scrollTop;
    const scrollHeight = messageList.scrollHeight;
    const newMessageHeight = newMessage.clientHeight;
    const lastMessageHeight = prevMessage.clientHeight;

    if (
      clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
      scrollHeight
    ) {
      findDOMNode(messageList).scrollTop = scrollHeight;
    }
  }
}

const mapStateToProps = state => ({
  messages: selectMessages(state.chat, state.user.uid)
});

export default connect(mapStateToProps)(MessageList);
