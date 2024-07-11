import { Provider } from "react-redux";
import { store } from "../redux/store";

const reduxStore = store();

function InitialConfigProvider({ children }) {
	return <Provider store={reduxStore}>{children}</Provider>;
}

export default InitialConfigProvider;
