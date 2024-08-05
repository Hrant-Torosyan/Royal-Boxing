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

		updateServiceSessions: (state, action) => {
			// state.updateService.status = "idel";
			// state.updateService.error = null;
			const { serviceID, newSessions, type } = action.payload;
			const serviceToUpdate = state.allServices.find(
				(service) => service.id === Number(serviceID)
			);
			if (type === "ADD") {
				serviceToUpdate.sessions = [...(serviceToUpdate?.sessions || []), newSessions];
			} else if (type === "EDIT") {
				serviceToUpdate.sessions = serviceToUpdate.sessions.map((item) => {
					if (item.id === newSessions.id) {
						// delete newSessions.id;
						return newSessions;
					}
					return item;
				});
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createService.fulfilled, (state) => {
				state.createService.status = "succeeded";
				state.createService.error = null;
				// console.log(action.payload);
				// state.allServices = [...state.allServices, action.payload];
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
			});
	},
});

export const {
	createServiceSucceeded,
	editServiceSucceeded,
	updateServiceSucceeded,
	updateServiceSessions,
} = servicesSlice.actions;

export default servicesSlice.reducer;
