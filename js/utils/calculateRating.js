// utils/calculateRating.js

export function calculateRating(reviews, sessionId) {
  const sessionReviews = reviews.filter(r => r.sessionId === sessionId);

  if (sessionReviews.length === 0) return 0;

  const total = sessionReviews.reduce((sum, r) => sum + r.rating, 0);
  return (total / sessionReviews.length).toFixed(1);
}
