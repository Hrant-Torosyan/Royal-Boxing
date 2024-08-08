import { useNavigate, useParams } from "react-router-dom";
import Title from "../../components/shared/Title/Title";
import Load from "../../components/shared/Load/Load";
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
import "./Subscription.scss";
import {
	deleteSubscription,
	deleteSubscriptionSession,
	deleteSubscriptionSessionSucceeded,
	deleteSubscriptionSucceeded,
	updateSubscription,
	updateSubscriptionSucceeded,
} from "../../redux/slices/subscriptionSlice";
import { customLoweCase } from "../../util/customLoweCase";
// const subscriptionArr = [
// 	{
// 		category: "GOLD_PLUS",
// 		name: "Royal Pass 3",
// 		id: 3,
// 		imageUrl: "/Images/CardSub.png",
// 		sessions: [
// 			{
// 				imgUrl: "./Images/Rectangle1.png",
// 				alt: "image",
// 				name: "Boxing1",
// 				company: "GROUPTRANING",
// 				sessionsNumber: 20,
// 				sessionTime: 60,
// 			},
// 			{
// 				imgUrl: "./Images/Rectangle1.png",
// 				alt: "image",
// 				name: "Boxing1",
// 				company: "GROUPTRANING",
// 				sessionsNumber: 5,
// 				sessionTime: 30,
// 			},
// 		],
// 	},
// ];

const EditSubscription = () => {
	const subscriptions = useSelector((state) => state.subscriptions);
	const modalStatus = useSelector((state) => state.modal.connectSessionSubModal.status);

	const { subscription } = useParams();
	const navigate = useNavigate();
	const subscriptionEdit = subscriptions.allSubscriptions.find(
		(item) => item.id === Number(subscription)
	);
	const [deleteInfo, setDeleteInfo] = useState(null);

	const dispatch = useDispatch();
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
		if (!subscriptionEdit) {
			navigate("/subscription");
		} else {
			setName(subscriptionEdit?.name);
			setImage(subscriptionEdit?.img_url);
			setPrice(subscriptionEdit?.price);
			setSelectDay(subscriptionEdit?.period_value || 1);
			setSelect(subscriptionEdit?.period_type === "MONTH" ? "Month" : "Day");
		}
	}, [subscriptionEdit, navigate]);

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

		dispatch(
			updateSubscription({
				id: subscriptionEdit.id,
				credentials: {
					img_url: image,
					name: name,
					period_value: selectDay,
					period_type: select === "Month" ? "MONTH" : "DAY",
					price: price,
					subscription_type: subscriptionEdit.subscription_type,
				},
			})
		);
	};
	useEffect(() => {
		if (subscriptions.updateSubscription.status === "succeeded" && modalStatus === "idle") {
			dispatch(updateSubscriptionSucceeded());
			dispatch(openSucceededModal());
		}
	}, [subscriptions.updateSubscription, dispatch, modalStatus]);

	useEffect(() => {
		if (subscriptions.deleteSubscription.status === "succeeded") {
			dispatch(deleteSubscriptionSucceeded());
			dispatch(openSucceededModal());
		}
	}, [subscriptions.deleteSubscription, dispatch]);

	useEffect(() => {
		if (subscriptions.deleteSubscriptionSession.status === "succeeded") {
			dispatch(deleteSubscriptionSessionSucceeded());
			dispatch(openSucceededModal());
		}
	}, [subscriptions.deleteSubscriptionSession, dispatch]);

	if (!subscriptionEdit) {
		return <Load type={"moduleLoader"} />;
	}
	return (
		<div className="editSubscription">
			{deleteInfo && (
				<div className="deleteInfo">
					<div className="deleteInfoItem">
						<h5>Are you sure you want to delete the session?</h5>
						<div className="deleteInfoIteBtns">
							<Button
								onClick={() => dispatch(deleteSubscription(subscriptionEdit.id))}
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
			<Title back={() => navigate("/subscription")} title={`Edit ${subscriptionEdit?.name}`} />
			<div className="editSubscriptionBlock">
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
							disabled={false}
							type={"button"}
							title={"Delete"}
						/>
						<Button
							onClick={() => {
								navigate("/subscription");
							}}
							styleBtn="LIGHT"
							disabled={false}
							type={"button"}
							title={"Cancel"}
						/>

						<Button styleBtn="DARK" title={"Save"} disabled={false} />
					</div>
				</form>
				<div className="connectServices">
					{/* {console.log(subscriptionEdit)} */}

					<Button
						classNames={"connectServicesBtn"}
						styleBtn="DARK"
						onClick={() => dispatch(openConnectServiceSubModal(subscriptionEdit))}
						title={"+ Connect services"}
						disabled={false}
					/>
					{subscriptionEdit?.services ? (
						<div className="connectServicesList">
							{subscriptionEdit?.services.map((service, key) => (
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
														subscriptionId: subscriptionEdit.id,
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
														subscriptionId: subscriptionEdit.id,
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
		</div>
	);
};

export default EditSubscription;
