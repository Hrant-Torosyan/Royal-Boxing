import "./ImageUploader.scss";
function ImageUploader({ setImage, imageError, setImageError, imageShow, setImageShow }) {
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > 10 * 1024 * 1024) {
				setImageError("The file size must not exceed 10 MB.");
			} else {
				setImageError(null);
				const reader = new FileReader();
				reader.onloadend = () => {
					setImageShow(reader.result);
					setImage(file);
				};
				reader.readAsDataURL(file);
			}
		}
	};

	return (
		<div className="imageUploadBlock">
			<div className="imageUpload">
				<img src={imageShow ? imageShow : "./Images/user.png"} alt="Preview" />
				<label>
					<div className="fon"></div>
					<input type="file" accept="image/*" onChange={handleImageChange} />
				</label>
			</div>
			<h5 className={imageError ? "errorText" : ""}>{imageError ? imageError : "Add Photo"}</h5>
		</div>
	);
}

export default ImageUploader;
