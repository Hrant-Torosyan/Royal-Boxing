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
	deleteSubscription: {
		status: "idle",
		error: null,
	},
	updateSubscription: {
		status: "idle",
		error: null,
	},

	deleteSubscriptionSession: {
		status: "idle",
		error: null,
	},

	uploadSubscriptionImage: {
		uploadedSubscriptionImageUrl: null,
		status: "idle",
		error: null,
	},
	updateSubscriptionSession: {
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

export const deleteSubscription = createAsyncThunk(
	"subscription/delete",
	async (ID, { rejectWithValue }) => {
		try {
			const response = await axiosClient.delete(`subscription/${ID}`);
			return { data: response.data, id: ID };
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateSubscription = createAsyncThunk(
	"subscription/update",
	async ({ id, credentials }, { rejectWithValue }) => {
		try {
			const response = await axiosClient.put(`/subscription/${id}`, credentials);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const uploadSubscriptionImage = createAsyncThunk(
	"subscription/uploadImage",
	async (credentials, { rejectWithValue }) => {
		try {
			const formData = new FormData();
			formData.append("image", credentials);

			const response = await axiosClient.post(
				`/services/image-upload?type=SUBSCRIPTION`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const deleteSubscriptionSession = createAsyncThunk(
	"subscription/deleteSession",
	async ({ subscriptionId, serviceId }, { rejectWithValue }) => {
		try {
			const response = await axiosClient.delete(
				`/subscription/delete-subscription/${subscriptionId}/service/${serviceId}`
			);
			return { data: response.data, subscriptionId: subscriptionId, serviceId: serviceId };
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const updateSubscriptionSession = createAsyncThunk(
	"subscription/updateSession",
	async ({ id, credentials, subscriptionId, serviceId }, { rejectWithValue }) => {
		try {
			const response = await axiosClient.put(`/services/change-session/${id}`, credentials);
			return { session: response.data, subscriptionId: subscriptionId, serviceId: serviceId };
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
		deleteSubscriptionSucceeded: (state) => {
			state.deleteSubscription.status = "idel";
			state.deleteSubscription.error = null;
		},
		updateSubscriptionSucceeded: (state) => {
			state.updateSubscription.status = "idel";
			state.updateSubscription.error = null;
		},
		uploadSubscriptionImageSucceeded: (state) => {
			state.uploadSubscriptionImage.uploadedSubscriptionImageUrl = null;
			state.uploadSubscriptionImage.status = "idel";
			state.uploadSubscriptionImage.error = null;
		},

		deleteSubscriptionSessionSucceeded: (state) => {
			state.deleteSubscriptionSession.status = "idel";
			state.deleteSubscriptionSession.error = null;
		},
		updateSubscriptionSessionSucceeded: (state) => {
			state.updateSubscriptionSession.status = "idel";
			state.updateSubscriptionSession.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createSubscription.fulfilled, (state) => {
				state.createSubscription.status = "succeeded";
				state.createSubscription.error = null;
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
			})

			.addCase(deleteSubscription.fulfilled, (state, action) => {
				state.deleteSubscription.error = null;
				state.deleteSubscription.status = "succeeded";

				state.allSubscriptions = state.allSubscriptions.filter(
					(item) => item.id !== action.payload.id
				);
			})
			.addCase(deleteSubscription.pending, (state) => {
				state.deleteSubscription.status = "pending";
			})
			.addCase(deleteSubscription.rejected, (state, action) => {
				state.deleteSubscription.status = "failed";
				state.deleteSubscription.error = action.payload;
			})

			.addCase(updateSubscription.fulfilled, (state, action) => {
				state.updateSubscription.error = null;
				state.updateSubscription.status = "succeeded";
				state.allSubscriptions = state.allSubscriptions.map((item) => {
					if (item.id === action.payload.id) {
						return action.payload;
					}
					return item;
				});
			})
			.addCase(updateSubscription.pending, (state) => {
				state.updateSubscription.status = "pending";
			})
			.addCase(updateSubscription.rejected, (state, action) => {
				state.updateSubscription.status = "failed";
				state.updateSubscription.error = action.payload;
			})

			.addCase(uploadSubscriptionImage.fulfilled, (state, action) => {
				state.uploadSubscriptionImage.uploadedSubscriptionImageUrl = action.payload;
				state.uploadSubscriptionImage.status = "succeeded";
				state.uploadSubscriptionImage.error = null;
			})
			.addCase(uploadSubscriptionImage.pending, (state) => {
				state.uploadSubscriptionImage.status = "pending";
			})
			.addCase(uploadSubscriptionImage.rejected, (state, action) => {
				state.uploadSubscriptionImage.status = "failed";
				state.uploadSubscriptionImage.error = action.payload;
			})

			.addCase(deleteSubscriptionSession.fulfilled, (state, action) => {
				state.deleteSubscriptionSession.error = null;
				state.deleteSubscriptionSession.status = "succeeded";

				const subscription = state.allSubscriptions.find(
					(sub) => sub.id === Number(action.payload.subscriptionId)
				);
				subscription.services = subscription.services.filter(
					(item) => item.id !== action.payload.serviceId
				);
			})
			.addCase(deleteSubscriptionSession.pending, (state) => {
				state.deleteSubscriptionSession.status = "pending";
			})
			.addCase(deleteSubscriptionSession.rejected, (state, action) => {
				state.deleteSubscriptionSession.status = "failed";
				state.deleteSubscriptionSession.error = action.payload;
			})

			.addCase(updateSubscriptionSession.fulfilled, (state, action) => {
				state.updateSubscriptionSession.status = "succeeded";
				state.updateSubscriptionSession.error = null;
				const subscription = state.allSubscriptions
					.find((item) => item.id === Number(action.payload.subscriptionId))
					.services.find((service) => service.id === action.payload.serviceId);
				subscription.session = action.payload.session;
			})
			.addCase(updateSubscriptionSession.pending, (state) => {
				state.updateSubscriptionSession.status = "pending";
			})
			.addCase(updateSubscriptionSession.rejected, (state, action) => {
				state.updateSubscriptionSession.status = "failed";
				state.updateSubscriptionSession.error = action.payload;
			});
	},
});

export const {
	createSubscriptionSucceeded,
	deleteSubscriptionSucceeded,
	updateSubscriptionSucceeded,
	uploadSubscriptionImageSucceeded,
	deleteSubscriptionSessionSucceeded,
	updateSubscriptionSessionSucceeded,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
