// User Reducer

const userReducerDefaultState = {
  uid: '',
  username: '',
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
    case 'SET_NAME_FORM_ERROR':
      return {
        ...state,
        nameFormError: action.error
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
