import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Alert, Checkbox, FormControlLabel, InputBase } from "@mui/material";
import { Typography, Box, IconButton, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import ErrorIcon from "@mui/icons-material/Error";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import VolunteerTable from "./VolunteerTable";

/**
 * ProtectedPage component that handles authentication and displays
 * the volunteer table if authenticated.
 *
 * @returns {JSX.Element} The rendered component.
 */
const ProtectedPage = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");

	// Check authentication status from cookies on component mount
	useEffect(() => {
		const authCookie = Cookies.get("auth");
		if (authCookie === "true") {
			setIsAuthenticated(true);
		}
	}, []);

	/**
	 * Handles changes to the password input field.
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
	 */
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
		setError("");
	};

	/**
	 * Handles changes to the show password checkbox.
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
	 */
	const handleShowPasswordChange = (event) => {
		setShowPassword(event.target.checked);
	};

	/**
	 * Handles form submission for authentication.
	 *
	 * @param {React.FormEvent<HTMLFormElement>} e - The submit event.
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		const secretCode = import.meta.env.VITE_APP_SECRET_CODE;
		if (password === secretCode) {
			Cookies.set("auth", "true", { expires: 1 });
			setIsAuthenticated(true);
			setError(""); // Clear error message if authentication succeeds
		} else {
			setError("The secret code you entered is incorrect. Please try again.");
		}
	};

	// Render the volunteer table if authenticated, otherwise show the login form
	if (isAuthenticated) {
		return (
			<Box display="flex" flexDirection="column">
				<VolunteerTable />
			</Box>
		);
	}

	return (
		<Box display="flex" alignItems="flex-start" width="600px" maxWidth="100%">
			<Box display="block" width="100%" maxWidth="100%">
				<Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
					You need the secret code to access this page.
				</Typography>
				<Typography component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
					<Box
						display="flex"
						flexDirection="row"
						alignItems="center"
						width="100%"
						maxWidth="100%"
						sx={{
							border: "1px solid",
							borderColor: grey[300],
							p: "2px 4px",
							borderRadius: 2,
						}}
					>
						<Box sx={{ ml: 1, flex: 1, position: "relative" }}>
							<InputBase
								type={showPassword ? "text" : "password"}
								placeholder="Enter the secret code"
								onChange={handlePasswordChange}
								sx={{ width: "100%", paddingRight: "40px" }}
								inputProps={{ "aria-label": "Enter the secret code" }}
							/>
							<Box
								component="div"
								sx={{
									position: "absolute",
									right: 0,
									top: "50%",
									transform: "translateY(-50%)",
									"& > .MuiFormControlLabel-root": {
										margin: 0,
									},
								}}
							>
								<FormControlLabel
									control={
										<Checkbox
											icon={<VisibilityOffIcon />}
											checkedIcon={<VisibilityIcon />}
											checked={showPassword}
											onChange={handleShowPasswordChange}
										/>
									}
								/>
							</Box>
						</Box>
						<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
						<IconButton
							type="submit"
							sx={{ p: "10px" }}
							aria-label="Submit"
							color="primary"
						>
							<SendIcon />
						</IconButton>
					</Box>
				</Typography>
				{error && (
					<Alert
						icon={<ErrorIcon fontSize="inherit" />}
						severity="error"
						sx={{ mb: 2, borderRadius: 2 }}
					>
						{error}
					</Alert>
				)}
			</Box>
		</Box>
	);
};

export default ProtectedPage;
