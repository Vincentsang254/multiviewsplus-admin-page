/** @format */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { loadUser } from "./features/slice/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// pages
import Home from "./pages/Home";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Notfound from "./pages/Notfound";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser(null));
	}, [dispatch]);

	return (
		<BrowserRouter>
			<div className='app-container'>
				<ToastContainer />
				<Navbar />
				<div className='content-wrap'>
					<Routes>
						<Route exact path='/' element={<Home />} />

						<Route path='*' element={<Notfound />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;
