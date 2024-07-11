// import React from "react";
import style from "./AuthCard.module.scss";
const AuthCard = ({ handleSubmit, children, title, mainTitle }) => {
	return (
		<form onSubmit={handleSubmit} className={style.cardStyle}>
			<h1>{mainTitle}</h1>
			<h2>{title}</h2>
			{children}
		</form>
	);
};

export default AuthCard;
