import { useState } from "react";
import Button from "../../../ui/Button/Button";
import ServiceCard from "../../Cards/ServiceCard/ServiceCard";
import { getServicesCategory } from "../../../../util/getServicesCategory";
import "./ConnectServiceSub.scss";
import { useDispatch } from "react-redux";
import {
	closeConnectServiceSubModal,
	openConnectSessionSubModal,
} from "../../../../redux/slices/modalSlice";
const categories = getServicesCategory();
let ServicesArr = [
	{
		imgUrl: "./Images/Rectangle1.png",
		alt: "image",
		name: "Boxing1",
		company: "GROUPTRANING",
	},
	{
		imgUrl: "./Images/Rectangle1.png",
		alt: "image",
		name: "Boxing21",
		company: "GROUPTRANING",
	},
	{
		imgUrl: "./Images/Rectangle1.png",
		alt: "image",
		name: "Boxing2",
		company: "GROUPTRANING",
	},
	{
		imgUrl: "./Images/Rectangle1.png",
		alt: "image",
		name: "Boxing3",
		company: "MASSAGE",
	},
	{
		imgUrl: "./Images/Rectangle1.png",
		alt: "image",
		name: "Boxing4",
		company: "GROUPTRANING",
	},
	{
		imgUrl: "./Images/Rectangle1.png",
		alt: "image",
		name: "Boxing4",
		company: "INDIVIDUALTRANING",
	},
	{
		imgUrl: "./Images/Rectangle1.png",
		alt: "image",
		name: "Boxing4",
		company: "CRYOTHERAPY",
	},
];
const ConnectServiceSub = () => {
	const dispatch = useDispatch();
	const [category, setCategory] = useState("GROUPTRANING");

	return (
		<div className="connectService">
			<div className="servicesCategoryButtons flex justify-between">
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
			</div>
			<div className="serviceCardBox">
				{ServicesArr.filter((item) => item.company === category).map((item, key) => (
					<ServiceCard
						classNames="SM"
						key={key}
						imgUrl={item.imgUrl}
						alt={item.name}
						name={item.name}
						company={item.company}
						onClick={() => {
							dispatch(closeConnectServiceSubModal(item));
							dispatch(
								openConnectSessionSubModal({
									serviceObj: item,
									type: "ADD",
								})
							);
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default ConnectServiceSub;
