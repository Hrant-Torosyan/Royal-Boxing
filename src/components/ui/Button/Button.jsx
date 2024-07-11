import { NavLink } from "react-router-dom";
import style from "./Button.module.scss";
const Button = ({ href = null, disabled = false, darkStyle, title }) => {
	return (
		<div
			className={`${style.buttonStyle} ${darkStyle ? style.dark : ""} ${
				disabled ? style.dis : ""
			}`}
		>
			{href ? (
				<NavLink to={href}>{title}</NavLink>
			) : (
				<button disabled={disabled}>{title}</button>
			)}
		</div>
	);
};

export default Button;
