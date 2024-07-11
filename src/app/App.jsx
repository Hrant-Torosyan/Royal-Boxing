import React, { Suspense } from "react";
import "../assets/styles/main.scss";
// const LayoutRoot = React.lazy(() => import("../components/Layouts/LayoutRoot"));
const Layout = React.lazy(() => import("../components/Layouts/Layout"));
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Load from "../components/shared/Load/Load";

import AddAdmin from "../pages/AddAdmin/AddAdmin";
import AddTrainer from "../pages/AddTrainer/AddTrainer";

const Register = React.lazy(() => import("../pages/Register/Register"));
const Login = React.lazy(() => import("../pages/Login"));
const ResetPassword = React.lazy(() => import("../pages/ResetPassword/ResetPassword"));

const App = () => {
	return (
		<Router>
			<Suspense fallback={<Load />}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/resetPassword" element={<ResetPassword />} />

					<Route
						element={
							<ProtectedRoutes href={"/login"}>
								{/* <LayoutRoot> */}
								<Layout />
								{/* </LayoutRoot> */}
							</ProtectedRoutes>
						}
					>
						<Route path="/" element={<AddAdmin />} />
						<Route path="/addTrainer" element={<AddTrainer />} />
					</Route>
				</Routes>
			</Suspense>
		</Router>
	);
};

export default App;
{
	/* <Route
// 					element={
// 						<ProtectedRoutes href={"/login"}>
// 							<LayoutRoot>
// 								<Layout showHeader={false} />
// 							</LayoutRoot>
// 						</ProtectedRoutes>
// 					}
// 				>
// 					<Route path="/prod" element={<Navigate to={"/"} />} />
// 				</Route> */
}
