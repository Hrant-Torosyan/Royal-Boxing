import { useEffect, useState } from "react";
import "./EditSessionsModal.scss";
import Input from "../../../ui/Input/Input";
import CustomDatePicker from "../../CustomDatePicker/CustomDatePicker";
import Button from "../../../ui/Button/Button";
import Select from "../../../shared/Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { closeEditSessionsModal } from "../../../../redux/slices/modalSlice";
import {
	deleteSession,
	deleteSessionSucceeded,
	updateSession,
	updateSessionSucceeded,
} from "../../../../redux/slices/servicesSlice";
import { useParams } from "react-router-dom";

const EditSessionsModal = ({ sessionObj }) => {
	const dispatch = useDispatch();
	const { category } = useParams();
	const services = useSelector((state) => state.services);

	const [deleteInfo, setDeleteInfo] = useState(false);

	const [name, setName] = useState(sessionObj.name);
	const [nameError, setNameError] = useState("");

	const [session, setSession] = useState(sessionObj.sessions_count);
	const [sessionError, setSessionError] = useState("");
	const [validity, setValidity] = useState(sessionObj.validity);
	const [validityError, setValidityError] = useState("");

	const [view, setView] = useState(sessionObj.viev);
	const [viewError, setViewError] = useState("");

	const matches = sessionObj.session_times.split(" ");
	const [sessionTimes, setSessionTimes] = useState(matches[0]);
	const [sessionTimesError, setSessionTimesError] = useState("");
	const [sessionTimesInfo, setSessionTimesInfo] = useState(matches[1]);

	const [bonus, setBonus] = useState(sessionObj.royals);
	const [bonusError, setBonusError] = useState("");

	const [price, setPrice] = useState(sessionObj.price);
	const [priceError, setPriceError] = useState("");

	const handleEditSession = (e) => {
		e.preventDefault();

		if (!name.toString().trim()) {
			setNameError("Fill in this field");
			return;
		}

		if (!session.toString().trim()) {
			setSessionError("Fill in this field");
			return;
		}

		if (!validity.toString().trim()) {
			setValidityError("Fill in this field");
			return;
		}

		if (!view.toString().trim()) {
			setViewError("Fill in this field");
			return;
		}

		if (!sessionTimes.toString().trim()) {
			setSessionTimesError("Fill in this field");
			return;
		}

		if (!bonus.toString().trim()) {
			setBonusError("Fill in this field");
			return;
		}
		if (!price.toString().trim()) {
			setPriceError("Fill in this field");
			return;
		}
		dispatch(
			updateSession({
				serviceID: category,
				id: sessionObj.id,
				credentials: {
					name: name,
					sessions_count: session,
					viev: view,
					validity: validity,
					session_times: `${sessionTimes} ${sessionTimesInfo}`,
					royals: bonus,
					price: price,
				},
			})
		);
	};

	useEffect(() => {
		if (services.updateSession.status === "succeeded") {
			dispatch(updateSessionSucceeded());
			dispatch(closeEditSessionsModal());
		}
	}, [services.updateSession, dispatch]);

	useEffect(() => {
		if (services.deleteSession.status === "succeeded") {
			dispatch(deleteSessionSucceeded());
			dispatch(closeEditSessionsModal());
		}
	}, [services.deleteSession, dispatch]);

	return (
		<>
			{deleteInfo && (
				<div className="deleteInfo">
					<div className="deleteInfoItem">
						<h5>Are you sure you want to delete the session?</h5>
						<div className="deleteInfoIteBtns">
							<Button
								onClick={() =>
									dispatch(
										deleteSession({ sessionID: sessionObj.id, serviceID: category })
									)
								}
								styleBtn={"DEL"}
								disabled={false}
								title={"Delete"}
								type={"button"}
							/>
							<Button
								onClick={() => setDeleteInfo(false)}
								styleBtn={"LIGHT"}
								disabled={false}
								type={"button"}
								title={"Cancel"}
							/>
						</div>
					</div>
				</div>
			)}
			<form className="editSessionsModal" onSubmit={handleEditSession}>
				<Input
					inpVal={name}
					setInpVal={setName}
					type={"text"}
					title={"Name"}
					placeholder={"Name"}
					error={nameError}
					setError={setNameError}
					dark={true}
				/>
				<Input
					inpVal={session}
					setInpVal={setSession}
					type={"text"}
					title={"Session"}
					placeholder={"Session"}
					error={sessionError}
					setError={setSessionError}
					dark={true}
				/>
				<CustomDatePicker
					dark={true}
					setSelectedDate={setValidity}
					selectedDate={validity}
					setSelectedDateError={setValidityError}
					selectedDateError={validityError}
					title={"Validity"}
				/>

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
				<div className="timeBlock">
					<Input
						inpVal={sessionTimes}
						setInpVal={setSessionTimes}
						type={"number"}
						title={"Session times"}
						placeholder={sessionTimesInfo}
						error={sessionTimesError}
						setError={setSessionTimesError}
						dark={true}
					/>

					<Select
						styleType="DARK"
						select={sessionTimesInfo}
						setSelect={setSessionTimesInfo}
						selectContent={["Seconds", "Minute", "Hour"]}
					/>
				</div>

				<Input
					inpVal={bonus}
					setInpVal={setBonus}
					type={"number"}
					title={"Bonus ( Royals )"}
					placeholder={"Bonus"}
					error={bonusError}
					setError={setBonusError}
					dark={true}
				/>

				<Input
					inpVal={price}
					setInpVal={setPrice}
					type={"number"}
					title={"Price"}
					placeholder={"Price"}
					error={priceError}
					setError={setPriceError}
					dark={true}
				/>
				<div className="buttonBox">
					<Button
						onClick={() => setDeleteInfo(true)}
						styleBtn={"DEL"}
						disabled={false}
						type={"button"}
						title={"Delete"}
					/>
					<Button
						styleBtn={"DARK"}
						disabled={services.updateSession.status === "pending"}
						title={"Save"}
					/>
				</div>
			</form>
		</>
	);
};

export default EditSessionsModal;
