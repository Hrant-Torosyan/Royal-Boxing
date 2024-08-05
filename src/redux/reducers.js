import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice";
import servicesSlice from "./slices/servicesSlice";
import subscriptionSlice from "./slices/subscriptionSlice";

export const reducers = {
	auth: authReducer,
	modal: modalReducer,
	services: servicesSlice,
	subscriptions: subscriptionSlice,
};
