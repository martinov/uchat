import React from 'react';
import { connect } from 'react-redux';
import { setUserName } from '../actions/user';

import './SetNameForm.css';

class SetNameForm extends React.Component {
  handleSetName = e => {
    e.preventDefault();
    const name = e.target.elements.username.value.trim();
    if (name) {
      // e.target.elements.enterBtn.disabled = true;
      this.props.setUserName(name);
    }
  };

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
          {this.props.error && <div className="error">{this.props.error}</div>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.user.nameFormError
});

const mapDispatchToProps = dispatch => ({
  setUserName: name => dispatch(setUserName(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetNameForm);
