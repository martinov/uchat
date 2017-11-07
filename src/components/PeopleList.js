import React from 'react';

class PeopleList extends React.Component {
  render() {
    let peopleList = [];
    for (let key in this.props.userList) {
      peopleList.push({
        id: key,
        username: this.props.userList[key].username
      });
    }
    return (
      <div className="chat__sidebar">
        <h3>People</h3>
        <ul id="users">
          { peopleList.map(p => <li key={p.id}>{p.username}</li>) }
        </ul>
      </div>
    );
  }
}

export default PeopleList;
