import React from 'react';
import moment from 'moment';

const MessageItem = props => (
  <li>{moment(props.msg.createdAt).format('HH:mm')} - {props.msg.from}: {props.msg.text}</li>
);

export default MessageItem;
