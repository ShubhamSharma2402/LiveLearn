// utils/darkmode.js

/**
 * Toggles dark mode and saves preference in localStorage
 * @param {string} toggleBtnId - ID of the button that toggles dark mode
 */
export function toggleDarkMode(toggleBtnId = "toggle-dark") {
  const toggleBtn = document.getElementById(toggleBtnId);
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);

    // Optional: update button icon
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
  });
}

/**
 * Loads dark mode preference from localStorage
 */
export function loadDarkMode() {
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark");
  }
}
