import "./Modal.scss";
const Modal = ({ children, type = null, close = null, title = null, classNames = "" }) => {
	return (
		<div className="Modal">
			{type === "SucceededModal" ? (
				<div className="modalContentSucceeded">
					<img src={"/Images/successful.png"} alt="" />
					<h3>Operation successful!</h3>
					<p>The window will close automatically.</p>
				</div>
			) : (
				<div className={`modalContent scroll ${classNames}`}>
					<div className="modalContentItem">
						<div className="modalContentHeader">
							<h4 className="modalContentTitle">{title}</h4>
							<div onClick={() => close()} className="close">
								<svg
									width="29"
									height="29"
									viewBox="0 0 29 29"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect width="29" height="29" rx="14.5" fill="white" fillOpacity="0.4" />
									<rect
										x="7"
										y="7.74414"
										width="1"
										height="19.4456"
										rx="0.5"
										transform="rotate(-45 7 7.74414)"
										fill="black"
									/>
									<rect
										x="21.2578"
										y="7"
										width="1"
										height="19.4456"
										rx="0.5"
										transform="rotate(45 21.2578 7)"
										fill="black"
									/>
								</svg>
							</div>
						</div>
						{children}
					</div>
				</div>
			)}
		</div>
	);
};

export default Modal;
