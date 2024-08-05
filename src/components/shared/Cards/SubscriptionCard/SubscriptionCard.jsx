import { useNavigate } from "react-router-dom";
import "./SubscriptionCard.scss";
import { useState } from "react";
const SubscriptionCard = ({
	type = null,
	image = null,
	setImage = null,
	setImageError = null,
	href = null,
	name = null,
	imageUrl = null,
}) => {
	const navigate = useNavigate();
	const [imageShow, setImageShow] = useState(null);
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
		<div className="subscriptionCardbox">
			{type === "CARD" ? (
				<>
					<div className="subscriptionCardboxTitle">
						<h5>{name}</h5>
						<div onClick={() => navigate(href)} className="edit">
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 25"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M17.2067 11.2957L19.0027 9.4997C19.548 8.95445 19.8206 8.68182 19.9663 8.38773C20.2436 7.82818 20.2436 7.17122 19.9663 6.61167C19.8206 6.31757 19.548 6.04495 19.0027 5.4997C18.4575 4.95445 18.1848 4.68182 17.8907 4.53609C17.3312 4.2588 16.6742 4.2588 16.1147 4.53609C15.8206 4.68182 15.548 4.95445 15.0027 5.4997L13.184 7.31835C14.1479 8.96895 15.5341 10.3445 17.2067 11.2957ZM11.7296 8.77281L4.85908 15.6433C4.43402 16.0684 4.22149 16.2809 4.08176 16.542C3.94202 16.8031 3.88308 17.0978 3.76519 17.6873L3.14979 20.7643C3.08327 21.0969 3.05001 21.2632 3.14461 21.3578C3.23922 21.4524 3.40553 21.4191 3.73814 21.3526L6.81512 20.7372C7.40457 20.6193 7.6993 20.5604 7.96039 20.4206C8.22149 20.2809 8.43402 20.0684 8.85908 19.6433L15.7485 12.7539C14.1268 11.7383 12.7551 10.376 11.7296 8.77281Z"
									fill="#222222"
								></path>
							</svg>
						</div>
					</div>
					<div className={`subscriptionCard `}>
						<img src={imageUrl} alt="" />

						<div className="subscriptionCardInfo">
							<div className="contentItem">
								<h4 className="contentItemTitle">
									Actively <span>7 days</span>
								</h4>
								<p className="contentItemInfo">
									<span>1</span> Small group training
								</p>
								<p className="contentItemInfo">
									<span>1</span> Small group training
								</p>
								<p className="contentItemInfo">
									<span>1</span> Small group training
								</p>
							</div>
							<div className="subscriptionCardBtn">
								<p>399 AED</p>
							</div>
						</div>
					</div>
				</>
			) : (
				<div className={`subscriptionCard`}>
					<div className="subscriptionImageUpload">
						{(imageShow || image) && (
							<img src={imageShow ? imageShow : image} alt="Preview" />
						)}
						<label>
							<div className={`subscriptionImageUploadFon ${imageShow ? "active" : ""}`}>
								<img src="/Images/addPhoto.png" alt="Add Photo" />
							</div>
							<input type="file" accept="image/*" onChange={handleImageChange} />
						</label>
					</div>
				</div>
			)}
		</div>
	);
};

export default SubscriptionCard;
