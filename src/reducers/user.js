// User Reducer

const userReducerDefaultState = {
  uid: '',
  username: '',
  userList: []
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
    default:
      return state;
  }
};
