import "./ConnectSessionsSub.scss";
import ServiceCard from "../../Cards/ServiceCard/ServiceCard";
import Input from "../../../ui/Input/Input";
import { useState } from "react";
import Button from "../../../ui/Button/Button";
import { closeConnectSessionSubModal } from "../../../../redux/slices/modalSlice";
import { useDispatch } from "react-redux";

const ConnectSessionsSub = ({ type, serviceObj }) => {
	console.log(type);
	const dispatch = useDispatch();
	const [session, setSession] = useState("");
	const [sessionError, setSessionError] = useState("");

	const [view, setView] = useState("");
	const [viewError, setViewError] = useState("");

	const [sessionTime, setSessionTime] = useState("");
	const [sessionTimeError, setSessionTimeError] = useState("");

	const handleConnectSession = (e) => {
		e.preventDefault();

		if (!session.trim()) {
			setSessionError("Fill in this field");
			return;
		}

		if (
			(serviceObj.company === "MASSAGE" || serviceObj.company === "CRYOTHERAPY") &&
			!view.trim()
		) {
			setViewError("Fill in this field");
			return;
		}

		if (!sessionTime.trim()) {
			setSessionTimeError("Fill in this field");
			return;
		}

		console.log("object");
	};
	return (
		<div className="connectSessionsSub">
			<form onSubmit={handleConnectSession}>
				<ServiceCard
					classNames="SM"
					imgUrl={serviceObj.imgUrl}
					alt={serviceObj.alt}
					name={serviceObj.name}
					company={serviceObj.company}
				/>
				<Input
					inpVal={session}
					setInpVal={setSession}
					type={"text"}
					title={"Number of sessions"}
					placeholder={"Sessions"}
					error={sessionError}
					setError={setSessionError}
					dark={true}
				/>
				{(serviceObj.company === "MASSAGE" || serviceObj.company === "CRYOTHERAPY") && (
					<Input
						inpVal={view}
						setInpVal={setView}
						type={"text"}
						title={"View"}
						placeholder={"Personal"}
						error={viewError}
						setError={setViewError}
						dark={true}
					/>
				)}

				<Input
					inpVal={sessionTime}
					setInpVal={setSessionTime}
					type={"number"}
					title={"Session time"}
					placeholder={"0"}
					error={sessionTimeError}
					setError={setSessionTimeError}
					dark={true}
				/>

				<div className="connectSessionsSubBtns">
					<Button
						styleBtn="LIGHT"
						type="button"
						onClick={() => dispatch(closeConnectSessionSubModal())}
						title={"Cancel"}
						disabled={false}
					/>
					<Button styleBtn="DARK" title={"Save"} disabled={false} />
				</div>
			</form>
		</div>
	);
};

export default ConnectSessionsSub;
