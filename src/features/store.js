/** @format */

import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slice/usersSlice";
import tipsReducer from "./slice/tipsSlice";
import jackpotsReducer from "./slice/jackpotSlice";
import authReducer from "./slice/authSlice";
import imagesReducer from "./slice/imagesSlice";
import videosReducer from "./slice/videosSlice";

export const store = configureStore({
	reducer: {
		users: usersReducer,
		tips: tipsReducer,
		jackpots: jackpotsReducer,
		auth: authReducer,
		images: imagesReducer,
		videos: videosReducer,
	},
});
