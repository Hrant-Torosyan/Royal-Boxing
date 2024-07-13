import "./Modal.scss";
const Modal = ({ children, type = null }) => {
	return (
		<div className="Modal">
			{type === "SucceededModal" ? (
				<div className="modalContentSucceeded">
					<img src={"./Images/successful.png"} alt="" />
					<h3>Operation successful!</h3>
					<p>The window will close automatically.</p>
				</div>
			) : (
				<div className="modalContent">{children}</div>
			)}
		</div>
	);
};

export default Modal;
