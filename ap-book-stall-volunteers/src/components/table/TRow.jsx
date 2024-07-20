import PropTypes from "prop-types";
import { columns } from "../../helpers/constants";
import { TableCell, TableRow, Link } from "@mui/material";
import { wrapTextAfterCharacter } from "../../helpers/utils";

/**
 * Table row component for displaying data.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.row - The data for the row.
 * @param {string} props.row.state - The state.
 * @param {string} props.row.residence_city - The residence city.
 * @param {string} props.row.book_stall_city - The book stall city.
 * @param {string} props.row.position - The position.
 * @param {string} props.row.full_name - The full name.
 * @param {string} props.row.contact_number - The contact number.
 * @param {string} [props.row.whatsapp_chat_link] - Optional WhatsApp chat link.
 * @param {string} [props.row.google_form_link] - Optional Google form link.
 * @param {string} [props.row.whatsapp_invite_link] - Optional WhatsApp invite link.
 * @returns {JSX.Element} - The rendered component.
 */
const TRow = (props) => {
	const { row } = props;

	return (
		<TableRow>
			{columns.map((column, index) => (
				<TableCell key={index} component="th" scope="row">
					{column.key === "contact_number" ? (
						<Link
							sx={{ fontWeight: 600 }}
							href={`https://wa.me/91${row[column.key]}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							{wrapTextAfterCharacter(`+91${row[column.key]}`)}
						</Link>
					) : (
						<div
							dangerouslySetInnerHTML={{
								__html: wrapTextAfterCharacter(row[column.key]),
							}}
						/>
					)}
				</TableCell>
			))}
		</TableRow>
	);
};

TRow.propTypes = {
	row: PropTypes.shape({
		state: PropTypes.string.isRequired,
		residence_city: PropTypes.string.isRequired,
		book_stall_city: PropTypes.string.isRequired,
		position: PropTypes.string.isRequired,
		full_name: PropTypes.string.isRequired,
		contact_number: PropTypes.string.isRequired,
		whatsapp_chat_link: PropTypes.string,
		google_form_link: PropTypes.string,
		whatsapp_invite_link: PropTypes.string,
	}).isRequired,
};

export default TRow;
