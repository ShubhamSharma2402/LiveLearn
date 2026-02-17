// pages/createSession.js
import { generateId } from "../utils/helpers.js";
import { sessions } from "../state/store.js";
import { showNotification } from "../components/notification.js";

export function CreateSessionPage() {
  return `
    <div class="page">
      <h2>Create Session</h2>
      <form id="createSessionForm">
        <input type="text" placeholder="Title" id="title" required />
        <input type="number" placeholder="Price" id="price" required />
        <textarea placeholder="Description" id="description"></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  `;
}

export function handleCreateSession(user) {
  document
    .getElementById("createSessionForm")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      const newSession = {
        id: generateId(),
        title: document.getElementById("title").value,
        price: Number(document.getElementById("price").value),
        description: document.getElementById("description").value,
        hostId: user.id,
        image: "https://via.placeholder.com/400",
        date: new Date().toISOString()
      };

      sessions.push(newSession);
      showNotification("Session Created Successfully!");
    });
}
