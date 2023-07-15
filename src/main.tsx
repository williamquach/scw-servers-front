import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, css, Global } from "@emotion/react";
import { theme, normalize } from "@ultraviolet/ui";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "@ultraviolet/ui";
import App from "./App";
import "./index.css";
import "./tailwind.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Global
			styles={css`
				${normalize()}
			`}
		/>
		<ThemeProvider theme={theme}>
			<ToastContainer />
			<Router>
				<App />
			</Router>
		</ThemeProvider>
	</React.StrictMode>
);
