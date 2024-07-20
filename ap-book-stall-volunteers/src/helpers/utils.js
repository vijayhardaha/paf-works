import slugify from "slugify";
import latinize from "latinize";

/**
 * Converts an array of header names to slugified keys.
 *
 * @param {string[]} headers - The array of header names.
 * @returns {Object} An object mapping original header names to their slugified versions.
 */
export const createSlugifiedKeys = (headers) => {
	return headers.reduce((acc, header) => {
		const latinizedHeader = latinize(header);
		const slugifiedHeader = slugify(latinizedHeader, {
			lower: true,
			replacement: "_",
			strict: true,
			trim: true,
		});
		acc[header] = slugifiedHeader;
		return acc;
	}, {});
};

/**
 * Wraps text at a specified character with a line break.
 *
 * @param {string} text - The text to be wrapped.
 * @param {string} [char="("] - The character after which to insert the line break.
 * @returns {string} The text with line break inserted.
 */
export const wrapTextAfterCharacter = (text, char = "(") => {
	if (!text || !char) return text; // Return as is if no text or char is provided

	// Find the index of the first occurrence of the character
	const index = text.indexOf(char) - 1;
	if (index <= -1) return text; // Return as is if the character is not found

	// Split the text into two parts: before and after the character
	const beforeChar = text.substring(0, index + char.length);
	const afterChar = text.substring(index + char.length).trim(); // Trim the leading space of the after part

	// Join the parts with <br /> only after the character
	return beforeChar + "<br />" + afterChar;
};
