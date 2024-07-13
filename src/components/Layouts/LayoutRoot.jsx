import { Suspense } from "react";
import Load from "../shared/Load/Load";
import ModalRoot from "./ModalRoot";

const LayoutRoot = ({ children }) => {
	return (
		<>
			<ModalRoot />
			<Suspense fallback={<Load type={"mainLoader"} />}>{children}</Suspense>
		</>
	);
};

export default LayoutRoot;
