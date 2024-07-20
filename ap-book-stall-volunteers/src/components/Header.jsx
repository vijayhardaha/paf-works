import { Box, Typography } from "@mui/material";
import { grey, orange } from "@mui/material/colors";

/**
 * Header component displaying the title and description of the page.
 *
 * @returns {JSX.Element} The rendered header component.
 */
const Header = () => (
	<Box sx={{ my: 4 }}>
		<Typography variant="h3" component="h1" sx={{ mb: 2, color: orange[900] }}>
			Acharya Prashant&apos;s Book Stall Volunteers Details
		</Typography>
		<Typography paragraph sx={{ mb: 2, color: grey[800] }}>
			Here you will find the details of volunteers for Acharya Prashant book
			stalls. Please contact the team leaders for more information.
		</Typography>
	</Box>
);

export default Header;
