import { useNavigate, useParams } from "react-router-dom";
import Title from "../../components/shared/Title/Title";
import Load from "../../components/shared/Load/Load";
import { useEffect, useState } from "react";
import SubscriptionCard from "../../components/shared/Cards/SubscriptionCard/SubscriptionCard";
import Input from "../../components/ui/Input/Input";
import Select from "../../components/shared/Select/Select";
import Button from "../../components/ui/Button/Button";
import { useDispatch } from "react-redux";
import {
	openConnectServiceSubModal,
	openConnectSessionSubModal,
} from "../../redux/slices/modalSlice";
import ServiceCard from "../../components/shared/Cards/ServiceCard/ServiceCard";
import "./Subscription.scss";
const subscriptionArr = [
	{
		category: "SILVER",
		name: "Royal Pass 1",
		id: 1,
		imageUrl: "/Images/CardSub.png",
		sessions: [
			{
				imgUrl: "./Images/Rectangle1.png",
				alt: "image",
				name: "Boxing1",
				company: "GROUPTRANING",
				sessionsNumber: 220,
				sessionTime: 60,
			},
			{
				imgUrl: "./Images/Rectangle1.png",
				alt: "image",
				name: "Boxing1",
				company: "GROUPTRANING",
				sessionsNumber: 5,
				sessionTime: 30,
			},
		],
	},
	{
		category: "GOLD",
		name: "Royal Pass 2",
		id: 2,
		imageUrl: "/Images/CardSub.png",
		sessions: [
			{
				imgUrl: "./Images/Rectangle1.png",
				alt: "image",
				name: "Boxing11",
				company: "MASSAGE",
				sessionsNumber: 20,
				sessionTime: 60,
			},
			{
				imgUrl: "./Images/Rectangle1.png",
				alt: "image",
				name: "Boxing1",
				company: "GROUPTRANING",
				sessionsNumber: 5,
				sessionTime: 30,
			},
		],
	},
	{
		category: "GOLDPLUS",
		name: "Royal Pass 3",
		id: 3,
		imageUrl: "/Images/CardSub.png",
		sessions: [
			{
				imgUrl: "./Images/Rectangle1.png",
				alt: "image",
				name: "Boxing1",
				company: "GROUPTRANING",
				sessionsNumber: 20,
				sessionTime: 60,
			},
			{
				imgUrl: "./Images/Rectangle1.png",
				alt: "image",
				name: "Boxing1",
				company: "GROUPTRANING",
				sessionsNumber: 5,
				sessionTime: 30,
			},
		],
	},
	{
		category: "OTHER",
		name: "Royal Pass 4",
		id: 4,
		imageUrl: "/Images/CardSub.png",
		sessions: [
			{
				imgUrl: "./Images/Rectangle1.png",
				alt: "image",
				name: "Boxing1",
				company: "GROUPTRANING",
				sessionsNumber: 20,
				sessionTime: 60,
			},
			{
				imgUrl: "./Images/Rectangle1.png",
				alt: "image",
				name: "Boxing1",
				company: "GROUPTRANING",
				sessionsNumber: 5,
				sessionTime: 30,
			},
		],
	},
	{
		category: "OTHER",
		name: "Royal Pass 5",
		id: 5,
		imageUrl: "/Images/CardSub.png",
		sessions: [
			{
				imgUrl: "./Images/Rectangle1.png",
				alt: "image",
				name: "Boxing1",
				company: "GROUPTRANING",
				sessionsNumber: 20,
				sessionTime: 60,
			},
			{
				imgUrl: "./Images/Rectangle1.png",
				alt: "image",
				name: "Boxing1",
				company: "GROUPTRANING",
				sessionsNumber: 5,
				sessionTime: 30,
			},
		],
	},
];

const EditSubscription = () => {
	const { subscription } = useParams();
	const navigate = useNavigate();

	const [subscriptionObj, setSubscriptionObj] = useState(null);
	const [deleteInfo, setDeleteInfo] = useState(null);

	const dispatch = useDispatch();
	const [image, setImage] = useState(null);
	const [imageError, setImageError] = useState(null);

	const [name, setName] = useState(subscriptionObj?.name);
	const [nameError, setNameError] = useState("");

	const [select, setSelect] = useState("Day");
	const [selectDay, setSelectDay] = useState(1);
	const [selectDayContent, setSelectDayContent] = useState([]);

	const [price, setPrice] = useState("");
	const [priceError, setPriceError] = useState("");

	useEffect(() => {
		const foundSubscription = subscriptionArr.find((item) => item.id === Number(subscription));
		if (!foundSubscription) {
			navigate("/subscription");
		} else {
			setSubscriptionObj(foundSubscription);

			setName(foundSubscription?.name || "");
			setPrice(foundSubscription?.price || "");
			setImage(foundSubscription?.imageUrl);
		}
	}, [subscription, navigate]);

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

	if (!subscriptionObj) {
		return <Load type={"moduleLoader"} />;
	}

	const handleAddSubscription = (e) => {
		e.preventDefault();

		if (!image) {
			setImageError("Choose a photo");
			return;
		}
		if (!name.trim()) {
			setNameError("Fill in this field");
			return;
		}

		if (!price.trim()) {
			setPriceError("Fill in this field");
			return;
		}

		console.log("object");
	};

	return (
		<div className="editSubscription">
			{deleteInfo && (
				<div className="deleteInfo">
					<div className="deleteInfoItem">
						<h5>Are you sure you want to delete the session?</h5>
						<div className="deleteInfoIteBtns">
							<Button
								onClick={() => console.log("delete")}
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
			<Title back={() => navigate("/subscription")} title={`Edit ${subscriptionObj?.name}`} />
			<div className="editSubscriptionBlock">
				<form onSubmit={handleAddSubscription}>
					<SubscriptionCard
						image={image}
						setImage={setImage}
						setImageError={setImageError}
						type={"ADD"}
						style={subscriptionObj?.category}
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
					<Button
						classNames={"connectServicesBtn"}
						styleBtn="DARK"
						onClick={() => dispatch(openConnectServiceSubModal())}
						title={"+ Connect services"}
						disabled={false}
					/>
					<div className="connectServicesList">
						{subscriptionObj.sessions.map((session, key) => (
							<div key={key} className="connectServicesItem">
								<div className="connectServicesItemContent">
									<ServiceCard
										classNames="connectServicesItemService SM"
										key={key}
										imgUrl={session.imgUrl}
										alt={session.name}
										name={session.name}
										company={session.company}
									/>

									<div className="connectServicesItemContentInfo">
										<h4>{session.sessionTime}</h4>
										<p>Number of sessions</p>
									</div>
									{/* <div className="connectServicesItemContentInfo">
										<h4>{session.sessionTime}</h4>
										<p>Number of sessions</p>
									</div> */}
									<div className="connectServicesItemContentInfo">
										<h4>{session.sessionsNumber}</h4>
										<p>Session time</p>
									</div>
								</div>

								<div className="connectServicesItemBtns">
									<Button
										onClick={() => {
											console.log(session);
										}}
										styleBtn="DEL"
										disabled={false}
										type={"button"}
										title={"Delete"}
									/>
									<Button
										onClick={() => {
											dispatch(
												openConnectSessionSubModal({
													serviceObj: session,
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
				</div>
			</div>
		</div>
	);
};

export default EditSubscription;
