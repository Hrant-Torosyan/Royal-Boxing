import { useNavigate } from "react-router-dom";
import Image from "../../../ui/Image/Image";
import "./ServiceCard.scss";
const ServiceCard = ({ href = null, imgUrl, name, company, classNames, onClick = null }) => {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => {
				if (href === null) {
					onClick();
				} else if (onClick === null) {
					navigate(href);
				}
			}}
			className={`serviceCard ${classNames} ${
				href === null && onClick === null ? "unActive" : ""
			}`}
		>
			<div className="serviceCardImg">
				<Image url={imgUrl} alt={`Service ${name}`} />
			</div>
			<div className="serviceCardInfo">
				<h5>{name}</h5>
				<p>{company}</p>
			</div>
		</div>
	);
};

export default ServiceCard;
