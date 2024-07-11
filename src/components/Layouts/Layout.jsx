import { Outlet } from "react-router";
import { Suspense } from "react";
import Navigation from "./Navigation/Navigation";
import "./Layout.scss";
// import Header from "./Header/Header";

const Layout = () => {
	return (
		<div className="mainContent">
			<aside>
				<Navigation />
			</aside>
			{/* <Header /> */}
			<main className="scroll">
				<Suspense fallback={<div>Module Loader</div>}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
};

export default Layout;
