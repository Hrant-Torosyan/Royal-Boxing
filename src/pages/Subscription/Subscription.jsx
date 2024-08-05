import "./Subscription.scss";
import Title from "../../components/shared/Title/Title";
import SubscriptionCard from "../../components/shared/Cards/SubscriptionCard/SubscriptionCard";
import { useState } from "react";
import Button from "../../components/ui/Button/Button";
import AddSubscription from "./AddSubscription";

const categories = [
	{ value: "ALL", title: "All" },
	{ value: "SILVER", title: "Silver" },
	{ value: "GOLD", title: "Gold" },
	{ value: "GOLD_PLUS", title: "Gold Plus" },
];

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
		category: "GOLD_PLUS",
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

const Subscription = () => {
	const [category, setCategory] = useState("ALL");
	const filteredSubscriptionArr =
		category === "OtherFilter"
			? subscriptionArr.filter((item) => item.category === "OTHER")
			: subscriptionArr;
	return (
		<div className="subscription">
			<Title title={"Subscription"} />
			<div className="subscriptionCategoryButtons">
				{categories.map((cat) => (
					<Button
						key={cat.value}
						onClick={() => setCategory(cat.value)}
						unActive={category !== cat.value}
						styleBtn={category !== cat.value ? "LIGHT" : "DARK"}
						disabled={false}
						title={cat.title}
					/>
				))}
				<Button
					onClick={() => setCategory("OtherFilter")}
					unActive={category !== "OtherFilter"}
					styleBtn={category === "OtherFilter" || category === "OTHER" ? "DARK" : "LIGHT"}
					disabled={false}
					title={"Other"}
				/>
			</div>
			{category === "ALL" || category === "OtherFilter" ? (
				<>
					{category === "OtherFilter" && (
						<Button
							onClick={() => setCategory("OTHER")}
							styleBtn={"DARK"}
							disabled={false}
							title={"+Add"}
						/>
					)}
					<div className="subscriptionContainer">
						{filteredSubscriptionArr.map((item, key) => (
							<SubscriptionCard
								key={key}
								href={`/subscription/editSubscription/${item.id}`}
								type={"CARD"}
								name={item.name}
								imageUrl={item.imageUrl}
							/>
						))}
					</div>
				</>
			) : (
				<AddSubscription
					subscriptionObj={
						category !== "OTHER" && subscriptionArr.find((item) => item.category === category)
					}
					setCategory={setCategory}
					key={category}
					category={category}
				/>
			)}
		</div>
	);
};

export default Subscription;
