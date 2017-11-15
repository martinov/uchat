export const setUserInfo = user => ({ type: 'SET_USER_INFO', user });

export const setUserName = username => {
  return (dispatch, getState, { socket }) => {
    dispatch(setNameFormError(null));
    socket.emit('enter', { username }, result => {
      if (result.error) {
        dispatch(setNameFormError(result.error));
      } else {
        dispatch(setUserInfo({ uid: result.uid, username }));
      }
    });
  };
};

export const setUserList = userList => ({ type: 'SET_USER_LIST', userList });

export const setNameFormError = error => ({ type: 'SET_NAME_FORM_ERROR', error });
