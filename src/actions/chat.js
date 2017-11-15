export const setChatWith = chatWith => ({ type: 'SET_CHATWITH', chatWith });
export const addMessage = msg => ({ type: 'ADD_MESSAGE', msg });

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
