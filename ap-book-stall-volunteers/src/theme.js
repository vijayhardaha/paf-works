import { createTheme } from "@mui/material/styles";
import { grey, orange, common } from "@mui/material/colors";

const theme = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					color: orange[800],
					textDecoration: "none",
					"&:hover": {
						color: orange[900],
						textDecoration: "underline",
					},
					"&:visited": {
						color: orange[700],
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					fontSize: "0.8rem",
					backgroundColor: grey[100],
					color: common.black,
					padding: "6px 12px",
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					"& .MuiTableCell-root": {
						backgroundColor: orange[900],
						color: common.white,
						padding: "12px 10px",
					},
				},
			},
		},
		MuiTableSortLabel: {
			styleOverrides: {
				root: {
					color: common.white,
					"&.Mui-active": {
						color: common.white,
						fontWeight: 700,
					},
					"&.Mui-active .MuiTableSortLabel-icon": {
						color: common.white,
					},
					"&:hover": {
						color: common.white,
					},
				},
				icon: {
					color: common.white,
					"&.Mui-active": {
						color: common.white,
					},
				},
			},
		},
	},
	typography: {
		fontFamily: "Lexend, sans-serif",
		h1: {
			fontWeight: 700,
			fontFamily: "Lora, serif",
		},
		h2: {
			fontWeight: 900,
			fontFamily: "Lora, serif",
		},
		h3: {
			fontWeight: 900,
			fontFamily: "Lora, serif",
		},
	},
	palette: {
		primary: {
			main: orange[900],
		},
	},
});

export default theme;
