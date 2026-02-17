// pages/browse.js
import { sessions } from "../state/store.js";
import { SessionCard } from "../components/sessionCard.js";

export function BrowsePage() {
  return `
    <div class="page">
      <h2>Browse Sessions</h2>
      <div class="session-grid">
        ${sessions.map(session => SessionCard(session)).join("")}
      </div>
    </div>
  `;
}
