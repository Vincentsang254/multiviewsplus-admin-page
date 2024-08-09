/** @format */

export const url = "https://multiviewsplus-server.onrender.com/api";

export const setHeaders = () => {
	const token = localStorage.getItem("token");

	const headers = {
		headers: {
			"x-auth-token": token,
		},
	};

	return headers;
};
