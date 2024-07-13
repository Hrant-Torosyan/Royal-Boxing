import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSucceededModal } from "../../redux/slices/modalSlice";
import Load from "../shared/Load/Load";
const Modal = lazy(() => import("../shared/Modal/Modal"));

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
		</Suspense>
	);
};

export default ModalRoot;
