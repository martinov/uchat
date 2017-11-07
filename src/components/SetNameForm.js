import React from 'react';

class SetNameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetName = this.handleSetName.bind(this);
  }

  handleSetName(e) {
    e.preventDefault();
    const name = e.target.elements.username.value.trim();
    if (name) {
      this.props.handleSetUsername(name);
    }
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-form">
          <h1>uChat</h1>
          <form className="login-form-field" onSubmit={this.handleSetName}>
            <input
              type="text"
              name="username"
              placeholder="What's your name?"
              autoFocus
              autoComplete="off"
            />
            <button>Enter</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SetNameForm;
