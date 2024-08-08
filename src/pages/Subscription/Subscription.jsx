import "./Subscription.scss";
import Title from "../../components/shared/Title/Title";
import SubscriptionCard from "../../components/shared/Cards/SubscriptionCard/SubscriptionCard";
import { useState } from "react";
import Button from "../../components/ui/Button/Button";
import AddSubscription from "./AddSubscription";
import { useSelector } from "react-redux";

const categories = [
	{ value: "ALL", title: "All" },
	{ value: "SILVER", title: "Silver" },
	{ value: "GOLD", title: "Gold" },
	{ value: "GOLD_PLUS", title: "Gold Plus" },
];

const Subscription = () => {
	const { allSubscriptions } = useSelector((state) => state.subscriptions);

	const [category, setCategory] = useState("ALL");
	const filteredSubscriptionArr =
		category === "OtherFilter"
			? allSubscriptions.filter((item) => item.subscription_type === "OTHER")
			: allSubscriptions;

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
						{filteredSubscriptionArr.length > 0 ? (
							filteredSubscriptionArr.map((item, key) => (
								<SubscriptionCard
									key={key}
									href={`/subscription/editSubscription/${item.id}`}
									type={"CARD"}
									name={item.name}
									price={item.price}
									imageUrl={item.img_url}
								/>
							))
						) : (
							<div className="emptyInfo">No subscriptions available</div>
						)}
					</div>
				</>
			) : (
				<AddSubscription setCategory={setCategory} key={category} category={category} />
			)}
		</div>
	);
};

export default Subscription;
