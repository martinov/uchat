import React from 'react';
import { connect } from 'react-redux';
import { createMessage } from '../actions/chat';
import { setIsTyping } from '../actions/user';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.timeoutHandle = undefined;
  }

  handleMsgSubmit = e => {
    e.preventDefault();

    const msg = e.target.elements.message.value.trim();
    if (msg) {
      this.props.handleAddMessage(msg);
      e.target.elements.message.value = '';
      this.typingTimeout();
    }
  };

  typingTimeout = () => {
    // Timeout reached - maybe the user isn't typing anymore.
    this.props.handleIsTyping(false);
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      clearTimeout(this.timeoutHandle);
      return;
    }
    if (this.props.isTyping === false) {
      this.props.handleIsTyping(true);
    } else {
      clearTimeout(this.timeoutHandle);
    }
    this.timeoutHandle = setTimeout(this.typingTimeout, 4000);
  };

  render() {
    return (
      <div className="chat__footer">
        <form id="message-form" onSubmit={this.handleMsgSubmit}>
          <input
            type="text"
            name="message"
            placeholder="Message"
            autoFocus
            autoComplete="off"
            onKeyPress={this.handleKeyPress}
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isTyping: state.user.isTyping
})

const mapDispatchToProps = dispatch => ({
  handleAddMessage: message => dispatch(createMessage(message)),
  handleIsTyping: isTyping => dispatch(setIsTyping(isTyping))
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
