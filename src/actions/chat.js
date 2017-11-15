export const setChatWith = chatWith => {
  return (dispatch) => {
    dispatch({ type: 'SET_CHATWITH', chatWith });
    dispatch(clearNewMsgFrom(chatWith));
  };
};

export const addMessage = msg => {
  return (dispatch) => {
    dispatch({ type: 'ADD_MESSAGE', msg });
    dispatch(addNewMsgFrom(msg.uid));
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

export const addNewMsgFrom = chatWith => ({ type: 'NEW_MSG_FROM', chatWith });
export const clearNewMsgFrom = chatWith => ({ type: 'CLEAR_NEW_MSG', chatWith });
