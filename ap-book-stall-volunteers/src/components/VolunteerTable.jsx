import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Skeleton,
	Box,
	Button,
	Divider,
} from "@mui/material";
import { createSlugifiedKeys } from "../helpers/utils";
import THead from "./table/THead";
import TRow from "./table/TRow";
import { columns } from "../helpers/constants";
import { grey } from "@mui/material/colors";

/**
 * Stable sort function to sort the array based on comparator.
 *
 * @param {Array} array - The array to be sorted.
 * @param {Function} comparator - The comparator function.
 * @returns {Array} - The sorted array.
 */
const stableSort = (array, comparator) => {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
};

/**
 * Get comparator function based on order and orderBy properties.
 *
 * @param {string} order - The sort order ('asc' or 'desc').
 * @param {string} orderBy - The column key to sort by.
 * @returns {Function} - The comparator function.
 */
const getComparator = (order, orderBy) => {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
};

/**
 * Comparator function to sort data in descending order.
 *
 * @param {Object} a - The first item.
 * @param {Object} b - The second item.
 * @param {string} orderBy - The column key to compare.
 * @returns {number} - Comparison result.
 */
const descendingComparator = (a, b, orderBy) => {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
};

/**
 * Skeleton loader for table rows.
 *
 * @returns {JSX.Element} - The table row skeletons.
 */
const TableRowsSkeleton = () => {
	return Array.from(new Array(12)).map((_, index) => (
		<TableRow key={index}>
			{Array.from(new Array(columns.length)).map((_, cellIndex) => (
				<TableCell key={cellIndex} sx={{ p: 2 }}>
					<Skeleton variant="text" width={100} />
				</TableCell>
			))}
		</TableRow>
	));
};

/**
 * VolunteerTable component that displays volunteer data in a table.
 *
 * @returns {JSX.Element} - The rendered component.
 */
const VolunteerTable = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("state");

	useEffect(() => {
		const csvUrl = import.meta.env.VITE_APP_CSV_URL;
		fetch(csvUrl)
			.then((response) => response.text())
			.then((csvText) => {
				Papa.parse(csvText, {
					header: true,
					complete: (result) => {
						const jsonData = result.data;
						const headers = result.meta.fields;
						const columnMapping = createSlugifiedKeys(headers);

						const mappedData = jsonData.map((row) => {
							const newRow = {};
							for (const key in row) {
								if (columnMapping[key]) {
									newRow[columnMapping[key]] = row[key];
								} else {
									newRow[key] = row[key];
								}
							}
							return newRow;
						});

						setData(mappedData);
						setLoading(false);
					},
					error: (error) => {
						console.error("Error parsing CSV:", error);
						setLoading(false);
					},
				});
			});
	}, []);

	/**
	 * Handles request to sort table data by a specific property.
	 *
	 * @param {string} property - The property to sort by.
	 */
	const handleRequestSort = (property) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	const sortedData = stableSort(data, getComparator(order, orderBy));

	return (
		<>
			<Box
				display="flex"
				flexDirection="row"
				alignItems="center"
				gap="10px"
				sx={{ pb: 1, mb: 2 }}
			>
				<Button
					component="a"
					variant="outlined"
					color="primary"
					size="small"
					target="_blank"
					rel="noopener noreferrer"
					href={import.meta.env.VITE_APP_SHEET_URL}
				>
					View Datasheet
				</Button>
				<Button
					component="a"
					variant="outlined"
					color="primary"
					size="small"
					target="_blank"
					rel="noopener noreferrer"
					href={import.meta.env.VITE_APP_FORM_URL}
				>
					Submit Form
				</Button>
			</Box>

			<Divider component="div" role="presentation" color={grey[300]} />

			<TableContainer
				component={Paper}
				sx={{ borderRadius: 2, boxShadow: "none", mt: 3 }}
			>
				<Table sx={{ fontSize: "0.8em" }}>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<THead
									key={column.key}
									columnKey={column.key}
									onClick={handleRequestSort}
									columnLabel={column.label}
									orderBy={orderBy}
									order={order}
									loading={loading}
								/>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{loading ? (
							<TableRowsSkeleton />
						) : (
							sortedData.map((row, index) => <TRow key={index} row={row} />)
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default VolunteerTable;
