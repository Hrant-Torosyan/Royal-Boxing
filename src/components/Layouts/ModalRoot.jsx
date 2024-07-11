import { lazy, Suspense } from "react";
import { useContext } from "react";

import { ModalContext } from "../../contexts/ModalContext";
const Modal = lazy(() => import("../../common/Modal/Modal"));

const ModalRoot = () => {
	const { isModalOpened, handleModal, modalContent } = useContext(ModalContext);

	return (
		<Suspense>{isModalOpened && <Modal onClose={handleModal}>{modalContent}</Modal>}</Suspense>
	);
};

export default ModalRoot;
