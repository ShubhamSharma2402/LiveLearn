// pages/booking.js
import { bookings } from "../state/store.js";
import { generateId } from "../utils/helpers.js";
import { showNotification } from "../components/notification.js";

/**
 * Handles booking a session
 * @param {Object} user - currently logged-in user
 * @param {Object} session - session to book
 */
export function handleBooking(user, session) {
  if (!user || !session) {
    showNotification("User or session data missing", "error");
    return;
  }

  // Check if user already booked the session
  const alreadyBooked = bookings.some(
    (b) => b.userId === user.id && b.sessionId === session.id
  );

  if (alreadyBooked) {
    showNotification("You have already booked this session", "warning");
    return;
  }

  const newBooking = {
    id: generateId(),
    userId: user.id,
    hostId: session.hostId,
    sessionId: session.id,
    price: session.price,
    date: new Date().toISOString()
  };

  bookings.push(newBooking);

  showNotification(`Booking Confirmed for "${session.title}"!`, "success");

  // Optional: update UI dynamically (e.g., disable book button)
  const btn = document.querySelector(`.book-btn[data-id="${session.id}"]`);
  if (btn) {
    btn.textContent = "Booked";
    btn.disabled = true;
    btn.classList.add("btn-secondary");
  }
}
