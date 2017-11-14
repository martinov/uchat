import { createStore, combineReducers } from 'redux';
import userReducer from './reducers/user';
// import userListReducer from './reducers/user';
// import messagesReducer from './reducers/messages';
// import filtersReducer from './reducers/filters';

export default () => {
  const store = createStore(
    combineReducers({
      user: userReducer
      // userList: userListReducer,
      // messages: messagesReducer,
      // filters: filtersReducer
    })
  );

  return store;
};

// eslint-disable-next-line
const demoState = {
  user: {
    uid: '{...socket.id...}',
    userName: 'Martin'
  },
  userList: [
    {
      uid: '{...socket.id...}',
      userName: 'Person Name'
    }
  ],
  messages: [
    {
      id: '{...uuid...}',
      to: '{...uid...}',
      from: 'Martin',
      text: 'Hello World!',
      createdAt: 1234567890
    }
  ],
  filters: {
    msgFrom: '{...uid...}'
  }
};
