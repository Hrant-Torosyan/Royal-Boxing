import { useDispatch } from "react-redux";
import Button from "../../components/ui/Button/Button";
import { openAddSessionsModal, openEditSessionsModal } from "../../redux/slices/modalSlice";

const AddSession = ({ serviceSessions }) => {
	const dispatch = useDispatch();

	return (
		<div className="addSession">
			<Button
				onClick={() => dispatch(openAddSessionsModal())}
				styleBtn="DARK"
				title={"+Add Sessions"}
				disabled={false}
			/>
			<div className="sessionsBlcok">
				{serviceSessions.map((item, key) => (
					<div key={key} className="sessionItem">
						<div className="sessionItemHeader">
							<h4 className="title">{item.name}</h4>
							<div onClick={() => dispatch(openEditSessionsModal(item))} className="edit">
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
									/>
								</svg>
							</div>
						</div>
						<div className="sessionItemContent">
							<div className="sessionItemContentList">
								<div className="sessionItemContentItem">
									<h5>{item.sessions_count}</h5>
									<p>Session</p>
								</div>
								<div className="sessionItemContentItem">
									<h5>{item.viev}</h5>
									<p>View</p>
								</div>
								<div className="sessionItemContentItem">
									<h5>{item.validity}</h5>
									<p>Validity</p>
								</div>
							</div>
							<div className="sessionItemContentList">
								<div className="sessionItemContentItem">
									<h5>{item.session_times}</h5>
									<p>Session Times</p>
								</div>
								<div className="sessionItemContentItem">
									<h5>{item.royals}</h5>
									<p>Bonus (ROYALS)</p>
								</div>
								<div className="sessionItemContentItem">
									<h5>{item.price} AED</h5>
									<p>Price</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AddSession;
