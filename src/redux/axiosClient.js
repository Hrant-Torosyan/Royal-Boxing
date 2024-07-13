import axios from "axios";
import { refreshToken } from "./slices/authSlice";
import store from "./store";

const apiUrl = import.meta.env.VITE_BASE_URL;
const getToken = () => store.getState().auth.user?.accessToken;
const axiosClient = axios.create({
	baseURL: apiUrl,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

axiosClient.interceptors.request.use(async (config) => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				await store.dispatch(refreshToken());
				const token = getToken();
				originalRequest.headers.Authorization = `Bearer ${token}`;
				return axiosClient(originalRequest);
			} catch (err) {
				window.location.href = "/login";
				throw err;
			}
		}
		return Promise.reject(error);
	}
);

export default axiosClient;
