import { useState } from "react";
import Load from "../../shared/Load/Load";

const _ImageUrl = import.meta.env.VITE_BASE_IMG_URL;
const defaultUser = "/Images/noUser.png";
const defaultImageUrl = "/Images/noImage.jpg";

const Image = ({ url, alt = "image", type = null }) => {
	const [loading, setLoading] = useState(true);

	const handleLoad = () => {
		setLoading(false);
	};

	const handleError = (e) => {
		e.target.onerror = null;
		setLoading(false);
		if (type === "user") {
			e.target.src = defaultUser;
		} else {
			e.target.src = defaultImageUrl;
		}
	};

	return (
		<>
			{loading && <Load type={"imageLoader"} />}
			<img
				src={`${_ImageUrl + url}`}
				alt={alt}
				className={`${loading ? "hide" : ""} `}
				onLoad={handleLoad}
				onError={handleError}
			/>
		</>
	);
};

export default Image;
