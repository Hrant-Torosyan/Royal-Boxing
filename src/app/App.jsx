import React, { Suspense } from "react";
import "../assets/styles/main.scss";
// const LayoutRoot = React.lazy(() => import("../components/Layouts/LayoutRoot"));
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
const ProtectedRoutes = React.lazy(() => import("./ProtectedRoutes"));

import Load from "../components/shared/Load/Load";
import { useSelector } from "react-redux";

const LayoutRoot = React.lazy(() => import("../components/Layouts/LayoutRoot"));
const Layout = React.lazy(() => import("../components/Layouts/Layout"));
const Welcome = React.lazy(() => import("../pages/Welcome/Welcome"));
const AddUser = React.lazy(() => import("../pages/AddUser/AddUser"));
const Services = React.lazy(() => import("../pages/Services/Services"));
const AddService = React.lazy(() => import("../pages/Services/AddService"));
const EditService = React.lazy(() => import("../pages/Services/EditService"));
const Subscription = React.lazy(() => import("../pages/Subscription/Subscription"));
const EditSubscription = React.lazy(() => import("../pages/Subscription/EditSubscription"));

const Register = React.lazy(() => import("../pages/Register/Register"));
const Login = React.lazy(() => import("../pages/Login"));
const ResetPassword = React.lazy(() => import("../pages/ResetPassword/ResetPassword"));

const App = () => {
	const userRole = useSelector((state) => state.auth.user?.roles[0]) || null;
	return (
		<Router>
			<Suspense fallback={<Load type={"mainLoader"} />}>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/resetPassword" element={<ResetPassword />} />

					<Route
						element={
							<ProtectedRoutes href={"/login"}>
								<LayoutRoot>
									<Layout />
								</LayoutRoot>
							</ProtectedRoutes>
						}
					>
						<Route path="/" element={<Welcome />} />
						{(userRole === "ROLE_ADMIN" || userRole === "ROLE_GLOBAL_ADMIN") && (
							<>
								<Route path="/addUser" element={<AddUser />} />
								<Route path="/services" element={<Services />} />
								<Route path="/services/addService/:category" element={<AddService />} />
								<Route path="/services/editService/:category" element={<EditService />} />
								<Route path="/subscription" element={<Subscription />} />
								<Route
									path="/subscription/editSubscription/:subscription"
									element={<EditSubscription />}
								/>
							</>
						)}
						<Route path="*" element={<Navigate to="/" />} />
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
