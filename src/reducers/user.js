// User Reducer

const userReducerDefaultState = {
  uid: '',
  username: '',
  userList: {},
  nameFormError: '',
  isTyping: false
};

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        ...action.user
      };
    case 'SET_USER_LIST':
      return {
        ...state,
        userList: action.userList
      };
    case 'SET_NAME_FORM_ERROR':
      return {
        ...state,
        nameFormError: action.error
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
    case 'SET_IS_TYPING':
      return {
        ...state,
        isTyping: action.isTyping
      };
    default:
      return state;
  }
};
