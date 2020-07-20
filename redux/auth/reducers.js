const userInitialState = {
  loggedIn: false,
  data: null,
};

export const user = (state = userInitialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { loggedIn: true, data: action.userData };
    case 'LOGOUT':
      return userInitialState;
    default:
      return state;
  }
};
