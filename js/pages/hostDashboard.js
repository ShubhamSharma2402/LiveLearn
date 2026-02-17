// pages/hostDashboard.js
import { bookings } from "../state/store.js";
import { calculateRevenue } from "../utils/calculateRevenue.js";
import { StatsCard } from "../components/statsCard.js";

export function HostDashboard(user) {
  const revenue = calculateRevenue(bookings, user.id);
  const totalBookings = bookings.filter(b => b.hostId === user.id).length;

  return `
    <div class="page">
      <h2>Host Dashboard</h2>
      <div class="stats-grid">
        ${StatsCard("Total Revenue", `₹${revenue}`)}
        ${StatsCard("Total Bookings", totalBookings)}
      </div>
      <canvas id="earningsChart"></canvas>
    </div>
  `;
}
