import style from "./Title.module.scss";

const Title = ({ title, back = null }) => {
	return (
		<div className={style.title}>
			{back !== null ? (
				<button onClick={() => back()} className={style.back}>
					<svg
						width="10"
						height="20"
						viewBox="0 0 12 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M11.375 0.666992L1.625 10.667L11.375 20.667" stroke="#222222" />
					</svg>
				</button>
			) : (
				""
			)}
			<h3>{title}</h3>
		</div>
	);
};

export default Title;
