/**
 * Removes file-extension-suffix from string (.___)
 * @param str string to trim
 * @param suffix = "" suffix to trim ("" -> any suffix, "txt" == ".txt")
 */
export function trimSuffix(str: string, suffix: string = "") {
	if (suffix[0] !== ".") {
		suffix = ".".concat(suffix);
	}
	let trimmed = str.substring(0, str.lastIndexOf(suffix));
	return trimmed !== "" ? trimmed : str;
}

/**
 * Force the provided string to have the provided prefix and suffix if provided
 *
 * ("test","/") = ("/test","/") -> "/test"
 *
 * @param str provided string
 * @param prefix = "" provided prefix
 * @param suffix = "" provided suffix
 */
export function forcePrefixAndSuffix(str: string, prefix: string = "", suffix: string = "") {
	if (prefix && prefix !== "") {
		str = str.startsWith(prefix) ? str : prefix + str;
	}
	if (suffix && suffix !== "") {
		str = str.endsWith(suffix) ? str : str + suffix;
	}
	return str;
}
