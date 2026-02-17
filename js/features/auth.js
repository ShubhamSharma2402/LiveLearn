// pages/auth.js
import { users } from "../state/store.js";
import { showNotification } from "../components/notification.js";

export function LoginPage() {
  return `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-logo">🎓</div>
        <h2>Welcome to LiveLearn</h2>
        <p>Sign in to continue your learning journey</p>
        <form id="loginForm">
          <input type="email" id="email" placeholder="Enter your email" required />
          <button type="submit" class="btn-primary full-width">Sign In</button>
        </form>
        <div class="auth-footer">
          <p class="auth-hint">Try: <strong>shubham@example.com</strong> (learner) or <strong>aman@example.com</strong> (host)</p>
        </div>
      </div>
    </div>
  `;
}

export function handleLogin(setUser) {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

    if (!email) {
      showNotification("Please enter your email", "warning");
      return;
    }

    const user = users.find(u => u.email === email);

    if (user) {
      setUser(user);
      showNotification("Login Successful", "success");
      // Optional: redirect or render dashboard
    } else {
      showNotification("User Not Found", "error");
    }
  });
}
