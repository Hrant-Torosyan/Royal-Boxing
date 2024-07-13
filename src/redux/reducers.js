import authReducer from "./slices/authSlice";
import modalReducer from "./slices/modalSlice";

export const reducers = {
	auth: authReducer,
	modal: modalReducer,
};
