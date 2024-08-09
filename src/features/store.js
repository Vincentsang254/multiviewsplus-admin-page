/** @format */

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/usersSlice";

import authReducer from "./slice/authSlice";
import videosReducer from "./slice/videosSlice";

export const store = configureStore({
	reducer: {
		users: usersReducer,

		auth: authReducer,

		videos: videosReducer,
	},
});
