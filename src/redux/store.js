import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";

export const store = () => {
	return configureStore({
		reducer: reducers,
		devTools: import.meta.env.NODE_ENV !== "production",
	});
};
