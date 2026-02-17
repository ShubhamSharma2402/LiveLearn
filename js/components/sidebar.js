export function Sidebar(role = "learner", active = "dashboard") {
  return `
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <span class="logo-icon">🎓</span>
          <h2 class="logo">LiveLearn</h2>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <span class="nav-label">Main</span>
          ${SidebarItem("dashboard", "📊", "Dashboard", active)}
          ${SidebarItem("sessions", "🎬", "Browse Sessions", active)}
          ${SidebarItem("bookings", "📅", "My Bookings", active)}
        </div>
        
        ${role === "host" ? `
          <div class="nav-section">
            <span class="nav-label">Host Tools</span>
            ${SidebarItem("create", "➕", "Create Session", active)}
          </div>
        ` : ""}
      </nav>

      <div class="sidebar-footer">
        <div class="sidebar-help">
          <span class="help-icon">💡</span>
          <div class="help-content">
            <span class="help-title">Need Help?</span>
            <span class="help-text">Check our docs</span>
          </div>
        </div>
      </div>
    </aside>
  `;
}

function SidebarItem(key, icon, label, active) {
  return `
    <a 
      href="#${key}" 
      data-page="${key}"
      class="sidebar-item ${active === key ? "active" : ""}"
    >
      <span class="sidebar-icon">${icon}</span>
      <span class="sidebar-label">${label}</span>
      ${active === key ? '<span class="active-indicator"></span>' : ''}
    </a>
  `;
}

