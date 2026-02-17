let notificationContainer = null;

function createContainer() {
  notificationContainer = document.createElement("div");
  notificationContainer.className = "notification-container";
  document.body.appendChild(notificationContainer);
}

export function showNotification(
  message,
  type = "success",
  duration = 3000
) {
  if (!notificationContainer) createContainer();

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️"
  };

  const toast = document.createElement("div");
  toast.className = `notification ${type}`;

  toast.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">${icons[type]}</span>
      <span class="notification-message">${message}</span>
    </div>
    <button class="notification-close">×</button>
  `;

  notificationContainer.appendChild(toast);

  // Close button
  toast.querySelector(".notification-close").addEventListener("click", () => {
    removeToast(toast);
  });

  // Auto remove
  setTimeout(() => {
    removeToast(toast);
  }, duration);
}

function removeToast(toast) {
  toast.classList.add("hide");

  setTimeout(() => {
    toast.remove();
  }, 300);
}
