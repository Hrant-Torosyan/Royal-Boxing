import "./ConnectSessionsSub.scss";
import ServiceCard from "../../Cards/ServiceCard/ServiceCard";
import Input from "../../../ui/Input/Input";
import { useEffect, useState } from "react";
import Button from "../../../ui/Button/Button";
import { closeConnectSessionSubModal } from "../../../../redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { customLoweCase } from "../../../../util/customLoweCase";
import {
	updateSubscription,
	updateSubscriptionSession,
	updateSubscriptionSessionSucceeded,
	updateSubscriptionSucceeded,
} from "../../../../redux/slices/subscriptionSlice";

const ConnectSessionsSub = ({ type, serviceObj, subscriptionId }) => {
	const subscriptions = useSelector((state) => state.subscriptions);
	const dispatch = useDispatch();
	const [session, setSession] = useState("");
	const [sessionError, setSessionError] = useState("");
	const [view, setView] = useState("");
	const [viewError, setViewError] = useState("");

	const [sessionTime, setSessionTime] = useState("");
	const [sessionTimeError, setSessionTimeError] = useState("");

	useEffect(() => {
		if (type === "EDIT") {
			setSession(serviceObj.session.sessions_count);
			setSessionTime(serviceObj.session.session_times);
			if (serviceObj.session.viev) {
				setView(serviceObj.session.viev);
			}
		}
	}, [type, serviceObj.session]);

	const handleConnectSession = (e) => {
		e.preventDefault();

		if (!session.toString().trim()) {
			setSessionError("Fill in this field");
			return;
		}

		if (
			(serviceObj.services_type === "MASSAGE" || serviceObj.services_type === "CRYOTHERAPY") &&
			!view.toString().trim()
		) {
			setViewError("Fill in this field");
			return;
		}

		if (!sessionTime.toString().trim()) {
			setSessionTimeError("Fill in this field");
			return;
		}

		let credentials = {
			service_id: serviceObj.id,
			number_of_sessions: session,
			session_time: sessionTime,
		};

		if (view) {
			credentials.viev = view;
		}

		if (type === "ADD") {
			dispatch(
				updateSubscription({
					id: subscriptionId,
					credentials: credentials,
				})
			);
		} else {
			let credentialsEdit = {
				sessions_count: session,
				session_times: sessionTime,
			};
			if (view) {
				credentialsEdit.viev = view;
			}
			dispatch(
				updateSubscriptionSession({
					subscriptionId: subscriptionId,
					serviceId: serviceObj.id,
					id: serviceObj.session.id,
					credentials: credentialsEdit,
				})
			);
		}
	};

	useEffect(() => {
		if (subscriptions.updateSubscription.status === "succeeded") {
			dispatch(updateSubscriptionSucceeded());
			dispatch(closeConnectSessionSubModal());
		}
	}, [subscriptions.updateSubscription, dispatch]);

	useEffect(() => {
		if (subscriptions.updateSubscriptionSession.status === "succeeded") {
			dispatch(updateSubscriptionSessionSucceeded());
			dispatch(closeConnectSessionSubModal());
		}
	}, [subscriptions.updateSubscriptionSession, dispatch]);

	return (
		<div className="connectSessionsSub">
			<form onSubmit={handleConnectSession}>
				<ServiceCard
					classNames="SM"
					imgUrl={serviceObj?.images && serviceObj?.images[0]?.img_url}
					company={serviceObj?.services_type && customLoweCase(serviceObj?.services_type)}
					name={serviceObj.name}
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
				{(serviceObj.services_type === "MASSAGE" ||
					serviceObj.services_type === "CRYOTHERAPY") && (
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
					title={"Session time (minutes)"}
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
					<Button
						styleBtn="DARK"
						title={"Save"}
						disabled={
							subscriptions.updateSubscriptionSession.status === "pending" ||
							subscriptions.updateSubscription.status === "pending"
						}
					/>
				</div>
			</form>
		</div>
	);
};

export default ConnectSessionsSub;
