import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../axiosClient";

const initialState = {
	allServices: [],
	status: "idle",
	error: null,
	createService: {
		status: "idle",
		error: null,
	},

	updateService: {
		status: "idle",
		error: null,
	},
	updateSession: {
		status: "idle",
		error: null,
	},
	deleteSession: {
		status: "idle",
		error: null,
	},

	deleteService: {
		status: "idle",
		error: null,
	},
	uploadServiceImage: {
		uploadedServiceImageUrl: null,
		status: "idle",
		error: null,
	},
	deleteServiceImage: {
		status: "idle",
		error: null,
	},
};

export const createService = createAsyncThunk(
	"services/create",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await axiosClient.post("/services", credentials);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getServices = createAsyncThunk("services/getAll", async (_, { rejectWithValue }) => {
	try {
		const response = await axiosClient.get("/services");
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

export const updateService = createAsyncThunk(
	"services/update",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await axiosClient.put(
				`/services/${credentials.id}?session_type=SERVICES`,
				credentials
			);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateSession = createAsyncThunk(
	"services/updateSession",
	async ({ id, credentials, serviceID }, { rejectWithValue }) => {
		try {
			const response = await axiosClient.put(`/services/change-session/${id}`, credentials);
			return { updatedSession: response.data, serviceID: serviceID };
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);
export const deleteSession = createAsyncThunk(
	"services/deleteSession",
	async ({ serviceID, sessionID }, { rejectWithValue }) => {
		try {
			const response = await axiosClient.delete(`/services/delete-Session/${sessionID}`);
			return { data: response.data, serviceID: serviceID, sessionID: sessionID };
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const deleteService = createAsyncThunk(
	"services/delete",
	async (ID, { rejectWithValue }) => {
		try {
			const response = await axiosClient.delete(`services/${ID}`);
			return { data: response.data, id: ID };
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const uploadServiceImage = createAsyncThunk(
	"services/uploadImage",
	async (credentials, { rejectWithValue }) => {
		try {
			const formData = new FormData();
			formData.append("image", credentials);
			const response = await axiosClient.post(`/services/image-upload?type=SERVICES`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const deleteServiceImage = createAsyncThunk(
	"services/deleteServiceImage",
	async (ID, { rejectWithValue }) => {
		try {
			const response = await axiosClient.delete(`/services/delete-image/${ID}`);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

const servicesSlice = createSlice({
	name: "services",
	initialState,
	reducers: {
		createServiceSucceeded: (state) => {
			state.createService.status = "idel";
			state.createService.error = null;
		},

		updateServiceSucceeded: (state) => {
			state.updateService.status = "idel";
			state.updateService.error = null;
		},
		updateSessionSucceeded: (state) => {
			state.updateSession.status = "idel";
			state.updateSession.error = null;
		},

		deleteSessionSucceeded: (state) => {
			state.deleteSession.status = "idel";
			state.deleteSession.error = null;
		},
		deleteServiceSucceeded: (state) => {
			state.deleteService.status = "idel";
			state.deleteService.error = null;
		},
		uploadServiceImageSucceeded: (state) => {
			state.uploadServiceImage.uploadedServiceImageUrl = null;
			state.uploadServiceImage.status = "idel";
			state.uploadServiceImage.error = null;
		},
		deleteServiceImageSucceeded: (state) => {
			state.deleteServiceImage.status = "idel";
			state.deleteServiceImage.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createService.fulfilled, (state) => {
				state.createService.status = "succeeded";
				state.createService.error = null;
			})
			.addCase(createService.pending, (state) => {
				state.createService.status = "pending";
			})
			.addCase(createService.rejected, (state, action) => {
				state.createService.status = "failed";
				state.createService.error = action.payload;
			})

			.addCase(getServices.fulfilled, (state, action) => {
				state.allServices = action.payload;
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(getServices.pending, (state) => {
				state.status = "pending";
			})
			.addCase(getServices.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})

			.addCase(updateService.fulfilled, (state, action) => {
				state.updateService.error = null;
				state.updateService.status = "succeeded";
				state.allServices = state.allServices.map((item) => {
					if (item.id === action.payload.id) {
						return action.payload;
					}
					return item;
				});
			})
			.addCase(updateService.pending, (state) => {
				state.updateService.status = "pending";
			})
			.addCase(updateService.rejected, (state, action) => {
				state.updateService.status = "failed";
				state.updateService.error = action.payload;
			})

			.addCase(updateSession.fulfilled, (state, action) => {
				state.updateSession.error = null;
				state.updateSession.status = "succeeded";
				const service = state.allServices.find(
					(service) => service.id === Number(action.payload.serviceID)
				);
				service.sessions = service.sessions.map((item) => {
					if (item.id === action.payload.updatedSession.id) {
						return action.payload.updatedSession;
					}
					return item;
				});
			})
			.addCase(updateSession.pending, (state) => {
				state.updateSession.status = "pending";
			})
			.addCase(updateSession.rejected, (state, action) => {
				state.updateSession.status = "failed";
				state.updateSession.error = action.payload;
			})

			.addCase(deleteSession.fulfilled, (state, action) => {
				state.deleteSession.error = null;
				state.deleteSession.status = "succeeded";
				const service = state.allServices.find(
					(service) => service.id === Number(action.payload.serviceID)
				);
				service.sessions = service.sessions.filter(
					(item) => item.id !== action.payload.sessionID
				);
			})
			.addCase(deleteSession.pending, (state) => {
				state.deleteSession.status = "pending";
			})
			.addCase(deleteSession.rejected, (state, action) => {
				state.deleteSession.status = "failed";
				state.deleteSession.error = action.payload;
			})

			.addCase(deleteService.fulfilled, (state, action) => {
				state.deleteService.error = null;
				state.deleteService.status = "succeeded";
				state.allServices = state.allServices.filter((item) => item.id !== action.payload.id);
			})
			.addCase(deleteService.pending, (state) => {
				state.deleteService.status = "pending";
			})
			.addCase(deleteService.rejected, (state, action) => {
				state.deleteService.status = "failed";
				state.deleteService.error = action.payload;
			})

			.addCase(uploadServiceImage.fulfilled, (state, action) => {
				state.uploadServiceImage.uploadedServiceImageUrl = action.payload;
				state.uploadServiceImage.status = "succeeded";
				state.uploadServiceImage.error = null;
			})
			.addCase(uploadServiceImage.pending, (state) => {
				state.uploadServiceImage.status = "pending";
			})
			.addCase(uploadServiceImage.rejected, (state, action) => {
				state.uploadServiceImage.status = "failed";
				state.uploadServiceImage.error = action.payload;
			})

			.addCase(deleteServiceImage.fulfilled, (state) => {
				state.deleteServiceImage.error = null;
				state.deleteServiceImage.status = "succeeded";
			})
			.addCase(deleteServiceImage.pending, (state) => {
				state.deleteServiceImage.status = "pending";
			})
			.addCase(deleteServiceImage.rejected, (state, action) => {
				state.deleteServiceImage.status = "failed";
				state.deleteServiceImage.error = action.payload;
			});
	},
});

export const {
	createServiceSucceeded,
	editServiceSucceeded,
	updateServiceSucceeded,
	deleteServiceSucceeded,
	updateSessionSucceeded,
	deleteSessionSucceeded,
	uploadServiceImageSucceeded,
	deleteServiceImageSucceeded,
} = servicesSlice.actions;

export default servicesSlice.reducer;
