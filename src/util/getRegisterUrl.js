export const getRegisterUrl = (info) => {
	if (info === "Admin") {
		return "/global-admin/signup-admin";
	} else if (info === "Employee") {
		return "/global-admin/signup-employee";
	} else if (info === "Trainer") {
		return "/global-admin/signup-trainer";
	} else if (info === "Reception") {
		return "/admins/reception";
	}
};
