import { useState, useEffect } from "react";
import "./ResendPin.scss";

const ResendPin = ({ sendAgin }) => {
	const [seconds, setSeconds] = useState(60);
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		let intervalId;
		if (seconds > 0) {
			intervalId = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds - 1);
			}, 1000);
		} else {
			setIsActive(true);
		}

		return () => clearInterval(intervalId);
	}, [seconds]);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
	};

	const handleResendClick = () => {
		if (isActive) {
			sendAgin();
			setSeconds(60);
			setIsActive(false);
		}
	};

	return (
		<div className="resendPin">
			<p className={isActive ? "active" : ""} onClick={handleResendClick}>
				Resend PIN code
			</p>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="12" cy="12" r="8" fill="#7E869E" fillOpacity="0.25" />
				<path
					d="M12 7V11.75C12 11.8881 12 12 12.25 12H15"
					stroke="#222222"
					strokeLinecap="round"
				/>
			</svg>
			<h3>{formatTime(seconds)}</h3>
		</div>
	);
};

export default ResendPin;
