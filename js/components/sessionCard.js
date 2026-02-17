import { formatCurrency } from "../utils/formatCurrency.js";
import { calculateRating } from "../utils/calculateRating.js";
import { reviews } from "../state/store.js";

export function SessionCard(session) {
  const rating = calculateRating(reviews, session.id);

  return `
    <div class="session-card">

      <div class="card-image">
        <img src="${session.image}" alt="${session.title}" />
        <div class="image-overlay"></div>
        <span class="category-badge">
          ${session.category}
        </span>
      </div>

      <div class="card-body">

        <h3 class="card-title">
          ${session.title}
        </h3>

        <div class="host-info">
          <img 
            class="host-avatar" 
            src="${session.hostAvatar}" 
            alt="${session.hostName}" 
          />
          <span class="host-name">${session.hostName}</span>
        </div>

        <div class="card-meta">
          <div class="rating">
            ⭐ ${rating}
            <span class="students">(${session.totalStudents})</span>
          </div>
          <div class="duration">
            ⏱ ${session.duration}
          </div>
        </div>

        <div class="card-footer">
          <span class="price">
            ${formatCurrency(session.price)}
          </span>

          <button 
            class="btn-primary book-btn" 
            data-id="${session.id}"
          >
            Book Now
          </button>
        </div>

      </div>
    </div>
  `;
}


