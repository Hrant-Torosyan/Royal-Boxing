import { NavLink } from "react-router-dom";
import style from "./Button.module.scss";
const Button = ({
	styleBtn,
	title,
	href = null,
	disabled = false,
	unActive = null,
	onClick = null,
	type = "submit",
	classNames = "",
}) => {
	const handleClick = () => {
		if (onClick && !disabled && unActive !== false) onClick();
	};
	return (
		<div
			{...(!disabled && onClick ? { onClick: handleClick } : {})}
			className={`${style.buttonStyle} ${
				styleBtn === "DARK"
					? style.dark
					: styleBtn === "LIGHT"
					? style.light
					: styleBtn === "DEL"
					? style.del
					: ""
			} ${unActive === false ? style.noHover : ""} ${disabled ? style.dis : ""} ${classNames}`}
		>
			{href ? (
				<NavLink to={href}>{title}</NavLink>
			) : (
				<button type={type} disabled={disabled}>
					{title}
				</button>
			)}
		</div>
	);
};

export default Button;
