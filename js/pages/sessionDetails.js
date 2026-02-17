// pages/sessionDetails.js
import { formatCurrency } from "../utils/formatCurrency.js";
import { formatDate, formatTime } from "../utils/helpers.js";

export function SessionDetails(session) {
  return `
    <div class="page">
      <h2>${session.title}</h2>
      <img src="${session.image}" class="details-image"/>
      <p>${session.description}</p>
      <p><strong>Date:</strong> ${formatDate(session.date)}</p>
      <p><strong>Time:</strong> ${formatTime(session.date)}</p>
      <p><strong>Price:</strong> ${formatCurrency(session.price)}</p>
      <button class="book-btn" data-id="${session.id}">
        Book Session
      </button>
    </div>
  `;
}
