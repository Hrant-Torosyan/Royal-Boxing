import { useState } from "react";
import "./Select.scss";

const Select = ({ selectContent, select, setSelect }) => {
	const [openSelect, setOpenSelect] = useState(false);
	return (
		<div
			onClick={() => setOpenSelect(!openSelect)}
			className={`${openSelect ? "openSelectAnimation" : "closeSelectAnimation"} select`}
		>
			<p>{select}</p>
			<div className="angle">
				<svg
					width="9"
					height="9"
					viewBox="0 0 6 5"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M2.13398 4.5C2.51888 5.16667 3.48113 5.16667 3.86603 4.5L5.59808 1.5C5.98298 0.833333 5.50185 0 4.73205 0H1.26795C0.498148 0 0.0170237 0.833333 0.401924 1.5L2.13398 4.5Z"
						fill="#222222"
					/>
				</svg>
			</div>
			<div className="selectMenu scroll">
				{selectContent.map((item, key) => (
					<div
						onClick={() => setSelect(item)}
						key={key}
						className={`selectMenuItem ${item === select ? "active" : ""}`}
					>
						{item}
					</div>
				))}
			</div>
		</div>
	);
};

export default Select;
