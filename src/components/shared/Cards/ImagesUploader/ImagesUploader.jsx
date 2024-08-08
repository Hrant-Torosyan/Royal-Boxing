// import "./ImagesUploader.scss";
// const ImagesUploader = ({ setImagesError, imagesError, images, setImages }) => {
// 	const handleImageChange = (e) => {
// 		setImagesError(null);
// 		const files = Array.from(e.target.files);
// 		const newImages = files.map((file) => URL.createObjectURL(file));
// 		setImages((prevImages) => [...prevImages, ...newImages]);
// 	};

// 	const handleRemoveImage = (index) => {
// 		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
// 	};

// 	return (
// 		<div className="imagesUploader">
// 			<input type="file" accept="image/*" onChange={handleImageChange} id="imageUpload" />
// 			<div className="imagesUploader">
// 				<label htmlFor="imageUpload">
// 					<div className="imagesUploaderAdd">
// 						<img src="../../Images/addPhoto.png" alt="" />
// 					</div>
// 				</label>

// 				{images.map((image, index) => (
// 					<div key={index} className="imagesUploaderShow">
// 						<img src={image} alt={`uploaded ${index}`} />
// 						<div onClick={() => handleRemoveImage(index)} className="imagesUploaderDel">
// 							<img src="../../Images/trash.png" alt="" />
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 			{imagesError && <p className="errorText">{imagesError}</p>}
// 		</div>
// 	);
// };

// export default ImagesUploader;
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ImagesUploader.scss";
import {
	deleteServiceImage,
	deleteServiceImageSucceeded,
	uploadServiceImage,
	uploadServiceImageSucceeded,
} from "../../../../redux/slices/servicesSlice";
import Image from "../../../ui/Image/Image";

const ImagesUploader = ({ setImagesError, imagesError, images, setImages }) => {
	const dispatch = useDispatch();
	const { status, uploadedServiceImageUrl } = useSelector(
		(state) => state.services.uploadServiceImage
	);
	const deleteServiceImageStatus = useSelector(
		(state) => state.services.deleteServiceImage.status
	);
	const handleImageChange = (e) => {
		setImagesError(null);
		const file = e.target.files[0];
		if (file) {
			if (file.size > 10 * 1024 * 1024) {
				setImagesError("The file size must not exceed 10 MB.");
			} else {
				dispatch(uploadServiceImage(file));
			}
		}
	};

	const handleRemoveImage = (index, id) => {
		if (id) {
			dispatch(deleteServiceImage(id));
		}
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	};

	useEffect(() => {
		if (deleteServiceImageStatus === "succeeded") {
			dispatch(deleteServiceImageSucceeded());
		}
	}, [deleteServiceImageStatus, dispatch]);

	useEffect(() => {
		if (status === "failed") {
			setImagesError("Error loading image");
		} else if (status === "succeeded" && uploadedServiceImageUrl) {
			setImages((prevImages) => [...prevImages, { img_url: uploadedServiceImageUrl }]);
			dispatch(uploadServiceImageSucceeded());
		}
	}, [status, uploadedServiceImageUrl, setImages, setImagesError, dispatch]);

	return (
		<div className="imagesUploader">
			<input type="file" accept="image/*" onChange={handleImageChange} id="imageUpload" />
			<div className="imagesUploader">
				<label htmlFor="imageUpload">
					<div className="imagesUploaderAdd">
						<img src="../../Images/addPhoto.png" alt="" />
					</div>
				</label>

				{images.map((image, index) => (
					<div key={index} className="imagesUploaderShow">
						<Image url={image.img_url} alt={`uploaded`} />

						<div
							onClick={() => handleRemoveImage(index, image.id)}
							className="imagesUploaderDel"
						>
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
