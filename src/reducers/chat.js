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
      let newMsgFrom = [...state.newMsgFrom];
      if (newMsgFrom.indexOf(action.chatWith) < 0) {
        newMsgFrom.push(action.chatWith);
      }
      return {
        ...state,
        newMsgFrom
      };
    case 'CLEAR_NEW_MSG':
      return {
        ...state,
        newMsgFrom: state.newMsgFrom.filter(from => from !== action.chatWith)
      };
    default:
      return state;
  }
};
