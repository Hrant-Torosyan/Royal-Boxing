import ReactDOM from "react-dom/client";
import App from "./app/App";
import InitialConfigProvider from "./providers/InitialConfigProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<InitialConfigProvider>
		<App />
	</InitialConfigProvider>
);
