import { Container } from "@mui/material";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ProtectedPage from "./components/ProtectedPage.jsx";

import "./App.css"; // Import custom styles

/**
 * Main App component that sets up the layout for the application.
 *
 * @returns {JSX.Element} The rendered component.
 */
const App = () => {
	return (
		<div className="App">
			<Container maxWidth="lg">
				<Header />
				<ProtectedPage />
				<Footer />
			</Container>
		</div>
	);
};

export default App;
