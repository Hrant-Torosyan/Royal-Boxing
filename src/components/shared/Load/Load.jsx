import "./Load.scss";
const Load = ({ type }) => {
	if (type === "mainLoader") {
		return (
			<div id="mainLoader">
				<img
					src="https://i.pinimg.com/originals/59/99/43/5999437a8324f521f60c2f33eb1ed370.gif"
					alt="PreLoader"
				/>
			</div>
		);
	} else if (type === "moduleLoader") {
		return (
			<div id="moduleLoader">
				<img
					src="https://cdn-images-1.medium.com/max/691/1*JWRrHmGBM_DxatdKk6qBnA.gif"
					alt="PreLoader"
				/>
			</div>
		);
	} else if (type === "modalLoader") {
		return <div id="modalLoader">modalLoader</div>;
	}
};

export default Load;
