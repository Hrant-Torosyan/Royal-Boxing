import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../axiosClient";

const initialState = {
	allSubscriptions: [],
	status: "idle",
	error: null,
	createSubscription: {
		status: "idle",
		error: null,
	},
	updateSubscription: {
		status: "idle",
		error: null,
	},
};
export const createSubscription = createAsyncThunk(
	"subscription/create",
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await axiosClient.post("/subscription", credentials);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const getSubscriptions = createAsyncThunk(
	"subscription/getAll",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosClient.get("/subscription");
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

const subscriptionSlice = createSlice({
	name: "subscription",
	initialState,
	reducers: {
		createSubscriptionSucceeded: (state) => {
			state.createSubscription.status = "idel";
			state.createSubscription.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createSubscription.fulfilled, (state) => {
				state.createSubscription.status = "succeeded";
				state.createSubscription.error = null;
				// console.log(action.payload);
				// state.allServices = [...state.allServices, action.payload];
			})
			.addCase(createSubscription.pending, (state) => {
				state.createSubscription.status = "pending";
			})
			.addCase(createSubscription.rejected, (state, action) => {
				state.createSubscription.status = "failed";
				state.createSubscription.error = action.payload;
			})

			.addCase(getSubscriptions.fulfilled, (state, action) => {
				state.allSubscriptions = action.payload;
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(getSubscriptions.pending, (state) => {
				state.status = "pending";
			})
			.addCase(getSubscriptions.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			});
	},
});

export const { createServiceSucceeded } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
