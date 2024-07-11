import { Suspense } from "react";
// import ModalRoot from "./ModalRoot";

const LayoutRoot = ({ children }) => {
	return (
		<>
			{/* <ModalRoot /> */}
			<Suspense fallback={<div>Layout Root Loader</div>}>{children}</Suspense>
		</>
	);
};

export default LayoutRoot;
