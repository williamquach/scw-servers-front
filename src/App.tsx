import { Route, Routes } from "react-router-dom";
import { ServersPage } from "./components/servers/Servers";
import { ServerDetailsPage } from "./components/servers/details/ServerDetails";
import { NewServerPage } from "./components/servers/new/NewServer";
import { NoMatch } from "./components/shared/errors/no-match";
import { Home } from "./components/Home";
import "./App.css";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/servers" element={<ServersPage />} />
			<Route path="servers/:serverId" element={<ServerDetailsPage />} />
			<Route path="servers/new" element={<NewServerPage />} />

			<Route path="*" element={<NoMatch />} />
		</Routes>
	);
}

export default App;
