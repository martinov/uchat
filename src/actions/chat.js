export const setUserList = userList => ({
  type: 'SET_USER_LIST',
  userList
});

export const setChatWith = chatWith => {
  return dispatch => {
    dispatch({ type: 'SET_CHATWITH', chatWith });
    dispatch(clearNewMsgFrom(chatWith));
  };
};

export const addMessage = msg => {
  return (dispatch, getState) => {
    const state = getState();

    dispatch({ type: 'ADD_MESSAGE', msg });
    if (
      msg.to !== 'mainChat' &&
      msg.uid !== state.user.uid &&
      msg.uid !== state.chat.chatWith
    ) {
      dispatch(addNewMsgFrom(msg.uid));
    }
  };
};

export const createMessage = msg => {
  return (dispatch, getState, { socket }) => {
    const { user, chat } = getState();
    const newMsg = {
      from: user.username,
      to: chat.chatWith,
      text: msg
    };
    socket.emit('createMessage', newMsg, createdMsg => {
      dispatch(addMessage(createdMsg));
    });
  };
};

export const addNewMsgFrom = chatWith => ({
  type: 'NEW_MSG_FROM',
  chatWith
});

export const clearNewMsgFrom = chatWith => ({
  type: 'CLEAR_NEW_MSG',
  chatWith
});

export const setUserIsTyping = user => ({
  type: 'SET_USER_IS_TYPING',
  user
});
