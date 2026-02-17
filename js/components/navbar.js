export function Navbar(user) {
  return `
    <nav class="navbar">

      <div class="nav-left">
        <h2 class="logo">ReadyToLearn</h2>

        <div class="nav-search">
          <input 
            type="text" 
            placeholder="Search sessions..."
            class="search-input"
          />
        </div>
      </div>

      <div class="nav-right">

        <button class="icon-btn" id="notification-btn">
          🔔
        </button>

        <button class="icon-btn" id="toggle-dark">
          🌙
        </button>

        <div class="user-profile">
          <img 
            src="${user?.avatar || "https://i.pravatar.cc/40"}" 
            alt="${user?.name || "Guest"}"
            class="avatar"
          />
          <span class="user-name">
            ${user?.name || "Guest"}
          </span>
        </div>

      </div>

    </nav>
  `;
}

