import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider, css, Global } from "@emotion/react";
import { theme, normalize } from "@ultraviolet/ui";
import { ToastContainer } from "@ultraviolet/ui";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ServersPage } from "./components/servers/Servers";
import App from "./App";
import { ServerDetailsPage } from "./components/servers/details/ServerDetails";
import "./tailwind.css";
import { NewServerPage } from "./components/servers/new/NewServer";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/servers",
		element: <ServersPage />,
	},
	{
		path: "/servers/:serverId",
		element: <ServerDetailsPage />,
	},
	{
		path: "/servers/new",
		element: <NewServerPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Global
			styles={css`
				${normalize()}
			`}
		/>
		<ThemeProvider theme={theme}>
			<ToastContainer />
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>
);
