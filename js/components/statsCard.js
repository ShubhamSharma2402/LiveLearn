export function StatsCard({
  title,
  value,
  change = null,       // +12%, -5% etc
  icon = "📊",
  highlight = false    // for revenue card
}) {
  return `
    <div class="stat-card ${highlight ? "stat-highlight" : ""}">
      
      <div class="stat-top">
        <div class="stat-icon">
          ${icon}
        </div>
        <span class="stat-title">
          ${title}
        </span>
      </div>

      <div class="stat-value">
        ${value}
      </div>

      ${
        change
          ? `<div class="stat-change ${change.startsWith("-") ? "negative" : "positive"}">
               ${change} this month
             </div>`
          : ""
      }

    </div>
  `;
}
