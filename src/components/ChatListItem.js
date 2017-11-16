import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

class ChatListItem extends React.Component {
  render() {
    const user = this.props.user;
    console.log(user);
    const liClass = classNames({
      'active': user.chatWith,
      'is-typing': user.isTyping,
      'new-msg': user.newMsg,
      'me': user.uid === this.props.uid
    });

    return (
      <li
        key={user.uid}
        onClick={
          user.uid !== this.props.uid ? this.props.handleChatListOnClick : null
        }
        className={liClass}
        data-user-id={user.uid}
      >
        {user.username}
        {user.newMsg && <span> *</span>}
        {user.isTyping && <span> ...</span>}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.user.uid
});

export default connect(mapStateToProps)(ChatListItem);
