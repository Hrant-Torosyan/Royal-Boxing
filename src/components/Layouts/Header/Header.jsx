// import { useDispatch } from "react-redux";
// import { logout } from "../../../redux/slices/authSlice";
import styles from "./Header.module.scss";

const Header = () => {
	// useEffect(() => {
	// 	getProfile(user.id).then((res) => setUserData(res));
	// }, []);

	// const dispatch = useDispatch();

	// dispatch(logout());

	return (
		<>
			<header className={`flex justify-end align-center ${styles.headerWrapper}`}></header>
		</>
	);
};

export default Header;
