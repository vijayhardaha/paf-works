import * as React from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";

// Get the root element from the DOM
const rootElement = document.getElementById("root");
// Create a root for rendering the app
const root = createRoot(rootElement);

root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			{/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>
);
