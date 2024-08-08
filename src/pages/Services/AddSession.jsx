import { useDispatch } from "react-redux";
import Button from "../../components/ui/Button/Button";
import { openAddSessionsModal, openEditSessionsModal } from "../../redux/slices/modalSlice";
import SessionsCard from "../../components/shared/Cards/SessionsCard/SessionsCard";

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
				{serviceSessions.length > 0 ? (
					serviceSessions.map((item, key) => (
						<SessionsCard
							key={key}
							onClick={() => dispatch(openEditSessionsModal(item))}
							name={item.name}
							sessionsCount={item.sessions_count}
							viev={item.viev}
							validity={item.validity}
							sessionTimes={item.session_times}
							royals={item.royals}
							price={item.price}
						/>
					))
				) : (
					<div className="emptyInfo">No sessions available</div>
				)}
			</div>
		</div>
	);
};

export default AddSession;
