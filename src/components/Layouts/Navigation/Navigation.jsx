import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.scss";
import { logout } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Navigation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		navigate("/login");
	};
	// const location = useLocation();

	// const handleSelectMutableContent = (href) => {
	// 	navigate(href);
	// };

	// const logout = async () => {
	// 	localStorage.removeItem("userAuth");
	// 	window.location.href = "/login";
	// };

	// const btnArr = useMemo(
	// 	() => [
	// 		{ icon: <InvestorIcon />, title: "База инвесторов", href: "/investors" },
	// 		{ icon: <ProjectsIcon />, title: "Проекты", href: "/projects" },
	// 		{ icon: <PaymentsIcon />, title: "Выплаты", href: "/payments" },
	// 		{ icon: <AccessIcon />, title: "Доступ", href: "/access" },
	// 		{ icon: <NotificationIcon />, title: "Уведомление", href: "/notification" },
	// 	],
	// 	[]
	// );

	return (
		<nav className={`flex flex-column`}>
			<ul>
				<li>
					<NavLink to={"./"}>AddAdmin</NavLink>
				</li>
				<li>
					<NavLink to={"./addTrainer"}>AddAdmin</NavLink>
				</li>
				<li onClick={handleLogout}>
					<p>asdas</p>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
