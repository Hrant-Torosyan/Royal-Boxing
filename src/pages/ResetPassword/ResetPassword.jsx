import "../Login/Login.scss";
import AuthCard from "../../components/shared/Cards/AuthCard/AuthCard";
import Input from "../../components/ui/Input/Input";
import { useEffect, useState } from "react";
import Button from "../../components/ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
	changePassword,
	changePasswordSms,
	changePasswordSucceeded,
	chechkChangePasswordSms,
} from "../../redux/slices/authSlice";
import ResendPin from "../../components/shared/ResendPin/ResendPin";
import { useNavigate } from "react-router-dom";
import { getCounrtyCodes } from "../../util/getCounrtyCodes";
const _code = import.meta.env.VITE_BASE_CODE;

const ResetPassword = () => {
	const state = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [step, setStep] = useState(0);

	const [code, setCode] = useState("");
	const [codeError, setCodeError] = useState(null);

	const handleCode = (e) => {
		e.preventDefault();
		if (!code.trim()) {
			setCodeError("Fill in this field");
			return;
		}
		if (code !== _code) {
			setCodeError("Incorrect password, please write the correct password");
			return;
		}
		setStep(1);
	};

	const [number, setNumber] = useState("");
	const [numberError, setNumberError] = useState(null);

	const handleForm = (e) => {
		e.preventDefault();
		if (!number.trim()) {
			setNumberError("Fill in this field");
			return;
		}
		let phoneNumberInfo = getCounrtyCodes(number);
		if (number.trim().length !== phoneNumberInfo.phoneNumberLengthWithCode) {
			setNumberError(
				`Phone number must be at least ${phoneNumberInfo.phoneNumberLength} characters long`
			);
			return;
		}
		dispatch(changePasswordSms(number));
	};

	useEffect(() => {
		if (state.changePasswordSms.status === "succeeded") {
			setStep(2);
		}
		if (state.changePasswordSms.status === "failed") {
			setNumberError("Invalid Number");
		}
	}, [state.changePasswordSms.status]);

	const [inputs, setInputs] = useState(Array.from({ length: 6 }, () => ""));
	const [isInputEmpty, setIsInputEmpty] = useState(true);
	const [phoneCode, setPhoneCode] = useState("");
	const [isTrue, setIsTrue] = useState(true);

	useEffect(() => {
		setIsInputEmpty(inputs.some((input) => input === ""));
		setPhoneCode(inputs.join(""));
	}, [inputs]);
	const handlePhoneCode = (index, value) => {
		const newInputs = [...inputs];
		newInputs[index] = value;
		setInputs(newInputs);
		if (value.length === 1 && index < inputs.length - 1) {
			const nextInput = document.getElementById(`code-input-${index + 1}`);
			nextInput.focus();
		} else if (value === "" && index > 0) {
			const prevInput = document.getElementById(`code-input-${index - 1}`);
			prevInput.focus();
		}
	};
	const handlePaste = (event) => {
		const paste = event.clipboardData.getData("text");
		if (paste.length === inputs.length) {
			const newInputs = paste.split("");
			setInputs(newInputs);
			event.preventDefault();
		}
	};
	const handlePhoneForm = (e) => {
		e.preventDefault();

		dispatch(chechkChangePasswordSms(phoneCode));
	};

	useEffect(() => {
		if (state.chechkChangePasswordSms.status === "succeeded") {
			setStep(3);
		}
		if (state.chechkChangePasswordSms.status === "failed") {
			setIsTrue(false);
		}
	}, [state.chechkChangePasswordSms.status]);

	const [password, setPassword] = useState("");
	const [resetPassword, setResetPassword] = useState("");
	const [passwordError, setPasswordError] = useState(null);
	const [resetPasswordError, setResetPasswordError] = useState(null);

	const handleReset = (e) => {
		e.preventDefault();

		if (!password.trim()) {
			setPasswordError("Fill in this field");
			return;
		}
		if (password.trim().length < 8) {
			setPasswordError("Password must be at least 8 characters");
			return;
		}
		const hasNumber = /\d/;
		if (!hasNumber.test(password)) {
			setPasswordError("Password must contain at least one number");
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

		dispatch(
			changePassword({
				code: phoneCode,
				password: password,
				confirm_password: resetPassword,
			})
		);
	};

	useEffect(() => {
		if (state.changePassword.status === "succeeded") {
			dispatch(changePasswordSucceeded());
			navigate("/login");
		}
	}, [state.changePassword.status, navigate, dispatch]);

	return (
		<div className={`flex-center authStyle`}>
			{step === 0 ? (
				<AuthCard handleSubmit={handleCode}>
					<h4>Please enter 12 digit code</h4>
					<Input
						inpVal={code}
						setInpVal={setCode}
						type={"password"}
						placeholder={"************"}
						error={codeError}
						setError={setCodeError}
					/>
					<div className={`flex-center buttonList`}>
						<Button styleBtn={"DARK"} title={"Continue"} />
					</div>
				</AuthCard>
			) : step === 1 ? (
				<AuthCard mainTitle={"Restore password"} handleSubmit={handleForm}>
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

					<div className={`flex-center buttonList`}>
						<Button
							styleBtn={"DARK"}
							disabled={state.changePasswordSms.status === "pending" && true}
							title={"Continue"}
						/>
					</div>
				</AuthCard>
			) : step === 2 ? (
				<AuthCard handleSubmit={handlePhoneForm}>
					<h4>Create a 6-digit PIN code</h4>

					<div className="codeInputs">
						{inputs.map((input, index) => (
							<div key={index} className={isTrue ? "codeInput" : "codeInput error"}>
								<input
									id={`code-input-${index}`}
									type="text"
									maxLength="1"
									value={input}
									placeholder={"#"}
									onChange={(e) => handlePhoneCode(index, e.target.value)}
									onPaste={handlePaste}
								/>
								<div className="line"></div>
							</div>
						))}
					</div>
					<ResendPin sendAgin={() => dispatch(changePasswordSms(number))} />

					<div className={`flex-center buttonList`}>
						<Button
							styleBtn={"DARK"}
							disabled={
								(isInputEmpty && true) || state.chechkChangePasswordSms.status === "pending"
							}
							title={"Continue"}
						/>
					</div>
				</AuthCard>
			) : (
				<AuthCard mainTitle={"Please write a new password"} handleSubmit={handleReset}>
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
					<div className={`flex-center buttonList`}>
						<Button
							styleBtn={"DARK"}
							disabled={state.changePassword.status === "pending" && true}
							title={"Reset"}
						/>
					</div>
				</AuthCard>
			)}
		</div>
	);
};

export default ResetPassword;
