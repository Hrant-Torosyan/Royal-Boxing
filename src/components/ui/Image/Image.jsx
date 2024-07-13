const _ImageUrl = import.meta.env.VITE_BASE_IMG_URL;
const defaultImageUrl = "./Images/user.png";
const Image = ({ url, alt = "image" }) => {
	return (
		<img
			src={`${url ? _ImageUrl + url : defaultImageUrl}`}
			alt={alt}
			onError={(e) => {
				e.target.onerror = null;
				e.target.src = defaultImageUrl;
			}}
		/>
	);
};

export default Image;
