/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { setHeaders, url } from "./api";

const initialState = {
	list: [],
	video: null,
	status: null,
	error: null,
};

export const createVideo = createAsyncThunk(
	"videos/createVideo",
	async (values) => {
		try {
			const response = await axios.post(
				`${url}/videos/create`,
				values,
				setHeaders()
			);
			return response.data;
		} catch (error) {
			console.error("Error creating video:", error.response?.message);
			toast.error(error.response?.data || "Error creating video", {
				position: "bottom-left",
			});
		}
	}
);

export const deleteVideo = createAsyncThunk(
	"videos/deleteVideo",
	async (videoId) => {
		try {
			await axios.delete(`${url}/videos/delete/${videoId}`, setHeaders());
			return videoId; // Return the deleted video's ID
		} catch (error) {
			console.error("Error deleting video:", error.response?.message);
			toast.error(error.response?.data || "Error deleting video", {
				position: "bottom-left",
			});
		}
	}
);

export const updateVideo = createAsyncThunk(
	"videos/updateVideo",
	async (values) => {
		try {
			const response = await axios.put(
				`${url}/videos/update/${values.id}`,
				values,
				setHeaders()
			);
			return response.data; // Assuming the server returns the updated video
		} catch (error) {
			console.error("Error updating video:", error.response?.message);
			toast.error(error.response?.data || "Error updating video", {
				position: "bottom-left",
			});
		}
	}
);

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async () => {
	try {
		const response = await axios.get(`${url}/videos/get`, setHeaders());
		return response.data;
	} catch (error) {
		console.error("Error fetching videos:", error.response?.message);
		toast.error(error.response?.data || "Error fetching videos", {
			position: "bottom-left",
		});
	}
});

export const fetchVideoById = createAsyncThunk(
	"videos/fetchVideoById",
	async (videoId) => {
		try {
			const response = await axios.get(
				`${url}/videos/get/${videoId}`,
				setHeaders()
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching video by ID:", error.response?.message);
			toast.error(error.response?.data || "Error fetching video by ID", {
				position: "bottom-left",
			});
		}
	}
);

const videosSlice = createSlice({
	name: "videos",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchVideos.fulfilled, (state, action) => {
				state.list = action.payload;
				state.status = "success";
			})
			.addCase(fetchVideos.pending, (state) => {
				state.status = "pending";
			})
			.addCase(fetchVideos.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error.message;
			})
			.addCase(fetchVideoById.fulfilled, (state, action) => {
				state.video = action.payload;
				state.status = "success";
			})
			.addCase(fetchVideoById.pending, (state) => {
				state.status = "pending";
			})
			.addCase(fetchVideoById.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error.message;
			})
			.addCase(createVideo.fulfilled, (state, action) => {
				state.list.push(action.payload);
				state.status = "success";
				toast.success("Video created successfully", {
					position: "bottom-left",
				});
			})
			.addCase(createVideo.pending, (state) => {
				state.status = "pending";
			})
			.addCase(createVideo.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error.message;
			})
			.addCase(deleteVideo.fulfilled, (state, action) => {
				state.list = state.list.filter((video) => video.id !== action.payload);
				state.status = "success";
				toast.success("Video deleted successfully", {
					position: "bottom-left",
				});
			})
			.addCase(deleteVideo.pending, (state) => {
				state.status = "pending";
			})
			.addCase(deleteVideo.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error.message;
			})
			.addCase(updateVideo.fulfilled, (state, action) => {
				const updatedVideo = action.payload;
				const index = state.list.findIndex(
					(video) => video.id === updatedVideo.id
				);
				if (index !== -1) {
					state.list[index] = updatedVideo;
				}
				state.status = "success";
				toast.success("Video updated successfully", {
					position: "bottom-left",
				});
			})
			.addCase(updateVideo.pending, (state) => {
				state.status = "pending";
			})
			.addCase(updateVideo.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.error.message;
			});
	},
});

export default videosSlice.reducer;
