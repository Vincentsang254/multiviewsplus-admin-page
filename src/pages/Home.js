/** @format */

import VideoUpload from "../components/videos/VideoUpload";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useSelector((state) => state.auth);

	// Fetch tips and handle navigation based on authentication status
	useEffect(() => {
		if (!id) {
			navigate("/login"); // Redirect to login if not authenticated
		}
	}, [id, navigate]);
	return (
		<div>
			<VideoUpload />
		</div>
	);
};

export default Home;
