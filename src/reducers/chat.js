// Chat Reducer

const chatReducerDefaultState = {
  chatWith: 'mainChat',
  messages: [],
  newMsgFrom: []
};

export default (state = chatReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_CHATWITH':
      return {
        ...state,
        chatWith: action.chatWith
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.msg]
      };
    case 'NEW_MSG_FROM':
      let computedNewMsgFrom = state.newMsgFrom;
      if (computedNewMsgFrom.indexOf(action.chatWith) < 0) {
        computedNewMsgFrom.push(action.chatWith);
      }
      return {
        ...state,
        newMsgFrom: computedNewMsgFrom
      };
    case 'CLEAR_NEW_MSG':
      let newStateMsgFrom = state.newMsgFrom;
      const rmIndex = newStateMsgFrom.indexOf(action.chatWith);
      newStateMsgFrom.splice(rmIndex, 1);
      return {
        ...state,
        newMsgFrom: newStateMsgFrom
      };
    default:
      return state;
  }
};
