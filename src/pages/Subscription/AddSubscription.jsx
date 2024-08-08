import { useEffect, useState } from "react";
import SubscriptionCard from "../../components/shared/Cards/SubscriptionCard/SubscriptionCard";
import Input from "../../components/ui/Input/Input";
import Select from "../../components/shared/Select/Select";
import Button from "../../components/ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
	openConnectServiceSubModal,
	openConnectSessionSubModal,
	openSucceededModal,
} from "../../redux/slices/modalSlice";
import ServiceCard from "../../components/shared/Cards/ServiceCard/ServiceCard";
import {
	createSubscription,
	createSubscriptionSucceeded,
	deleteSubscription,
	deleteSubscriptionSession,
	deleteSubscriptionSessionSucceeded,
	deleteSubscriptionSucceeded,
	getSubscriptions,
	updateSubscription,
	updateSubscriptionSucceeded,
} from "../../redux/slices/subscriptionSlice";
import { customLoweCase } from "../../util/customLoweCase";

const AddSubscription = ({ category, setCategory }) => {
	const subscriptions = useSelector((state) => state.subscriptions);

	const modalStatus = useSelector((state) => state.modal.connectSessionSubModal.status);
	const [nameOther, setNameOther] = useState("");
	let subscriptionObj =
		category !== "OTHER"
			? subscriptions.allSubscriptions.find((item) => item.subscription_type === category)
			: subscriptions.allSubscriptions.find((item) => item.name === nameOther);
	const dispatch = useDispatch();

	const [deleteInfo, setDeleteInfo] = useState(null);

	const [image, setImage] = useState(null);
	const [imageError, setImageError] = useState(null);

	const [name, setName] = useState("");
	const [nameError, setNameError] = useState("");

	const [select, setSelect] = useState("Day");
	const [selectDay, setSelectDay] = useState(1);
	const [selectDayContent, setSelectDayContent] = useState([]);

	const [price, setPrice] = useState("");
	const [priceError, setPriceError] = useState("");

	useEffect(() => {
		let content = [];
		if (select === "Day") {
			content = Array.from({ length: 31 }, (_, i) => i + 1);
		} else if (select === "Month") {
			content = Array.from({ length: 12 }, (_, i) => i + 1);
		}
		setSelectDayContent(content);

		if (content.indexOf(selectDay) < 0) {
			setSelectDay(1);
		}
	}, [select]);
	useEffect(() => {
		if (subscriptionObj) {
			setName(subscriptionObj?.name);
			setImage(subscriptionObj?.img_url);
			setPrice(subscriptionObj?.price);
			setSelectDay(subscriptionObj?.period_value || 1);
			setSelect(subscriptionObj?.period_type === "MONTH" ? "Month" : "Day");
		} else {
			setName("");
			setImage(null);
			setPrice("");
			setSelectDay(1);
			setSelect("Day");
		}
	}, [subscriptionObj]);

	const handleAddSubscription = (e) => {
		e.preventDefault();

		if (!image) {
			setImageError("Choose a photo");
			return;
		}
		if (!name.toString().trim()) {
			setNameError("Fill in this field");
			return;
		}

		if (!price.toString().trim()) {
			setPriceError("Fill in this field");
			return;
		}

		let credentials = {
			img_url: image,
			name: name,
			period_value: selectDay,
			period_type: select === "Month" ? "MONTH" : "DAY",
			price: price,
			subscription_type: category,
		};

		setNameOther(name);

		if (subscriptionObj) {
			dispatch(
				updateSubscription({
					id: subscriptionObj.id,
					credentials: credentials,
				})
			);
		} else {
			dispatch(createSubscription(credentials));
		}
	};
	useEffect(() => {
		if (subscriptions.createSubscription.status === "succeeded") {
			dispatch(createSubscriptionSucceeded());
			dispatch(getSubscriptions());
		}
	}, [dispatch, subscriptions.createSubscription.status]);

	useEffect(() => {
		if (subscriptions.deleteSubscription.status === "succeeded") {
			dispatch(deleteSubscriptionSucceeded());
			dispatch(openSucceededModal());
			setDeleteInfo(false);
		}
	}, [subscriptions.deleteSubscription, dispatch]);

	useEffect(() => {
		if (subscriptions.updateSubscription.status === "succeeded" && modalStatus === "idle") {
			dispatch(updateSubscriptionSucceeded());
			dispatch(openSucceededModal());
		}
	}, [subscriptions.updateSubscription, dispatch, modalStatus]);

	useEffect(() => {
		if (subscriptions.deleteSubscriptionSession.status === "succeeded") {
			dispatch(deleteSubscriptionSessionSucceeded());
			dispatch(openSucceededModal());
		}
	}, [subscriptions.deleteSubscriptionSession, dispatch]);

	return (
		<>
			{deleteInfo && (
				<div className="deleteInfo">
					<div className="deleteInfoItem">
						<h5>Are you sure you want to delete the session?</h5>
						<div className="deleteInfoIteBtns">
							<Button
								onClick={() => dispatch(deleteSubscription(subscriptionObj.id))}
								styleBtn={"DEL"}
								disabled={subscriptions.deleteSubscription.status === "pending"}
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
			<div className="addSubscription">
				<form onSubmit={handleAddSubscription}>
					<SubscriptionCard
						image={image}
						setImage={setImage}
						setImageError={setImageError}
						type={"ADD"}
					/>
					<h3 className="errorText">{imageError && imageError}</h3>
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
					<div className="addSubscriptionPeriod">
						<h3>Period</h3>
						<div className="flex justify-between">
							<Select
								styleType="DARK"
								select={selectDay}
								setSelect={setSelectDay}
								selectContent={selectDayContent}
							/>
							<Select
								styleType="DARK"
								select={select}
								setSelect={setSelect}
								selectContent={["Day", "Month"]}
							/>
						</div>
					</div>

					<Input
						inpVal={price}
						setInpVal={setPrice}
						type={"number"}
						title={"Price (AED)"}
						placeholder={"Price"}
						error={priceError}
						setError={setPriceError}
						dark={true}
					/>
					<div className="buttonList">
						<Button
							onClick={() => {
								setDeleteInfo(true);
							}}
							styleBtn="DEL"
							disabled={!subscriptionObj}
							type={"button"}
							title={"Delete"}
						/>
						<Button
							onClick={() => {
								if (category === "OTHER") {
									setCategory("OtherFilter");
								} else {
									setCategory("ALL");
								}
							}}
							styleBtn="LIGHT"
							disabled={false}
							type={"button"}
							title={"Cancel"}
						/>
						<Button
							styleBtn="DARK"
							title={"Save"}
							disabled={subscriptions.createSubscription.status === "pending"}
						/>
					</div>
				</form>
				<div className="connectServices">
					<Button
						classNames={"connectServicesBtn"}
						styleBtn="DARK"
						onClick={() => dispatch(openConnectServiceSubModal(subscriptionObj))}
						title={"+ Connect services"}
						disabled={!subscriptionObj}
					/>
					{subscriptionObj?.services ? (
						<div className="connectServicesList">
							{subscriptionObj?.services.map((service, key) => (
								<div key={key} className="connectServicesItem">
									<div className="connectServicesItemContent">
										<ServiceCard
											classNames="connectServicesItemService SM"
											key={key}
											name={service.name}
											imgUrl={service?.images && service?.images[0]?.img_url}
											company={
												service?.services_type && customLoweCase(service?.services_type)
											}
										/>

										<div className="connectServicesItemContentInfo">
											<h4>{service.session.sessions_count}</h4>
											<p>Number of sessions</p>
										</div>

										{service.session.viev && (
											<div className="connectServicesItemContentInfo">
												<h4>{service.session.viev}</h4>
												<p>Viev</p>
											</div>
										)}

										<div className="connectServicesItemContentInfo">
											<h4>{service.session.session_times} Min</h4>
											<p>Session time</p>
										</div>
									</div>

									<div className="connectServicesItemBtns">
										<Button
											onClick={() => {
												dispatch(
													deleteSubscriptionSession({
														subscriptionId: subscriptionObj.id,
														serviceId: service.id,
													})
												);
											}}
											styleBtn="DEL"
											disabled={
												subscriptions.deleteSubscriptionSession.status === "pending"
											}
											type={"button"}
											title={"Delete"}
										/>
										<Button
											onClick={() => {
												dispatch(
													openConnectSessionSubModal({
														subscriptionId: subscriptionObj.id,
														serviceObj: service,
														type: "EDIT",
													})
												);
											}}
											styleBtn="LIGHT"
											disabled={false}
											type={"button"}
											title={"Edit"}
										/>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="emptyInfo">No services available</div>
					)}
				</div>
			</div>
		</>
	);
};

export default AddSubscription;
