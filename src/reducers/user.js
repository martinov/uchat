// User Reducer

const userReducerDefaultState = {
  uid: '',
  username: '',
  userList: [],
  nameFormError: ''
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
    default:
      return state;
  }
};
