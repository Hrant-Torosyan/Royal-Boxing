// import { Navigate } from "react-router-dom";
// import { getUserAuth } from "../util/getAuth";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getServices } from "../redux/slices/servicesSlice";
// import { getSubscriptions } from "../redux/slices/subscriptionSlice";

// const ProtectedRoutes = ({ children, href }) => {
// 	const serviceState = useSelector((state) => state.services.status);
// 	const subscriptionsState = useSelector((state) => state.subscriptions.status);

// 	const dispatch = useDispatch();
// 	const login = getUserAuth()?.accessToken;

// 	useEffect(() => {
// 		if (login) {
// 			dispatch(getServices());
// 			dispatch(getSubscriptions());
// 		}
// 	}, [dispatch, login]);

// 	if (!login) {
// 		return <Navigate to={href} replace={true} />;
// 	}

// 	if (serviceState !== "failed" && subscriptionsState !== "failed") {
// 		return children;
// 	}
// };

// export default ProtectedRoutes;
import { Navigate } from "react-router-dom";
import { getUserAuth } from "../util/getAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getServices } from "../redux/slices/servicesSlice";
import { getSubscriptions } from "../redux/slices/subscriptionSlice";
import Load from "../components/shared/Load/Load";

const ProtectedRoutes = ({ children, href }) => {
	const serviceState = useSelector((state) => state.services.status);
	const subscriptionsState = useSelector((state) => state.subscriptions.status);

	const [isServicesLoaded, setIsServicesLoaded] = useState(false);
	const [isSubscriptionsLoaded, setIsSubscriptionsLoaded] = useState(false);

	const dispatch = useDispatch();
	const login = getUserAuth()?.accessToken;

	useEffect(() => {
		if (login) {
			dispatch(getServices());
			dispatch(getSubscriptions());
		}
	}, [dispatch, login]);

	useEffect(() => {
		if (serviceState === "succeeded" || serviceState === "failed") {
			setIsServicesLoaded(true);
		}
	}, [serviceState]);

	useEffect(() => {
		if (subscriptionsState === "succeeded" || subscriptionsState === "failed") {
			setIsSubscriptionsLoaded(true);
		}
	}, [subscriptionsState]);

	if (!login) {
		return <Navigate to={href} replace={true} />;
	}

	if (isServicesLoaded && isSubscriptionsLoaded) {
		return children;
	}

	return <Load type={"mainLoader"} />; // Или любой другой индикатор загрузки
};

export default ProtectedRoutes;
