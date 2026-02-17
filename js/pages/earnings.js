// pages/earnings.js
import { bookings } from "../state/store.js";
import { calculateRevenue } from "../utils/calculateRevenue.js";

export function EarningsPage(user) {
  const revenue = calculateRevenue(bookings, user.id);

  return `
    <div class="page">
      <h2>Earnings</h2>
      <h3>Total Revenue: ₹${revenue}</h3>
      <canvas id="earningsChart"></canvas>
    </div>
  `;
}
