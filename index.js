// Mouse tracking effect
document.addEventListener("mousemove", function (e) {
  const tracker = document.querySelector(".mouse-tracker") || createTracker();

  // Update tracker position
  requestAnimationFrame(() => {
    tracker.style.left = `${e.clientX}px`;
    tracker.style.top = `${e.clientY}px`;
  });
});

// Create tracker element
function createTracker() {
  const tracker = document.createElement("div");
  tracker.className = "mouse-tracker";
  document.body.appendChild(tracker);
  return tracker;
}

// Add 3D tilt effect to sections
document.querySelectorAll("section").forEach((section) => {
  section.addEventListener("mousemove", handleTilt);
  section.addEventListener("mouseleave", resetTilt);
});

function handleTilt(e) {
  const section = e.currentTarget;
  const rect = section.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const angleX = (y - centerY) / 30;
  const angleY = (centerX - x) / 30;

  section.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
}

function resetTilt(e) {
  const section = e.currentTarget;
  section.style.transform =
    "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
}

// Wrap content in sections
document.addEventListener("DOMContentLoaded", () => {
  const main = document.createElement("main");
  const body = document.body;
  const children = [...body.children];

  children.forEach((child) => {
    if (
      child.tagName !== "SCRIPT" &&
      !child.classList.contains("mouse-tracker")
    ) {
      const section = document.createElement("section");
      child.parentNode.insertBefore(section, child);
      section.appendChild(child);
    }
  });
});
