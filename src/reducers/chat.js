// Chat Reducer

const chatReducerDefaultState = {
  chatWith: 'mainChat',
  messages: []
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
    default:
      return state;
  }
};
