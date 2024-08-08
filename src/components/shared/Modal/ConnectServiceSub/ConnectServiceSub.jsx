import { useState } from "react";
import Button from "../../../ui/Button/Button";
import ServiceCard from "../../Cards/ServiceCard/ServiceCard";
import { getServicesCategory } from "../../../../util/getServicesCategory";
import { customLoweCase } from "../../../../util/customLoweCase";
import "./ConnectServiceSub.scss";
import { useDispatch, useSelector } from "react-redux";
import {
	closeConnectServiceSubModal,
	openConnectSessionSubModal,
} from "../../../../redux/slices/modalSlice";
const categories = getServicesCategory();

const ConnectServiceSub = ({ subscriptionObj }) => {
	const { allServices } = useSelector((state) => state.services);
	const [category, setCategory] = useState("GROUP_TRAINING");

	const connectedServices = subscriptionObj?.services
		? subscriptionObj.services.map((item) => item.id)
		: [];
	const filteredData = allServices
		.filter((item) => !connectedServices.includes(item.id))
		.filter((item) => item.services_type === category);

	const dispatch = useDispatch();

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
				{filteredData.map((item, key) => (
					<ServiceCard
						classNames="SM"
						key={key}
						imgUrl={item?.images && item?.images[0]?.img_url}
						name={item.name}
						company={item?.services_type && customLoweCase(item?.services_type)}
						onClick={() => {
							dispatch(closeConnectServiceSubModal(item));
							dispatch(
								openConnectSessionSubModal({
									serviceObj: item,
									subscriptionId: subscriptionObj.id,
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
