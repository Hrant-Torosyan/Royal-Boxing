import { Navigate } from "react-router-dom";
import { getUserAuth } from "../util/getAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getServices } from "../redux/slices/servicesSlice";
import { getSubscriptions } from "../redux/slices/subscriptionSlice";

const ProtectedRoutes = ({ children, href }) => {
	const state = useSelector((state) => state);

	const dispatch = useDispatch();
	const login = getUserAuth()?.accessToken;

	useEffect(() => {
		if (login) {
			dispatch(getServices());
			dispatch(getSubscriptions());
		}
	}, [dispatch, login]);

	if (!login) {
		return <Navigate to={href} replace={true} />;
	}

	if (state.services.status === "succeeded" && state.subscriptions.status === "succeeded") {
		return children;
	}
};

export default ProtectedRoutes;
