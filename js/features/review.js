// pages/review.js
import { reviews } from "../state/store.js";
import { generateId } from "../utils/helpers.js";
import { showNotification } from "../components/notification.js";

/**
 * Submits a review for a session
 * @param {Object} user - Currently logged-in user
 * @param {string} sessionId - ID of the session being reviewed
 * @param {number} rating - Rating value (1-5)
 * @param {string} comment - Review comment
 */
export function submitReview(user, sessionId, rating, comment) {
  if (!user || !sessionId) {
    showNotification("User or session missing", "error");
    return;
  }

  if (!rating || rating < 1 || rating > 5) {
    showNotification("Please provide a valid rating (1-5)", "warning");
    return;
  }

  if (!comment || comment.trim() === "") {
    showNotification("Please add a comment", "warning");
    return;
  }

  // Optional: prevent multiple reviews by same user for same session
  const existing = reviews.find(
    (r) => r.userId === user.id && r.sessionId === sessionId
  );

  if (existing) {
    showNotification("You have already reviewed this session", "info");
    return;
  }

  reviews.push({
    id: generateId(),
    userId: user.id,
    sessionId,
    rating,
    comment: comment.trim(),
    date: new Date().toISOString()
  });

  showNotification("Review submitted successfully", "success");
}
