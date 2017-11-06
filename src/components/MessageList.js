import React from 'react';
import MessageItem from './MessageItem';

const MessageList = props => (
  <ol id="messages" className="chat__messages">
    {props.messages.map(m => <MessageItem key={m} msg={m} />)}
  </ol>
);

export default MessageList;
