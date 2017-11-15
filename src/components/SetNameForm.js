import React from 'react';
import { connect } from 'react-redux';
import { setUserName } from '../actions/user';

class SetNameForm extends React.Component {
  handleSetName = e => {
    e.preventDefault();
    const name = e.target.elements.username.value.trim();
    if (name) {
      this.props.setUserName(name);
      e.target.elements.enterBtn.disabled = true;
    }
  };

  /**
   * @todo: Add onChange to input and tell the user if name is already in use
   */
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
            <button name="enterBtn">Enter</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUserName: name => dispatch(setUserName(name))
});

export default connect(undefined, mapDispatchToProps)(SetNameForm);
