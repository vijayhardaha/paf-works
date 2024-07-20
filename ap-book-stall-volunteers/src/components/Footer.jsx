import { Typography, Box, Link } from "@mui/material";
import { styled } from "@mui/system";

// Styled component for the footer container
const FooterContainer = styled(Box)(({ theme }) => ({
	marginTop: "2rem",
	borderTop: `1px solid ${theme.palette.grey[300]}`,
	color: theme.palette.common.black,
	padding: "20px 0",
	textAlign: "center",
	width: "100%",
}));

/**
 * Footer component displaying copyright information and a link.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
const Footer = () => {
	return (
		<FooterContainer>
			<Typography variant="body2">
				&copy; {new Date().getFullYear()}{" "}
				<Link
					underline="none"
					sx={{ fontWeight: 600 }}
					href="https://x.com/vijayhardaha/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Vijay Hardaha
				</Link>
				. All rights reserved.
			</Typography>
		</FooterContainer>
	);
};

export default Footer;
