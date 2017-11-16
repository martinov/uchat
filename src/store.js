import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/user';
import chatReducer from './reducers/chat';
import { setUserList, setUserIsTyping } from './actions/user';
import { addMessage } from './actions/chat';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (extraArgs = {}) => {
  const socket = extraArgs.socket;

  const store = createStore(
    combineReducers({
      user: userReducer,
      chat: chatReducer
    }),
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument({ socket }))
    )
  );

  // socket.on('enterUser', console.log);
  socket.on('updateUserList', userList => {
    store.dispatch(setUserList(userList));
  });
  socket.on('newMessage', m => {
    store.dispatch(addMessage(m));
  });
  socket.on('userIsTyping', user => {
    store.dispatch(setUserIsTyping({
      uid: user.socketId,
      isTyping: user.isTyping})
    );
  });

  return store;
};
