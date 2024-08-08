import { useState } from "react";
import Title from "../../components/shared/Title/Title";
import Button from "../../components/ui/Button/Button";
import "./Services.scss";
import ServiceCard from "../../components/shared/Cards/ServiceCard/ServiceCard";
import { getServicesCategory } from "../../util/getServicesCategory";
import { useSelector } from "react-redux";
import { customLoweCase } from "../../util/customLoweCase";
const categories = getServicesCategory();

const Services = () => {
	const { allServices } = useSelector((state) => state.services);

	const [category, setCategory] = useState("GROUP_TRAINING");
	return (
		<div className="services">
			<Title title={"Services"} />
			<div className="servicesCategory">
				<div className="servicesCategoryButtons">
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
				<Button
					href={`/services/addService/${category}`}
					styleBtn="DARK"
					disabled={false}
					title={"+Add"}
				/>
			</div>
			<div className="serviceCardBox">
				{allServices.length > 0 ? (
					allServices.map((item, key) => (
						<ServiceCard
							key={key}
							imgUrl={item?.images && item?.images[0]?.img_url}
							name={item.name}
							company={item?.services_type && customLoweCase(item?.services_type)}
							href={`/services/editService/${item.id}`}
							id={item.id}
						/>
					))
				) : (
					<div className="emptyInfo">No services available</div>
				)}
			</div>
		</div>
	);
};

export default Services;
