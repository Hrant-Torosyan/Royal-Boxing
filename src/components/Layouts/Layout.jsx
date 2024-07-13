import React, { Suspense } from "react";

import { Outlet } from "react-router";

const Navigation = React.lazy(() => import("./Navigation/Navigation"));

import "./Layout.scss";
import Load from "../shared/Load/Load";

const Layout = () => {
	return (
		<div className="mainContent">
			<aside>
				<Navigation />
			</aside>
			<main className="scroll">
				<Suspense fallback={<Load type={"moduleLoader"} />}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
};

export default Layout;
