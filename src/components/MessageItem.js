import React from 'react';
import moment from 'moment';

const MessageItem = props => {
  const dateCreated = moment(props.msg.createdAt).format('HH:mm');
  let fromStr = ' ';
  if (props.msg.from !== 'Admin') {
    fromStr += `${props.msg.from}: `;
  }
  return (
    <li>
      [{dateCreated}]
      <strong>{fromStr}</strong>
      {props.msg.text}
    </li>
  );
};

export default MessageItem;
