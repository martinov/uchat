import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user';
import chatReducer from './reducers/chat';
import { setUserInfo, setUserList } from './actions/user';
import { addMessage } from './actions/chat';

export default (extraArgs = {}) => {
  const socket = extraArgs.socket;

  const store = createStore(
    combineReducers({
      user: userReducer,
      chat: chatReducer
    }),
    applyMiddleware(thunk.withExtraArgument({ socket }))
  );

  socket.on('uid', uid => {
    store.dispatch(setUserInfo({ uid }));
  });
  //socket.on('enterUser', console.log);
  socket.on('updateUserList', userList => {
    store.dispatch(setUserList(userList));
  });
  socket.on('newMessage', m => {
    store.dispatch(addMessage(m));
  });
  // socket.on('userIsTyping', u => {
  //   this.setState(prevState => {
  //     let { userList } = prevState;
  //     userList[u.socketId].isTyping = u.isTyping;
  //     return {
  //       userList
  //     };
  //   });
  // });

  return store;
};
