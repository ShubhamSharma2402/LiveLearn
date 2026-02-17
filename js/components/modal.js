let activeModal = null;

export function openModal({
  title = "",
  content = "",
  size = "medium" // small | medium | large
}) {
  if (activeModal) closeModal();

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";

  overlay.innerHTML = `
    <div class="modal modal-${size}">
      
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close">&times;</button>
      </div>

      <div class="modal-body">
        ${content}
      </div>

    </div>
  `;

  document.body.appendChild(overlay);
  document.body.classList.add("modal-open");

  activeModal = overlay;

  // Close on button
  overlay.querySelector(".modal-close")
    .addEventListener("click", closeModal);

  // Close on overlay click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });

  // ESC key support
  document.addEventListener("keydown", handleEscape);
}

export function closeModal() {
  if (!activeModal) return;

  activeModal.classList.add("hide");

  setTimeout(() => {
    activeModal.remove();
    document.body.classList.remove("modal-open");
    activeModal = null;
  }, 200);

  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(e) {
  if (e.key === "Escape") closeModal();
}
