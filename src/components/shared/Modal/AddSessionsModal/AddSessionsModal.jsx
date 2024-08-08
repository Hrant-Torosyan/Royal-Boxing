import { useEffect, useState } from "react";
import "./AddSessionsModal.scss";
import Input from "../../../ui/Input/Input";
import CustomDatePicker from "../../CustomDatePicker/CustomDatePicker";
import Button from "../../../ui/Button/Button";
import Select from "../../../shared/Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { updateService, updateServiceSucceeded } from "../../../../redux/slices/servicesSlice";
import { closeAddSessionsModal } from "../../../../redux/slices/modalSlice";
import { useParams } from "react-router-dom";
const AddSessionsModal = () => {
	const services = useSelector((state) => state.services);
	const { category } = useParams();

	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [nameError, setNameError] = useState("");

	const [session, setSession] = useState("");
	const [sessionError, setSessionError] = useState("");

	const [validity, setValidity] = useState("");
	const [validityError, setValidityError] = useState("");

	const [view, setView] = useState("");
	const [viewError, setViewError] = useState("");

	const [sessionTimes, setSessionTimes] = useState("");
	const [sessionTimesError, setSessionTimesError] = useState("");
	const [sessionTimesInfo, setSessionTimesInfo] = useState("Minute");

	const [bonus, setBonus] = useState("");
	const [bonusError, setBonusError] = useState("");

	const [price, setPrice] = useState("");
	const [priceError, setPriceError] = useState("");

	const handleAddSession = (e) => {
		e.preventDefault();

		if (!name.trim()) {
			setNameError("Fill in this field");
			return;
		}

		if (!session.trim()) {
			setSessionError("Fill in this field");
			return;
		}

		if (!validity.trim()) {
			setValidityError("Fill in this field");
			return;
		}

		if (!view.trim()) {
			setViewError("Fill in this field");
			return;
		}

		if (!sessionTimes.trim()) {
			setSessionTimesError("Fill in this field");
			return;
		}

		if (!bonus.trim()) {
			setBonusError("Fill in this field");
			return;
		}
		if (!price.trim()) {
			setPriceError("Fill in this field");
			return;
		}

		dispatch(
			updateService({
				id: category,
				sessions: [
					{
						name: name,
						sessions_count: session,
						viev: view,
						validity: validity,
						session_times: `${sessionTimes} ${sessionTimesInfo}`,
						royals: bonus,
						price: price,
					},
				],
			})
		);
	};

	useEffect(() => {
		if (services.updateService.status === "succeeded") {
			dispatch(updateServiceSucceeded());
			dispatch(closeAddSessionsModal());
		}
	}, [services.updateService, dispatch]);

	
	return (
		<form className="addSessionsModal" onSubmit={handleAddSession}>
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
				type={"number"}
				title={"Session count"}
				placeholder={"Session count"}
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
					styleBtn={"DARK"}
					disabled={services.updateService.status === "pending"}
					title={"Save"}
				/>
			</div>
		</form>
	);
};

export default AddSessionsModal;
