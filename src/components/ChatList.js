import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { setChatWith } from '../actions/chat';
import ChatListItem from './ChatListItem';

class ChatList extends React.Component {
  handleChatListOnClick = e => {
    const userId = e.target.dataset.userId;
    this.props.setChatWith(userId);
  };

  render() {
    let userList = [];
    for (let key in this.props.userList) {
      userList.push({
        uid: key,
        username: this.props.userList[key].username,
        isTyping: this.props.userList[key].isTyping,
        chatWith: this.props.chatWith === key,
        newMsg: this.props.newMsgFrom.indexOf(key) >= 0
      });
    }
    const h2Class = classNames({
      active: this.props.chatWith === 'mainChat'
    });

    return (
      <div className="chat__sidebar">
        <h2
          className={h2Class}
          data-user-id="mainChat"
          onClick={
            this.props.chatWith !== 'mainChat'
              ? this.handleChatListOnClick
              : null
          }
        >
          uChat
        </h2>
        <h3>People</h3>
        <ul id="users">
          {userList.map(u => (
            <ChatListItem
              key={u.uid}
              user={u}
              handleChatListOnClick={this.handleChatListOnClick}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  uid: state.user.uid,
  userList: state.user.userList,
  chatWith: state.chat.chatWith,
  newMsgFrom: state.chat.newMsgFrom
});

const mapDispatchToProps = dispatch => ({
  setChatWith: chatWith => dispatch(setChatWith(chatWith))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
