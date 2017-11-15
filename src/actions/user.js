export const setUserInfo = user => ({ type: 'SET_USER_INFO', user });

export const setUserName = username => {
  return (dispatch, getState, { socket }) => {
    // socket.emit('enter', { username }, uid => {
    //   dispatch(setUserInfo({ uid, username }));
    // });
    socket.emit('enter', { username });
    dispatch(setUserInfo({ username }));
  };
};

export const setUserList = userList => ({ type: 'SET_USER_LIST', userList });
