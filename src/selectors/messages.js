// Get visible messages

export default ({ messages, chatWith }, uid) => {
  return messages.filter((msg) => {
    if (chatWith === 'mainChat' && msg.to === 'mainChat') {
      // Show all messages sent to main chat.
      return true;
    }
    else if ((uid === msg.uid && msg.to === chatWith)
      || (uid === msg.to && msg.uid === chatWith)) {
      // Show all messages sent FROM curent user TO chatWith
      // or TO current user FROM chatWith
      return true;
    }

    return false;
  });
};
