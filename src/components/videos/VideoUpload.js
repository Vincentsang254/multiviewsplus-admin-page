/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideo } from "../../features/slice/videosSlice";
import { toast } from "react-toastify";

const VideoUpload = () => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		name: "",
		desc: "",
		category: "Korean Series",
	});
	const [videoFile, setVideoFile] = useState(null);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e) => {
		setVideoFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!videoFile) {
			toast.error("Please select a video file.", { position: "bottom-left" });
			return;
		}

		const data = new FormData();
		data.append("name", formData.name);
		data.append("desc", formData.desc);
		data.append("category", formData.category);
		data.append("video", videoFile);

		try {
			await dispatch(createVideo(data)).unwrap();
			toast.success("Video uploaded successfully", { position: "bottom-left" });
		} catch (error) {
			toast.error("Failed to upload video", { position: "bottom-left" });
		}
	};

	return (
		<div>
			<h1>Upload Video</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='name'>Title:</label>
					<input
						type='text'
						id='name'
						name='name'
						value={formData.name}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='desc'>Description:</label>
					<textarea
						id='desc'
						name='desc'
						value={formData.desc}
						onChange={handleInputChange}
						required
					/>
				</div>
				<div>
					<label htmlFor='category'>Category:</label>
					<select
						id='category'
						name='category'
						value={formData.category}
						onChange={handleInputChange}
						required
					>
						<option value='Korean Series'>Korean Series</option>
						<option value='Documentaries'>Documentaries</option>
						<option value='Nollywood Movies'>Nollywood Movies</option>
						<option value='Hollywood Movies'>Hollywood Movies</option>
						<option value='Animations'>Animations</option>
						<option value='Family'>Family</option>
						<option value='TV Shows'>TV Shows</option>
					</select>
				</div>
				<div>
					<label htmlFor='video'>Video File:</label>
					<input
						type='file'
						id='video'
						name='video'
						accept='video/mp4'
						onChange={handleFileChange}
						required
					/>
				</div>
				<button type='submit'>Upload Video</button>
			</form>
		</div>
	);
};

export default VideoUpload;
