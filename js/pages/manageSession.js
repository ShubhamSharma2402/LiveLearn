// pages/manageSession.js
import { sessions } from "../state/store.js";

export function ManageSessions(user) {
  const hostSessions = sessions.filter(s => s.hostId === user.id);

  return `
    <div class="page">
      <h2>Manage Sessions</h2>
      ${hostSessions.map(s => `
        <div class="session-manage-card">
          <h4>${s.title}</h4>
          <button data-id="${s.id}" class="delete-session">Delete</button>
        </div>
      `).join("")}
    </div>
  `;
}
