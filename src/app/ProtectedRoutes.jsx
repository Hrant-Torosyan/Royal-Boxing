import { Navigate } from "react-router-dom";
import { getUserAuth } from "../util/getAuth";

const ProtectedRoutes = ({ children, href }) => {
	const login = getUserAuth()?.accessToken;
	if (!login) {
		return <Navigate to={href} replace={true} />;
	}

	return children;
};

export default ProtectedRoutes;
