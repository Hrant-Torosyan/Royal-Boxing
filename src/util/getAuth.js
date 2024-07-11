export const getUserAuth = () => {
	const userAuthJSON = localStorage.getItem("auth");
	return userAuthJSON ? JSON.parse(userAuthJSON) : null;
};
