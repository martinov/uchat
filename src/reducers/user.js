// User Reducer

const userReducerDefaultState = { name: '', uid: '' };

export default (state = userReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_USER_ID':
      return {
        ...state,
        uid: action.uid
      };
    case 'SET_USER_NAME':
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
};
