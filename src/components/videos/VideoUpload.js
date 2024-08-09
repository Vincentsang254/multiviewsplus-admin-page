/** @format */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideo } from "../../features/slice/videosSlice";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap"; // Import Spinner if using react-bootstrap

const VideoUpload = () => {
	const dispatch = useDispatch();
	const { status, error } = useSelector((state) => state.videos); // Assuming your redux state contains `status` and `error` for videos
	const [formData, setFormData] = useState({
		name: "",
		desc: "",
		category: "Korean Series",
	});
	const [videoFile, setVideoFile] = useState(null);
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		let valid = true;
		let errors = {};

		if (!formData.name) {
			errors.name = "Title is required";
			valid = false;
		}

		if (!formData.desc) {
			errors.desc = "Description is required";
			valid = false;
		}

		if (!videoFile) {
			errors.videoFile = "Please select a video file";
			valid = false;
		}

		setErrors(errors);
		return valid;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFileChange = (e) => {
		setVideoFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
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
		<div className='max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-24'>
			<h1 className='text-2xl font-bold mb-6'>Upload Video</h1>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-gray-700'
					>
						Title:
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={formData.name}
						onChange={handleInputChange}
						required
						className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
							errors.name ? "border-red-500" : "border-gray-300"
						}`}
					/>
					{errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
				</div>
				<div>
					<label
						htmlFor='desc'
						className='block text-sm font-medium text-gray-700'
					>
						Description:
					</label>
					<textarea
						id='desc'
						name='desc'
						value={formData.desc}
						onChange={handleInputChange}
						required
						className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
							errors.desc ? "border-red-500" : "border-gray-300"
						}`}
					/>
					{errors.desc && <p className='text-red-500 text-sm'>{errors.desc}</p>}
				</div>
				<div>
					<label
						htmlFor='category'
						className='block text-sm font-medium text-gray-700'
					>
						Category:
					</label>
					<select
						id='category'
						name='category'
						value={formData.category}
						onChange={handleInputChange}
						required
						className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm'
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
					<label
						htmlFor='video'
						className='block text-sm font-medium text-gray-700'
					>
						Video File:
					</label>
					<input
						type='file'
						id='video'
						name='video'
						accept='video/mp4'
						onChange={handleFileChange}
						required
						className={`mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100 ${
							errors.videoFile ? "border-red-500" : "border-gray-300"
						}`}
					/>
					{errors.videoFile && (
						<p className='text-red-500 text-sm'>{errors.videoFile}</p>
					)}
				</div>
				<button
					type='submit'
					disabled={status === "pending"}
					className={`w-full px-4 py-2 text-white font-semibold rounded-md shadow-sm ${
						status === "pending"
							? "bg-gray-400 cursor-not-allowed"
							: "bg-indigo-600 hover:bg-indigo-700"
					} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
				>
					{status === "pending" ? (
						<span className='flex items-center justify-center'>
							<Spinner aria-label='Loading...' size='sm' />
							<span className='pl-3'>Uploading...</span>
						</span>
					) : (
						"Upload Video"
					)}
				</button>
			</form>
		</div>
	);
};

export default VideoUpload;
