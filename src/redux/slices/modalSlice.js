import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	succeededModal: {
		status: "idle",
	},
	addSessionsModal: {
		status: "idle",
	},
	editSessionsModal: {
		status: "idle",
		sessionObj: null,
	},
	connectServiceSubModal: {
		status: "idle",
	},
	connectSessionSubModal: {
		type: null,
		status: "idle",
		serviceObj: null,
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
		openAddSessionsModal: (state) => {
			state.addSessionsModal.status = "open";
		},
		closeAddSessionsModal: (state) => {
			state.addSessionsModal.status = "idle";
		},
		openEditSessionsModal: (state, action) => {
			state.editSessionsModal.status = "open";
			state.editSessionsModal.sessionObj = action.payload;
		},
		closeEditSessionsModal: (state) => {
			state.editSessionsModal.status = "idle";
			state.editSessionsModal.sessionObj = null;
		},
		openConnectServiceSubModal: (state) => {
			state.connectServiceSubModal.status = "open";
		},
		closeConnectServiceSubModal: (state) => {
			state.connectServiceSubModal.status = "idle";
		},
		openConnectSessionSubModal: (state, action) => {
			state.connectSessionSubModal.status = "open";
			state.connectSessionSubModal.serviceObj = action.payload.serviceObj;
			state.connectSessionSubModal.type = action.payload.type;
		},
		closeConnectSessionSubModal: (state) => {
			state.connectSessionSubModal.status = "idle";
			state.connectSessionSubModal.serviceObj = null;
			state.connectSessionSubModal.type = null;
		},
	},
});

export const {
	openSucceededModal,
	closeSucceededModal,
	openAddSessionsModal,
	closeAddSessionsModal,
	openEditSessionsModal,
	closeEditSessionsModal,
	openConnectServiceSubModal,
	closeConnectServiceSubModal,
	openConnectSessionSubModal,
	closeConnectSessionSubModal,
} = modalSlice.actions;

export default modalSlice.reducer;
