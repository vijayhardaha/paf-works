import { TableCell, TableSortLabel } from "@mui/material";
import PropTypes from "prop-types";

/**
 * Table header component for sorting.
 *
 * @param {Object} props - The component props.
 * @param {string} props.columnKey - The key of the column to sort.
 * @param {Function} props.onClick - Function to handle sort click.
 * @param {string} props.columnLabel - The label of the column.
 * @param {string} props.orderBy - The current column being sorted by.
 * @param {string} props.order - The current sort order ('asc' or 'desc').
 * @param {boolean} props.loading - Whether data is being loaded.
 * @returns {JSX.Element} - The rendered component.
 */
const THead = ({
	columnKey,
	onClick,
	columnLabel,
	orderBy,
	order,
	loading,
}) => {
	return (
		<TableCell
			sortDirection={orderBy === columnKey ? order : false}
			sx={{ width: "auto" }}
		>
			{loading ? (
				<>{columnLabel}</>
			) : (
				<TableSortLabel
					active={orderBy === columnKey}
					direction={orderBy === columnKey ? order : "asc"}
					onClick={() => onClick(columnKey)}
				>
					{columnLabel}
				</TableSortLabel>
			)}
		</TableCell>
	);
};

THead.propTypes = {
	columnKey: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	columnLabel: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	order: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default THead;
