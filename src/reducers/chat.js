// Chat Reducer

const chatReducerDefaultState = {
  userList: {},
  chatWith: 'mainChat',
  messages: [],
  newMsgFrom: []
};

export default (state = chatReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_USER_LIST':
      return {
        ...state,
        userList: action.userList
      };
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
    case 'SET_USER_IS_TYPING':
      let updatedUserList = {};
      for (let uid in state.userList) {
        updatedUserList[uid] = state.userList[uid];
        if (uid === action.user.uid) {
          updatedUserList[uid].isTyping = action.user.isTyping;
        }
      }
      return {
        ...state,
        userList: updatedUserList
      };
    default:
      return state;
  }
};
