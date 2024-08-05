import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	closeAddSessionsModal,
	closeConnectServiceSubModal,
	closeConnectSessionSubModal,
	closeEditSessionsModal,
	closeSucceededModal,
} from "../../redux/slices/modalSlice";
import Load from "../shared/Load/Load";
import ConnectServiceSub from "../shared/Modal/ConnectServiceSub/ConnectServiceSub";
import ConnectSessionsSub from "../shared/Modal/ConnectSessionsSub/ConnectSessionsSub";
const Modal = lazy(() => import("../shared/Modal/Modal"));
const AddSessionsModal = lazy(() => import("../shared/Modal/AddSessionsModal/AddSessionsModal"));
const EditSessionsModal = lazy(() => import("../shared/Modal/EditSessionsModal/EditSessionsModal"));

const ModalRoot = () => {
	const modalState = useSelector((state) => state.modal);
	const dispatch = useDispatch();
	useEffect(() => {
		let timer = null;
		if (modalState.succeededModal.status === "open") {
			timer = setTimeout(() => {
				dispatch(closeSucceededModal());
			}, 5000);
		} else {
			clearTimeout(timer);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [modalState.succeededModal.status, dispatch]);
	return (
		<Suspense fallback={<Load type={"modalLoader"} />}>
			{modalState.succeededModal.status === "open" && <Modal type="SucceededModal" />}
			{modalState.addSessionsModal.status === "open" && (
				<Modal close={() => dispatch(closeAddSessionsModal())} title={"Add Sessions"}>
					<AddSessionsModal />
				</Modal>
			)}
			{modalState.editSessionsModal.status === "open" && (
				<Modal close={() => dispatch(closeEditSessionsModal())} title={"Edit Sessions"}>
					<EditSessionsModal sessionObj={modalState.editSessionsModal.sessionObj} />
				</Modal>
			)}
			{modalState.connectServiceSubModal.status === "open" && (
				<Modal
					classNames={"SM"}
					close={() => dispatch(closeConnectServiceSubModal())}
					title={"Please select the service that should be included in the subscription"}
				>
					<ConnectServiceSub />
				</Modal>
			)}
			{modalState.connectSessionSubModal.status === "open" && (
				<Modal
					close={() => dispatch(closeConnectSessionSubModal())}
					title={`${
						modalState.connectSessionSubModal.type === "ADD" ? "Add" : "Edit"
					} Sessions`}
				>
					<ConnectSessionsSub
						type={modalState.connectSessionSubModal.type}
						serviceObj={modalState.connectSessionSubModal.serviceObj}
					/>
				</Modal>
			)}
		</Suspense>
	);
};

export default ModalRoot;
