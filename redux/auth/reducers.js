import Fetch from "../../utils/Fetch";

const userInitialState = {
   loggedIn: false,
   data: null,
};

export const user = (state = userInitialState, action) => {
   switch (action.type) {
      case 'LOGIN':
         return { loggedIn: true, data: action.data };
      case 'LOGOUT':
			Fetch.removeAuthToken()
         return userInitialState;
      default:
         return state;
   }
};
