const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");

let lastScrollY = window.scrollY;

function updateHeader() {
  const y = window.scrollY;
  header?.classList.toggle("is-scrolled", y > 24);
  if (header && !document.body.classList.contains("menu-open")) {
    const delta = y - lastScrollY;
    if (y < 80 || delta < -4) header.classList.remove("is-hidden");
    else if (delta > 4) header.classList.add("is-hidden");
  }
  lastScrollY = y;
}

function closeMenu() {
  if (!menuButton || !mobileNav) return;
  menuButton.setAttribute("aria-expanded", "false");
  mobileNav.hidden = true;
  document.body.classList.remove("menu-open");
  header.classList.remove("menu-active");
}

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  mobileNav.hidden = open;
  document.body.classList.toggle("menu-open", !open);
  header.classList.toggle("menu-active", !open);
  header.classList.remove("is-hidden");
});

mobileNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
