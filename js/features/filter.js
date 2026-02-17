// utils/filter.js

/**
 * Filters sessions based on query and optional filters
 * @param {Array} sessions - Array of session objects
 * @param {Object} options - Filtering options
 * @param {string} options.query - Text search on session title
 * @param {string} options.category - Optional category filter
 * @param {number} options.minPrice - Minimum price filter
 * @param {number} options.maxPrice - Maximum price filter
 * @param {string} options.duration - Optional duration filter (e.g., "2h")
 * @returns {Array} - Filtered sessions
 */
export function filterSessions(
  sessions,
  { query = "", category = "", minPrice = 0, maxPrice = Infinity, duration = "" } = {}
) {
  return sessions.filter(session => {
    const matchesQuery = session.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category ? session.category === category : true;
    const matchesPrice = session.price >= minPrice && session.price <= maxPrice;
    const matchesDuration = duration ? session.duration.includes(duration) : true;

    return matchesQuery && matchesCategory && matchesPrice && matchesDuration;
  });
}
