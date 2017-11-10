import React from 'react';

class ChatList extends React.Component {
  render() {
    let peopleList = [];
    for (let key in this.props.userList) {
      peopleList.push({
        id: key,
        username: this.props.userList[key].username,
        isTyping: this.props.userList[key].isTyping,
        chatWith: this.props.chatWith === key
      });
    }
    let h2class = this.props.chatWith === 'mainChat' ? 'active' : null;
    return (
      <div className="chat__sidebar">
        <h2
          className={h2class}
          data-user-id="mainChat"
          onClick={this.props.handleSelectUser}
        >
          uChat
        </h2>
        <h3>People</h3>
        <ul id="users">
        {
          peopleList.map(p => {
            let liClasses = '';
            if (p.isTyping) liClasses = 'is-typing';
            if (p.chatWith) liClasses += ' active';
            if (p.id === this.props.uid) liClasses += ' me';
            return (
              <li key={p.id}
                onClick={p.id !== this.props.uid ? this.props.handleSelectUser : null}
                className={liClasses}
                data-user-id={p.id}
              >
                {p.username}{p.isTyping && (<span> ...</span>)}
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default ChatList;
