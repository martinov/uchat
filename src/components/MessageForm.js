import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleMsgSubmit = this.handleMsgSubmit.bind(this);

    this.timeoutHandle = undefined;

    this.state = {
      isTyping: false,
    };
  }

  handleMsgSubmit(e) {
    e.preventDefault();

    const msg = e.target.elements.message.value.trim();
    if (msg) {
      this.props.handleAddMessage(msg);
      e.target.elements.message.value = '';
      this.typingTimeout();
    }
  }

  typingTimeout = () => {
    // Timeout reached - maybe the user isn't typing anymore.
    this.setState(() => ({ isTyping: false }));
    this.props.handleIsTyping(false);
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      clearTimeout(this.timeoutHandle);
      return;
    }
    if (this.state.isTyping === false) {
      this.setState(() => ({ isTyping: true }));
      this.props.handleIsTyping(true);
    } else {
      clearTimeout(this.timeoutHandle);
    }
    this.timeoutHandle = setTimeout(this.typingTimeout, 4000);
  }

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

export default MessageForm;
