import "./ImagesUploader.scss";
const ImagesUploader = ({ setImagesError, imagesError, images, setImages }) => {
	const handleImageChange = (e) => {
		setImagesError(null);
		const files = Array.from(e.target.files);
		const newImages = files.map((file) => URL.createObjectURL(file));
		setImages((prevImages) => [...prevImages, ...newImages]);
	};

	const handleRemoveImage = (index) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	return (
		<div className="imagesUploader">
			<input
				type="file"
				accept="image/*"
				multiple
				onChange={handleImageChange}
				id="imageUpload"
			/>
			<div className="imagesUploader">
				<label htmlFor="imageUpload">
					<div className="imagesUploaderAdd">
						<img src="../../Images/addPhoto.png" alt="" />
					</div>
				</label>

				{images.map((image, index) => (
					<div key={index} className="imagesUploaderShow">
						<img src={image} alt={`uploaded ${index}`} />
						<div onClick={() => handleRemoveImage(index)} className="imagesUploaderDel">
							<img src="../../Images/trash.png" alt="" />
						</div>
					</div>
				))}
			</div>
			{imagesError && <p className="errorText">{imagesError}</p>}
		</div>
	);
};

export default ImagesUploader;
