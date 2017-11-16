import React from 'react';
import { connect } from 'react-redux';
import { setChatWith } from '../actions/chat';

class ChatList extends React.Component {
  handleChatListOnClick = e => {
    const userId = e.target.dataset.userId;
    this.props.setChatWith(userId);
  };
  render() {
    let peopleList = [];
    for (let key in this.props.userList) {
      peopleList.push({
        id: key,
        username: this.props.userList[key].username,
        isTyping: this.props.userList[key].isTyping,
        chatWith: this.props.chatWith === key,
        newMsg: this.props.newMsgFrom.indexOf(key) >= 0
      });
    }
    let h2class = this.props.chatWith === 'mainChat' ? 'active' : null;
    if (this.props.newMsgFrom.indexOf('mainChat') >= 0) {
      h2class += ' new-msg';
    }
    return (
      <div className="chat__sidebar">
        <h2
          className={h2class}
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
          {peopleList.map(p => {
            let liClasses = '';
            if (p.isTyping) liClasses = 'is-typing';
            if (p.chatWith) liClasses += ' active';
            if (p.newMsg) liClasses += ' new-msg';
            if (p.id === this.props.uid) liClasses += ' me';
            return (
              <li
                key={p.id}
                onClick={
                  p.id !== this.props.uid ? this.handleChatListOnClick : null
                }
                className={liClasses}
                data-user-id={p.id}
              >
                {p.username}
                {p.isTyping && <span> ...</span>}
              </li>
            );
          })}
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
