import axios from "axios";
import { logout, refreshToken } from "./slices/authSlice";
import { store } from "./store";
import { getUserAuth } from "../util/getAuth";

const apiUrl = import.meta.env.VITE_BASE_URL;

const token = getUserAuth()?.accessToken;

const axiosClient = axios.create({
	baseURL: apiUrl,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

axiosClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				await store.dispatch(refreshToken());
				originalRequest.headers.Authorization = `Bearer ${token}`;
				return axiosClient(originalRequest);
			} catch (err) {
				store.dispatch(logout());
				return Promise.reject(err);
			}
		}
		return Promise.reject(error);
	}
);

export default axiosClient;
