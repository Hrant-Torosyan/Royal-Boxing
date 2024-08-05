import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.scss";
import { logout } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import Image from "../../ui/Image/Image";

const Navigation = () => {
	const userState = useSelector((state) => state.auth.user);
	// console.log(userState);
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

	const formattedRole = useMemo(
		() => userState.roles[0].replace("ROLE_", "").replace(/_/g, " "),
		[userState.roles]
	);

	const btnArr = useMemo(() => {
		const buttons = [{ title: "Welcome", href: "/" }];
		if (userState.roles.includes("ROLE_ADMIN") || userState.roles.includes("ROLE_GLOBAL_ADMIN")) {
			buttons.push(
				{ title: "Add user", href: "/addUser" },
				{ title: "Offer", href: "/offer" },
				{ title: "Trainer", href: "/trainer" },
				{ title: "Services", href: "/services" },
				{ title: "Subscription", href: "/subscription" },
				{ title: "Shop", href: "/shop" },
				{ title: "Royal shop", href: "/royalShop" },
				{ title: "Caffe", href: "/caffe" }
			);
		}
		return buttons;
	}, [userState.roles]);

	return (
		<nav className={`flex flex-column`}>
			<div>
				<h1 className="navLogo">Royal Box&Fit</h1>
				<div className="userInfo">
					<h3>{formattedRole}</h3>
					<Image type={"user"} url={userState.imgUrl} alt={userState.fullName + " image"} />
					<p>{userState.fullName}</p>
				</div>
				<ul>
					{btnArr.map((item, key) => (
						<li key={key}>
							<NavLink to={item.href}>{item.title}</NavLink>
						</li>
					))}
				</ul>
			</div>

			<div className="logout" onClick={handleLogout}>
				<p>Log out</p>
			</div>
		</nav>
	);
};

export default Navigation;
