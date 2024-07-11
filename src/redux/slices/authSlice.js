import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../axiosClient";
import { getUserAuth } from "../../util/getAuth";
const persistedState = getUserAuth();

const initialState = {
	user: persistedState || null,
	status: "idle",
	error: null,
	sendSmsRegister: {
		status: "idle",
		error: null,
		codeVerification: null,
	},
	register: {
		status: "idle",
		error: null,
	},
	uploadImage: { status: "idle", error: null, imageUrl: null },
	changePasswordSms: {
		status: "idle",
		error: null,
	},

	chechkChangePasswordSms: {
		status: "idle",
		error: null,
	},

	changePassword: {
		status: "idle",
		error: null,
	},
};

/**
 *   ========= Login ========= ///
 */
export const login = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
	try {
		const response = await axiosClient.post("/api/auth/signin-user", credentials);
		localStorage.setItem("auth", JSON.stringify(response.data));
		return response.data;
	} catch (err) {
		return rejectWithValue(err.response.data);
	}
});

/**
 *   ========= Register ========= ///
 */
export const register = createAsyncThunk(
	"auth/register",
	async ({ path, userDetails }, { rejectWithValue }) => {
		try {
			const response = await axiosClient.post(path, userDetails);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

/**
 *   ========= RefreshToken ========= ///
 */
export const refreshToken = createAsyncThunk(
	"auth/refreshToken",
	async (_, { getState, rejectWithValue }) => {
		const { auth } = getState();
		try {
			const response = await axiosClient.post("/api/auth/refresh-token", {
				refreshToken: auth.refreshToken,
			});
			localStorage.setItem("auth", JSON.stringify(response.data));
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

/**
 *   ========= SendSmsRegister ========= ///
 */
export const sendSmsRegister = createAsyncThunk(
	"auth/sendSmsRegister",
	async (phoneNumber, { rejectWithValue }) => {
		try {
			const response = await axiosClient.post(`/api/auth/send-sms?phone_number=${phoneNumber}`);
			// const response = {
			// 	data: {
			// 		status: "FAILEDa",
			// 		message: "Welcome to ROYAL BOX & Fft fitness club, Your verification code -#111111#",
			// 	},
			// };

			if (response.data.status === "FAILED") {
				return rejectWithValue(response.data);
			}
			const regex = /#(\d+)#/;
			const match = regex.exec(response.data.message)[1];
			return match;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

/**
 *   ========= UploadImage ========= ///
 */
export const uploadImage = createAsyncThunk(
	"auth/uploadImage",
	async ({ imageData, userType }, { rejectWithValue }) => {
		try {
			const formData = new FormData();
			formData.append("image", imageData);
			const response = await axiosClient.post(
				`/api/auth/image-upload?user_type=${userType}`,
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

/**
 *   ========= ChangePasswordSms ========= ///
 */
export const changePasswordSms = createAsyncThunk(
	"auth/changePasswordSms",
	async (phoneNumber, { rejectWithValue }) => {
		try {
			const response = await axiosClient.put(
				`/api/auth/check-phone-number?phone_number=${phoneNumber}`
			);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const chechkChangePasswordSms = createAsyncThunk(
	"auth/checkChangePasswordSms",
	async (code, { rejectWithValue }) => {
		try {
			const response = await axiosClient.put(`/api/auth/confirm-code?code=${code}`);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const changePassword = createAsyncThunk(
	"auth/changePassword",
	async (data, { rejectWithValue }) => {
		try {
			const response = await axiosClient.put("/api/auth/change-password", data);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.user = null;
			localStorage.removeItem("auth");
		},
		loginSucceeded: (state) => {
			state.status = "idle";
		},
		registerSucceeded: (state) => {
			state.register.status = "idle";
		},
		changePasswordSucceeded: (state) => {
			state.changePassword.status = "idle";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.status = "succeeded";
				state.error = null;
			})
			.addCase(login.pending, (state) => {
				state.status = "pending";
			})
			.addCase(login.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(register.fulfilled, (state) => {
				state.register.status = "succeeded";
				state.register.error = null;
			})
			.addCase(register.pending, (state) => {
				state.register.status = "pending";
			})
			.addCase(register.rejected, (state, action) => {
				state.register.status = "failed";
				state.register.error = action.payload;
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
			})
			.addCase(refreshToken.pending, (state) => {
				state.status = "pending";
			})
			.addCase(refreshToken.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.payload;
			})
			.addCase(sendSmsRegister.pending, (state) => {
				state.sendSmsRegister.status = "pending";
			})
			.addCase(sendSmsRegister.fulfilled, (state, action) => {
				state.sendSmsRegister.status = "succeeded";
				state.sendSmsRegister.codeVerification = action.payload;
				state.sendSmsRegister.error = null;
			})
			.addCase(sendSmsRegister.rejected, (state, action) => {
				state.sendSmsRegister.status = "failed";
				state.sendSmsRegister.error = action.payload;
			})
			.addCase(uploadImage.pending, (state) => {
				state.uploadImage.status = "pending";
			})
			.addCase(uploadImage.fulfilled, (state, action) => {
				state.uploadImage.status = "succeeded";
				state.uploadImage.imageUrl = action.payload;
				state.uploadImage.error = null;
			})
			.addCase(uploadImage.rejected, (state, action) => {
				state.uploadImage.status = "failed";
				state.uploadImage.error = action.payload;
			})
			.addCase(changePasswordSms.pending, (state) => {
				state.changePasswordSms.status = "pending";
			})
			.addCase(changePasswordSms.fulfilled, (state) => {
				state.changePasswordSms.status = "succeeded";
				state.changePasswordSms.error = null;
			})
			.addCase(changePasswordSms.rejected, (state, action) => {
				state.changePasswordSms.status = "failed";
				state.changePasswordSms.error = action.payload;
			})

			.addCase(chechkChangePasswordSms.pending, (state) => {
				state.chechkChangePasswordSms.status = "pending";
			})
			.addCase(chechkChangePasswordSms.fulfilled, (state) => {
				state.chechkChangePasswordSms.status = "succeeded";
				state.chechkChangePasswordSms.error = null;
			})
			.addCase(chechkChangePasswordSms.rejected, (state, action) => {
				state.chechkChangePasswordSms.status = "failed";
				state.chechkChangePasswordSms.error = action.payload;
			})

			.addCase(changePassword.pending, (state) => {
				state.changePassword.status = "pending";
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.changePassword.status = "succeeded";
				state.changePassword.error = null;
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.changePassword.status = "failed";
				state.changePassword.error = action.payload;
			});
	},
});

export const { logout, loginSucceeded, registerSucceeded, changePasswordSucceeded } =
	authSlice.actions;

export default authSlice.reducer;
