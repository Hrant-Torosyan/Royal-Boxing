import { Provider } from "react-redux";
import store from "../redux/store";

function InitialConfigProvider({ children }) {
	return <Provider store={store}>{children}</Provider>;
}

export default InitialConfigProvider;
