/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./features/store.js";

import { fetchTips } from "./features/slice/tipsSlice.js";
import { fetchUsers } from "./features/slice/usersSlice.js";

store.dispatch(fetchTips());
store.dispatch(fetchUsers());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
