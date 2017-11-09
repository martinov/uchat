import React from 'react';

class ChatList extends React.Component {
  render() {
    let peopleList = [];
    for (let key in this.props.userList) {
      peopleList.push({
        id: key,
        username: this.props.userList[key].username,
        isTyping: this.props.userList[key].isTyping
      });
    }
    return (
      <div className="chat__sidebar">
        <h2 className="active">uChat</h2>
        <h3>People</h3>
        <ul id="users">
        {
          peopleList.map(p => {
            let liClasses = '';
            if (p.isTyping) liClasses = 'active';
            return (
              <li key={p.id} className={liClasses}>{p.username}{p.isTyping && (<span>...</span>)}</li>
            );
          })
        }
        </ul>
      </div>
    );
  }
}

export default ChatList;
