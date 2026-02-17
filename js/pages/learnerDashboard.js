// pages/learnerDashboard.js
import { bookings, sessions } from "../state/store.js";
import { formatCurrency } from "../utils/formatCurrency.js";

export function LearnerDashboard(user) {
  const userBookings = bookings.filter(b => b.userId === user.id);

  return `
    <div class="page">
      <h2>Your Bookings</h2>
      <div class="booking-list">
        ${userBookings.map(b => {
          const session = sessions.find(s => s.id === b.sessionId);
          return `
            <div class="booking-card">
              <h4>${session?.title}</h4>
              <p>${formatCurrency(b.price)}</p>
            </div>
          `;
        }).join("")}
      </div>
    </div>
  `;
}
