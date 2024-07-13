import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	succeededModal: {
		status: "idle",
	},
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openSucceededModal: (state) => {
			state.succeededModal.status = "open";
		},
		closeSucceededModal: (state) => {
			state.succeededModal.status = "idle";
		},
	},
});

export const { openSucceededModal, closeSucceededModal } = modalSlice.actions;

export default modalSlice.reducer;
