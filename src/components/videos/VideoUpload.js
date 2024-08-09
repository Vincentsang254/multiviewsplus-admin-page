/** @format */
/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideo } from "../../features/slice/videosSlice";
import { toast } from "react-toastify";
import { Spinner } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const VideoUpload = () => {
	const dispatch = useDispatch();
	const { status, error } = useSelector((state) => state.videos); // Assuming your redux state contains `status` and `error` for videos

	const validationSchema = Yup.object({
		name: Yup.string().required("Title is required"),
		desc: Yup.string().required("Description is required"),
		category: Yup.string().required("Category is required"),
		video: Yup.mixed()
			.required("Please select a video file")
			.test(
				"fileType",
				"Unsupported File Format",
				(value) => value && value.type === "video/mp4"
			),
	});

	const handleSubmit = async (values, { resetForm }) => {
		const data = new FormData();
		data.append("name", values.name);
		data.append("desc", values.desc);
		data.append("category", values.category);
		data.append("video", values.video);

		try {
			await dispatch(createVideo(data)).unwrap();
			toast.success("Video uploaded successfully", { position: "bottom-left" });
			resetForm();
		} catch (error) {
			toast.error("Failed to upload video", { position: "bottom-left" });
		}
	};

	return (
		<div className='max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-24'>
			<h1 className='text-2xl font-bold mb-6'>Upload Video</h1>
			<Formik
				initialValues={{
					name: "",
					desc: "",
					category: "Korean Series",
					video: null,
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue, values }) => (
					<Form className='space-y-4'>
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-700'
							>
								Title:
							</label>
							<Field
								type='text'
								id='name'
								name='name'
								className='mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm'
							/>
							<ErrorMessage name='name'>
								{(msg) => <p className='text-red-500 text-sm'>{msg}</p>}
							</ErrorMessage>
						</div>

						<div>
							<label
								htmlFor='desc'
								className='block text-sm font-medium text-gray-700'
							>
								Description:
							</label>
							<Field
								as='textarea'
								id='desc'
								name='desc'
								className='mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm'
							/>
							<ErrorMessage name='desc'>
								{(msg) => <p className='text-red-500 text-sm'>{msg}</p>}
							</ErrorMessage>
						</div>

						<div>
							<label
								htmlFor='category'
								className='block text-sm font-medium text-gray-700'
							>
								Category:
							</label>
							<Field
								as='select'
								id='category'
								name='category'
								className='mt-1 block w-full px-3 py-2 border rounded-md shadow-sm'
							>
								<option value='Korean Series'>Korean Series</option>
								<option value='Documentaries'>Documentaries</option>
								<option value='Nollywood Movies'>Nollywood Movies</option>
								<option value='Hollywood Movies'>Hollywood Movies</option>
								<option value='Animations'>Animations</option>
								<option value='Family'>Family</option>
								<option value='TV Shows'>TV Shows</option>
							</Field>
							<ErrorMessage name='category'>
								{(msg) => <p className='text-red-500 text-sm'>{msg}</p>}
							</ErrorMessage>
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
								onChange={(event) =>
									setFieldValue("video", event.currentTarget.files[0])
								}
								className='mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100'
							/>
							<ErrorMessage name='video'>
								{(msg) => <p className='text-red-500 text-sm'>{msg}</p>}
							</ErrorMessage>
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
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default VideoUpload;
