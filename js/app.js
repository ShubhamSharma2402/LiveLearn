// app.js
import { sessions, bookings, reviews, users } from "./state/store.js";
import { LoginPage, handleLogin } from "./features/auth.js";
import { Navbar } from "./components/navbar.js";
import { Sidebar } from "./components/sidebar.js";
import { SessionCard } from "./components/sessionCard.js";
import { StatsCard } from "./components/statsCard.js";
import { showNotification } from "./components/notification.js";
import { loadDarkMode, toggleDarkMode } from "./features/darkmode.js";
import { formatCurrency } from "./utils/formatCurrency.js";

// ===== Global Store =====
let store = {
  user: null,
  currentPage: "dashboard",
  sessions,
  bookings,
  reviews,
  users,
};

// ===== App Container =====
const app = document.getElementById("app");
const navContainer = document.getElementById("navbar");
const sidebarContainer = document.getElementById("sidebar");

// ===== Render Navbar =====
function renderNavbar() {
  if (!navContainer) return;
  navContainer.innerHTML = Navbar(store.user || { name: "Guest" });
  toggleDarkMode("toggle-dark");
  
  // Search functionality
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      if (store.currentPage === "sessions") {
        renderBrowse(query);
      }
    });
  }
}

// ===== Render Sidebar =====
function renderSidebar(activePage = "dashboard") {
  const role = store.user?.role || "learner";
  return Sidebar(role, activePage);
}

// ===== Render Login Page =====
function renderLogin() {
  if (!app) return;
  navContainer.innerHTML = "";
  app.innerHTML = LoginPage();
  handleLogin((user) => {
    store.user = user;
    showNotification(`Welcome back, ${user.name}!`, "success");
    navigateTo("dashboard");
  });
}

// ===== Router =====
function navigateTo(page) {
  if (!store.user) {
    renderLogin();
    return;
  }
  
  store.currentPage = page;
  renderNavbar();
  
  switch (page) {
    case "dashboard":
      renderDashboard();
      break;
    case "sessions":
      renderBrowse();
      break;
    case "bookings":
      renderBookings();
      break;
    case "create":
      renderCreateSession();
      break;
    default:
      renderDashboard();
  }
  
  attachSidebarListeners();
}

// ===== Attach Sidebar Click Listeners =====
function attachSidebarListeners() {
  document.querySelectorAll(".sidebar-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      if (page) navigateTo(page);
    });
  });
}

// ===== Render Dashboard =====
function renderDashboard() {
  if (!app) return;
  const role = store.user?.role || "learner";
  const userBookings = store.bookings.filter((b) => 
    role === "host" ? b.hostId === store.user.id : b.userId === store.user.id
  );
  
  const totalRevenue = role === "host" 
    ? userBookings.reduce((sum, b) => sum + b.price, 0) 
    : 0;
  
  const upcomingSessions = store.sessions.filter((s) => 
    new Date(s.date) > new Date()
  ).slice(0, 3);

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar("dashboard")}
      <div class="dashboard-content">
        <div class="page-header">
          <div>
            <h1>Welcome back, ${store.user.name.split(" ")[0]}! 👋</h1>
            <p class="page-subtitle">Here's what's happening with your ${role === "host" ? "sessions" : "learning journey"}</p>
          </div>
        </div>
        
        <div class="stats-grid">
          ${StatsCard({ title: role === "host" ? "Total Earnings" : "Sessions Booked", value: role === "host" ? formatCurrency(totalRevenue) : userBookings.length, icon: role === "host" ? "💰" : "📚", change: "+12%", highlight: true })}
          ${StatsCard({ title: "Active Sessions", value: store.sessions.length, icon: "🎯", change: "+3%" })}
          ${StatsCard({ title: role === "host" ? "Total Students" : "Hours Learned", value: role === "host" ? userBookings.length : userBookings.length * 2, icon: role === "host" ? "👥" : "⏱️" })}
          ${StatsCard({ title: "Avg. Rating", value: "4.8", icon: "⭐", change: "+0.2" })}
        </div>
        
        <div class="dashboard-section">
          <div class="section-header">
            <h2>Upcoming Sessions</h2>
            <button class="btn-text" data-page="sessions">View All →</button>
          </div>
          <div class="card-grid">
            ${upcomingSessions.map((s) => SessionCard(s)).join("")}
          </div>
        </div>
        
        <div class="dashboard-section">
          <h2>Recent Activity</h2>
          <div class="activity-list">
            ${userBookings.slice(0, 5).map((b) => {
              const session = store.sessions.find((s) => s.id === b.sessionId);
              return `
                <div class="activity-item">
                  <div class="activity-icon">📅</div>
                  <div class="activity-content">
                    <p class="activity-title">${role === "host" ? "New booking" : "You booked"}: ${session?.title || "Session"}</p>
                    <span class="activity-time">${new Date(b.date).toLocaleDateString()}</span>
                  </div>
                  <span class="activity-amount">${formatCurrency(b.price)}</span>
                </div>
              `;
            }).join("") || "<p class='empty-state'>No recent activity</p>"}
          </div>
        </div>
      </div>
    </div>
  `;
  
  attachBookingHandlers();
  document.querySelector(".btn-text")?.addEventListener("click", () => navigateTo("sessions"));
}

// ===== Render Browse Sessions =====
function renderBrowse(searchQuery = "") {
  if (!app) return;
  
  let filteredSessions = store.sessions;
  if (searchQuery) {
    filteredSessions = store.sessions.filter((s) =>
      s.title.toLowerCase().includes(searchQuery) ||
      s.category.toLowerCase().includes(searchQuery) ||
      s.hostName.toLowerCase().includes(searchQuery)
    );
  }
  
  const categories = [...new Set(store.sessions.map((s) => s.category))];

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar("sessions")}
      <div class="dashboard-content">
        <div class="page-header">
          <div>
            <h1>Browse Sessions</h1>
            <p class="page-subtitle">Discover live learning sessions from expert hosts</p>
          </div>
        </div>
        
        <div class="filters">
          <select id="categoryFilter" class="filter-select">
            <option value="">All Categories</option>
            ${categories.map((c) => `<option value="${c}">${c}</option>`).join("")}
          </select>
          <select id="priceFilter" class="filter-select">
            <option value="">Any Price</option>
            <option value="0-500">Under ₹500</option>
            <option value="500-1000">₹500 - ₹1000</option>
            <option value="1000+">₹1000+</option>
          </select>
          <select id="sortFilter" class="filter-select">
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
        
        <div class="card-grid" id="sessionsGrid">
          ${filteredSessions.map((s) => SessionCard(s)).join("")}
        </div>
        
        ${filteredSessions.length === 0 ? "<p class='empty-state'>No sessions found matching your criteria</p>" : ""}
      </div>
    </div>
  `;

  attachBookingHandlers();
  attachFilterListeners();
}

// ===== Render Bookings Page =====
function renderBookings() {
  if (!app) return;
  const role = store.user?.role || "learner";
  const userBookings = store.bookings.filter((b) =>
    role === "host" ? b.hostId === store.user.id : b.userId === store.user.id
  );

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar("bookings")}
      <div class="dashboard-content">
        <div class="page-header">
          <div>
            <h1>${role === "host" ? "Your Bookings" : "My Bookings"}</h1>
            <p class="page-subtitle">${role === "host" ? "Manage your session bookings" : "Track your enrolled sessions"}</p>
          </div>
        </div>
        
        <div class="bookings-list">
          ${userBookings.length > 0 ? userBookings.map((b) => {
            const session = store.sessions.find((s) => s.id === b.sessionId);
            const host = store.users.find((u) => u.id === session?.hostId);
            return `
              <div class="booking-card">
                <div class="booking-image">
                  <img src="${session?.image || 'https://via.placeholder.com/120'}" alt="${session?.title}" />
                </div>
                <div class="booking-details">
                  <h3>${session?.title || "Session"}</h3>
                  <p class="booking-host">By ${session?.hostName || host?.name || "Host"}</p>
                  <div class="booking-meta">
                    <span class="booking-date">📅 ${new Date(session?.date || b.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
                    <span class="booking-duration">⏱️ ${session?.duration || "2h"}</span>
                  </div>
                </div>
                <div class="booking-actions">
                  <span class="booking-price">${formatCurrency(b.price)}</span>
                  <span class="booking-status status-confirmed">Confirmed</span>
                </div>
              </div>
            `;
          }).join("") : `
            <div class="empty-state-container">
              <div class="empty-icon">📚</div>
              <h3>No bookings yet</h3>
              <p>${role === "host" ? "Your bookings will appear here" : "Start learning by booking a session"}</p>
              <button class="btn-primary" data-page="sessions">Browse Sessions</button>
            </div>
          `}
        </div>
      </div>
    </div>
  `;
  
  document.querySelector(".empty-state-container .btn-primary")?.addEventListener("click", () => navigateTo("sessions"));
}

// ===== Render Create Session Page =====
function renderCreateSession() {
  if (!app) return;

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar("create")}
      <div class="dashboard-content">
        <div class="page-header">
          <div>
            <h1>Create New Session</h1>
            <p class="page-subtitle">Share your expertise with learners worldwide</p>
          </div>
        </div>
        
        <div class="form-card">
          <form id="createSessionForm">
            <div class="form-group">
              <label for="title">Session Title</label>
              <input type="text" id="title" placeholder="e.g., Advanced React Patterns" required />
            </div>
            
            <div class="form-group">
              <label for="description">Description</label>
              <textarea id="description" rows="4" placeholder="Describe what learners will gain from this session..." required></textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="category">Category</label>
                <select id="category" required>
                  <option value="">Select Category</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <div class="form-group">
                <label for="price">Price (₹)</label>
                <input type="number" id="price" placeholder="999" min="0" required />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="date">Date & Time</label>
                <input type="datetime-local" id="date" required />
              </div>
              <div class="form-group">
                <label for="duration">Duration</label>
                <select id="duration" required>
                  <option value="1h">1 Hour</option>
                  <option value="1h 30m">1.5 Hours</option>
                  <option value="2h">2 Hours</option>
                  <option value="2h 30m">2.5 Hours</option>
                  <option value="3h">3 Hours</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label for="image">Cover Image URL</label>
              <input type="url" id="image" placeholder="https://example.com/image.jpg" />
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn-secondary" onclick="navigateTo('dashboard')">Cancel</button>
              <button type="submit" class="btn-primary">Create Session</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  document.getElementById("createSessionForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const newSession = {
      id: "s" + Date.now(),
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      category: document.getElementById("category").value,
      price: Number(document.getElementById("price").value),
      date: document.getElementById("date").value,
      duration: document.getElementById("duration").value,
      image: document.getElementById("image").value || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      hostId: store.user.id,
      hostName: store.user.name,
      hostAvatar: "https://i.pravatar.cc/150?img=11",
      rating: 0,
      totalStudents: 0,
    };
    store.sessions.unshift(newSession);
    showNotification("Session created successfully!", "success");
    navigateTo("sessions");
  });
}

// ===== Attach Booking Handlers =====
function attachBookingHandlers() {
  document.querySelectorAll(".book-btn").forEach((btn) => {
    const sessionId = btn.dataset.id;
    const isBooked = store.bookings.some(
      (b) => b.sessionId === sessionId && b.userId === store.user?.id
    );
    
    if (isBooked) {
      btn.textContent = "Booked ✓";
      btn.disabled = true;
      btn.classList.add("btn-booked");
    }
    
    btn.addEventListener("click", () => {
      const session = store.sessions.find((s) => s.id === sessionId);
      if (!session || isBooked) return;
      
      store.bookings.push({
        id: "b" + Date.now(),
        userId: store.user.id,
        hostId: session.hostId,
        sessionId: session.id,
        price: session.price,
        date: new Date().toISOString(),
      });
      
      btn.textContent = "Booked ✓";
      btn.disabled = true;
      btn.classList.add("btn-booked");
      showNotification(`Successfully booked "${session.title}"!`, "success");
    });
  });
}

// ===== Attach Filter Listeners =====
function attachFilterListeners() {
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const sortFilter = document.getElementById("sortFilter");
  
  const applyFilters = () => {
    let filtered = [...store.sessions];
    
    // Category filter
    if (categoryFilter?.value) {
      filtered = filtered.filter((s) => s.category === categoryFilter.value);
    }
    
    // Price filter
    if (priceFilter?.value) {
      const [min, max] = priceFilter.value.split("-").map((v) => v === "+" ? Infinity : Number(v) || 0);
      filtered = filtered.filter((s) => {
        if (priceFilter.value === "1000+") return s.price >= 1000;
        return s.price >= min && s.price <= (max || Infinity);
      });
    }
    
    // Sort
    if (sortFilter?.value) {
      switch (sortFilter.value) {
        case "price-low":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
      }
    }
    
    const grid = document.getElementById("sessionsGrid");
    if (grid) {
      grid.innerHTML = filtered.map((s) => SessionCard(s)).join("") || 
        "<p class='empty-state'>No sessions found</p>";
      attachBookingHandlers();
    }
  };
  
  categoryFilter?.addEventListener("change", applyFilters);
  priceFilter?.addEventListener("change", applyFilters);
  sortFilter?.addEventListener("change", applyFilters);
}

// ===== Initialize App =====
window.addEventListener("DOMContentLoaded", () => {
  loadDarkMode();
  if (!store.user) {
    renderLogin();
  } else {
    navigateTo("dashboard");
  }
});

// Make navigateTo globally accessible for inline handlers
window.navigateTo = navigateTo;

