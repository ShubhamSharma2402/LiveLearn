// utils/calculateRevenue.js

export function calculateRevenue(bookings, hostId) {
  return bookings
    .filter(b => b.hostId === hostId)
    .reduce((total, booking) => total + booking.price, 0);
}
