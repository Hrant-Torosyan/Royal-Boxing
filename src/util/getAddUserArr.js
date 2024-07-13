let addUserArr = ["Admin", "Employee", "Trainer", "Reception"];

export const getAddUserArr = (role) => {
	// ROLE_USER,
	// ROLE_GLOBAL_ADMIN,
	// ROLE_ADMIN,
	// ROLE_TRAINER,
	// ROLE_EMPLOYEE,
	// ROLE_RECEPTION,
	// ROLE_OTHER

	if (role === "ROLE_ADMIN") {
		return addUserArr.filter((item) => item !== "Admin");
	} else if (role === "ROLE_GLOBAL_ADMIN") {
		return addUserArr;
	} else {
		return [];
	}
};
