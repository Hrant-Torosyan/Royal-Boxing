import "./Login.scss";
import { login, loginSucceeded } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthCard from "../../components/shared/Cards/AuthCard/AuthCard";
import Input from "../../components/ui/Input/Input";
import { useEffect, useState } from "react";
import Button from "../../components/ui/Button/Button";
import { NavLink, useNavigate } from "react-router-dom";
const Login = () => {
	const { status } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [phone, setPhone] = useState("");
	const [phoneError, setPhoneError] = useState(null);
	const [password, setPassword] = useState("");
	const [passwordError, setPasswordError] = useState(null);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!phone.trim()) {
			setPhoneError("Fill in this field");
			return;
		}
		if (!password.trim()) {
			setPasswordError("Fill in this field");
			return;
		}
		dispatch(login({ username: phone, password: password }));
	};

	useEffect(() => {
		if (status === "succeeded") {
			navigate("/");
			dispatch(loginSucceeded());
		}
		if (status === "failed") {
			setPhoneError("This phone number does not exist");
			setPasswordError("Incorrect password, please write the correct password");
		}
	}, [status, navigate, dispatch]);

	return (
		<div className={`flex-center authStyle`}>
			<AuthCard handleSubmit={handleSubmit} title={"Log in"} mainTitle={"Royal Box&FIt"}>
				<Input
					inpVal={phone}
					setInpVal={setPhone}
					type={"number"}
					title={"Telephone"}
					placeholder={"00 000 0000"}
					inpType={"phone"}
					error={phoneError}
					setError={setPhoneError}
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
				<div className="resetPass">
					<NavLink to={"/resetPassword"}>Restore password</NavLink>
				</div>
				<div className={`flex-center buttons`}>
					<Button href={"/register"} darkStyle={true} title={"Registration"} />
					<Button disabled={status === "pending" && true} title={"Log in"} />
				</div>
			</AuthCard>
		</div>
	);
};

export default Login;
