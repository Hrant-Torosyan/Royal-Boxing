import { useEffect, useState } from "react";
import AuthCard from "../../components/shared/Cards/AuthCard/AuthCard";
import ImageUploader from "../../components/shared/Cards/ImageUploader/ImageUploader";
import CustomDatePicker from "../../components/shared/CustomDatePicker/CustomDatePicker";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import "./AddUser.scss";
import { register, registerSucceeded, uploadImage } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../components/shared/Select/Select";
import { getRegisterUrl } from "../../util/getRegisterUrl";
import { getAddUserArr } from "../../util/getAddUserArr";
import { openSucceededModal } from "../../redux/slices/modalSlice";
const AddUser = () => {
	const state = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const [imageShow, setImageShow] = useState(null);
	const [image, setImage] = useState("");
	const [imageError, setImageError] = useState("");
	const addUserArr = getAddUserArr(state.user.roles[0]);

	const [select, setSelect] = useState(addUserArr[0]);
	const [employeeRoleName, setEmployeeRoleName] = useState("");
	const [employeeRoleNameError, setEmployeeRoleNameError] = useState("");
	const [number, setNumber] = useState("");
	const [numberError, setNumberError] = useState(null);
	const [password, setPassword] = useState("");
	const [resetPassword, setResetPassword] = useState("");
	const [passwordError, setPasswordError] = useState(null);
	const [resetPasswordError, setResetPasswordError] = useState(null);
	const [name, setName] = useState("");
	const [nameError, setNameError] = useState("");
	const [surname, setSurname] = useState("");
	const [surnameError, setSurnameError] = useState("");
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [date, setDate] = useState(null);
	const [gender, setGender] = useState(null);
	const handleFinish = (e) => {
		e.preventDefault();
		if (select === "Employee") {
			if (!employeeRoleName.trim()) {
				setEmployeeRoleNameError("Fill in this field");
				return;
			}
		}

		if (!number.trim()) {
			setNumberError("Fill in this field");
			return;
		}
		if (!password.trim()) {
			setPasswordError("Fill in this field");
			return;
		}
		if (password.trim().length < 8) {
			setPasswordError("Password must be at least 8 characters");
			return;
		}
		if (!resetPassword.trim()) {
			setResetPasswordError("Fill in this field");
			return;
		}
		if (password !== resetPassword) {
			setResetPasswordError("Password doesn't match");
			return;
		}
		if (!name.trim()) {
			setNameError("Fill in this field");
			return;
		}
		if (!surname.trim()) {
			setSurnameError("Fill in this field");
			return;
		}
		if (!email.trim()) {
			setEmailError("Fill in this field");
			return;
		}
		if (!emailRegex.test(email)) {
			setEmailError("Incorrect email format");
			return;
		}

		let url = getRegisterUrl(select);

		if (typeof image === "object") {
			dispatch(uploadImage({ imageData: image, userType: select.toUpperCase() }));
		} else {
			let username = `${name} ${surname}`;
			const userDetails = {
				username: number,
				email: email,
				full_name: username,
				password: password,
				confirm_password: resetPassword,
				phone_number: number,
			};
			if (gender) {
				userDetails.gender = gender;
			}
			if (date) {
				userDetails.date_of_birth = date;
			}

			if (select === "Employee") {
				userDetails.employee_role_name = employeeRoleName;
			}
			dispatch(
				register({
					path: url,
					userDetails: userDetails,
				})
			);
		}
	};

	useEffect(() => {
		if (state.uploadImage.status === "succeeded") {
			let url = getRegisterUrl(select);
			let username = `${name} ${surname}`;
			const userDetails = {
				username: number,
				email: email,
				full_name: username,
				password: password,
				confirm_password: resetPassword,
				phone_number: number,
				img_url: state.uploadImage.imageUrl,
			};
			if (gender) {
				userDetails.gender = gender;
			}
			if (date) {
				userDetails.date_of_birth = date;
			}
			if (select === "Employee") {
				userDetails.employee_role_name = employeeRoleName;
			}
			dispatch(
				register({
					path: url,
					userDetails: userDetails,
				})
			);
		} else if (state.uploadImage.status === "failed") {
			setImageError("Choose a photo");
		}
	}, [state.uploadImage.status]);

	useEffect(() => {
		if (state.register.status === "succeeded") {
			dispatch(registerSucceeded());
			dispatch(openSucceededModal());
			setImage("");
			setImageShow(null);
			setEmployeeRoleName("");
			setNumber("");
			setPassword("");
			setResetPassword("");
			setName("");
			setSurname("");
			setEmail("");
			setDate("");
			setGender("");
		} else if (state.register.status === "failed") {
			if (state.register.error.message === "Error: Email is already in use!") {
				setEmailError("Email is already in use!");
			} else if (state.register.error.message === "Error: Phone number is already in use!") {
				setNumberError("Phone number is already in use!");
			}
		}
	}, [state.register.status, state.register.error, dispatch]);
	return (
		<div className="addUser">
			<AuthCard
				mainTitle={"Please fill out the form to create an account."}
				handleSubmit={handleFinish}
			>
				<Select selectContent={addUserArr} select={select} setSelect={setSelect} />
				{select === "Employee" && (
					<Input
						inpVal={employeeRoleName}
						setInpVal={setEmployeeRoleName}
						type={"text"}
						title={"Employee role name"}
						placeholder={"Employee"}
						error={employeeRoleNameError}
						setError={setEmployeeRoleNameError}
					/>
				)}

				<Input
					inpVal={number}
					setInpVal={setNumber}
					type={"number"}
					title={"Telephone"}
					placeholder={"00 000 0000"}
					inpType={"phone"}
					error={numberError}
					setError={setNumberError}
				/>
				<Input
					inpVal={password}
					setInpVal={setPassword}
					type={"password"}
					title={"Password"}
					placeholder={"Password"}
					error={passwordError}
					setError={setPasswordError}
				/>
				<Input
					inpVal={resetPassword}
					setInpVal={setResetPassword}
					type={"password"}
					placeholder={"Repeat password"}
					error={resetPasswordError}
					setError={setResetPasswordError}
					inpType={"resetPass"}
				/>
				<ImageUploader
					imageError={imageError}
					setImageError={setImageError}
					setImage={setImage}
					imageUrl={image}
					imageShow={imageShow}
					setImageShow={setImageShow}
				/>
				<Input
					inpVal={name}
					setInpVal={setName}
					type={"text"}
					placeholder={"Name"}
					error={nameError}
					setError={setNameError}
				/>
				<Input
					inpVal={surname}
					setInpVal={setSurname}
					type={"text"}
					placeholder={"Surname"}
					error={surnameError}
					setError={setSurnameError}
				/>
				<Input
					inpVal={email}
					setInpVal={setEmail}
					type={"text"}
					placeholder={"E-Mail address"}
					error={emailError}
					setError={setEmailError}
				/>
				<CustomDatePicker setSelectedDate={setDate} selectedDate={date} />
				<p className="genderTitle">Choose your gender</p>
				<div className="genderBlock">
					<div
						onClick={() => setGender("MALE")}
						className={`genderInfo ${gender === "MALE" && "active"} `}
					>
						<div className="genderBlockItem">
							<svg
								width="32"
								height="48"
								viewBox="0 0 32 48"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M6.41836 9.90067C6.12545 10.1936 6.12544 10.6684 6.41833 10.9613C6.71121 11.2542 7.18608 11.2542 7.47899 10.9614L14.9673 3.4735V15.5087C14.9673 15.5198 14.9675 15.5309 14.968 15.5419C6.72892 16.0738 0.210938 22.9249 0.210938 31.2984C0.210938 40.0188 7.28022 47.088 16.0006 47.088C24.721 47.088 31.7903 40.0188 31.7903 31.2984C31.7903 22.734 24.9718 15.7622 16.4673 15.5154L16.4673 15.5087V3.50358L23.9243 10.9657C24.2171 11.2587 24.692 11.2589 24.985 10.9661C25.278 10.6733 25.2782 10.1984 24.9854 9.90541L16.3604 1.27462C16.3297 1.22374 16.2923 1.17572 16.2484 1.13179C15.9555 0.838893 15.4807 0.838879 15.1878 1.13176L6.41836 9.90067ZM16.0006 45.6334C8.08358 45.6334 1.66555 39.2154 1.66555 31.2984C1.66555 23.3813 8.08358 16.9633 16.0006 16.9633C23.9177 16.9633 30.3357 23.3813 30.3357 31.2984C30.3357 39.2154 23.9177 45.6334 16.0006 45.6334Z"
									fill="#222222"
									fillOpacity="0.74"
								/>
							</svg>
						</div>
						<p>Male</p>
					</div>
					<div
						onClick={() => setGender("FEMALE")}
						className={`genderInfo ${gender === "FEMALE" && "active"} `}
					>
						<div className="genderBlockItem">
							<svg
								width="36"
								height="54"
								viewBox="0 0 36 54"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M19.0685 36.6864C19.0685 36.6759 19.0683 36.6654 19.0679 36.655C28.4494 36.1023 35.8867 28.3192 35.8867 18.799C35.8867 8.92005 27.8783 0.911586 17.9993 0.911586C8.12036 0.911586 0.111899 8.92005 0.111899 18.799C0.111899 28.534 7.88862 36.4526 17.5686 36.6813L17.5685 36.6864L17.5685 45.527L11.3002 45.4951C10.886 45.493 10.5485 45.8271 10.5464 46.2413C10.5443 46.6555 10.8784 46.993 11.2926 46.9951L17.5685 47.0271V52.3379C17.5685 52.7521 17.9043 53.0879 18.3185 53.0879C18.7328 53.0879 19.0685 52.7521 19.0685 52.3379V47.0347L25.3414 47.0667C25.7557 47.0688 26.0931 46.7347 26.0953 46.3205C26.0974 45.9063 25.7633 45.5688 25.3491 45.5667L19.0685 45.5347L19.0685 36.6864ZM34.2389 18.799C34.2389 9.83014 26.9682 2.55945 17.9993 2.55945C9.03046 2.55945 1.75976 9.83014 1.75976 18.799C1.75976 27.7678 9.03046 35.0385 17.9993 35.0385C26.9682 35.0385 34.2389 27.7678 34.2389 18.799Z"
									fill="#222222"
									fillOpacity="0.5"
								/>
							</svg>
						</div>
						<p>Female</p>
					</div>
				</div>
				<div className={`flex-center buttonList`}>
					<Button
						darkStyle={true}
						disabled={
							state.uploadImage.status === "pending" ||
							(state.register.status === "pending" && true)
						}
						title={"Entrance"}
					/>
				</div>
			</AuthCard>
		</div>
	);
};

export default AddUser;
