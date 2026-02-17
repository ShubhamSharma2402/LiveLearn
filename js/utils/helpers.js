// utils/helpers.js

export function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
