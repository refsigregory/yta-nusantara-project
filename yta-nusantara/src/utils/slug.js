export default function stringToSlug(str, separator = '-') {
    return str.toLowerCase()
      // eslint-disable-next-line no-useless-escape
      .replace(/[^\w\s\-]/g, '') // Remove special characters
      .trim() // Trim leading and trailing spaces
      .replace(/\s+/g, separator) // Replace spaces with separator
      .replace(/-{2,}/g, separator); // Replace consecutive separators with a single separator
  }
