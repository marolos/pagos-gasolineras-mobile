import AxiosInstance from "../../common/axios";

/**
 * Simple actions creator
 */

export const login = (loginData) => ({
  type: 'LOGIN',
  loginData,
});

export const logout = () => ({
  type: 'LOGOUT',
});


/**
 * ASYNC actions creator
 */
export const loginRequest = (form) =>  (dispatch) => {
	return AxiosInstance.post('auth/local/', form)
		.then(res => dispatch(login({user: {}})))
		.catch(err=> console.error("error"))
};
