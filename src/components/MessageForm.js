import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleMsgSubmit = this.handleMsgSubmit.bind(this);

    this.state = {
      messages: []
    };
  }

  handleMsgSubmit(e) {
    e.preventDefault();

    const msg = e.target.elements.message.value.trim();
    if (msg) {
      this.props.handleAddMessage(msg);
      e.target.elements.message.value = '';
    }
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
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default MessageForm;
