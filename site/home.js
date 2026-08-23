const plans = {
  webdesign: [
    {
      name: "Kostenlos",
      monthly: 0,
      features: ["30 Minuten Kennenlernen", "Kurzanalyse deines Auftritts", "Drei konkrete Empfehlungen"],
      cta: "Kennenlernen",
    },
    {
      name: "Basic",
      monthly: 29.99,
      features: ["Kompakte Onepage-Website", "Responsive Design", "Technische Pflege", "Persönlicher Ansprechpartner"],
      cta: "Basic anfragen",
    },
    {
      name: "Business",
      monthly: 59.99,
      features: ["Website mit bis zu 5 Seiten", "Individuelles Designsystem", "SEO-Grundoptimierung", "Regelmäßige Inhaltsupdates"],
      cta: "Business anfragen",
      featured: true,
    },
    {
      name: "All-in",
      monthly: 99.99,
      features: ["Individueller Projektumfang", "Automationen & KI-Integration", "Fortlaufende Optimierung", "Priorisierte Betreuung"],
      cta: "All-in anfragen",
    },
  ],
  social: [
    {
      name: "Kostenlos",
      monthly: 0,
      features: ["30 Minuten Kennenlernen", "Profil-Kurzanalyse", "Drei konkrete Content-Ideen"],
      cta: "Kennenlernen",
    },
    {
      name: "Basic",
      monthly: 99,
      features: ["Monatlicher Contentplan", "4 Beiträge pro Monat", "Texte & Gestaltung", "Monatlicher Check-in"],
      cta: "Basic anfragen",
    },
    {
      name: "Business",
      monthly: 199,
      features: ["Strategie & Redaktionsplan", "8 Beiträge pro Monat", "2 Kurzvideos pro Monat", "Auswertung & Optimierung"],
      cta: "Business anfragen",
      featured: true,
    },
    {
      name: "All-in",
      monthly: 349,
      features: ["Umfassende Contentstrategie", "12 Beiträge pro Monat", "4 Kurzvideos pro Monat", "Community-Begleitung"],
      cta: "All-in anfragen",
    },
  ],
};

const state = {
  service: "webdesign",
  billing: "monthly",
};

const grid = document.querySelector("[data-pricing-grid]");

function formatPrice(value) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function renderPricing() {
  const yearly = state.billing === "yearly";
  grid.innerHTML = plans[state.service]
    .map((plan) => {
      const price = yearly ? plan.monthly * 0.85 : plan.monthly;
      const pricePrefix = price > 0 ? "ab " : "";
      const billingText = price === 0 ? "einmaliger Einstieg" : "pro Monat";
      const badge = plan.featured ? '<span class="plan-badge">Unsere Empfehlung</span>' : "";
      const features = plan.features.map((feature) => `<li>${feature}</li>`).join("");

      return `
        <article class="plan-card${plan.featured ? " is-featured" : ""}">
          <div class="plan-top">
            ${badge}
            <p class="plan-name">${plan.name}</p>
            <p class="plan-price"><span>${pricePrefix}${formatPrice(price)}</span> €</p>
            <p class="plan-cycle">${billingText}${yearly && price > 0 ? " · jährlich abgerechnet" : ""}</p>
          </div>
          <ul>${features}</ul>
          <a href="/contacts/">${plan.cta}<span aria-hidden="true">↗</span></a>
        </article>`;
    })
    .join("");

}

document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    state.service = button.dataset.service;
    document.querySelectorAll("[data-service]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderPricing();
  });
});

document.querySelectorAll("[data-billing]").forEach((button) => {
  button.addEventListener("click", () => {
    state.billing = button.dataset.billing;
    document.querySelectorAll("[data-billing]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderPricing();
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const projectsSection = document.querySelector(".projects-section");

if (projectsSection) {
  let dimFrameRequested = false;

  function updateWorkDimming() {
    dimFrameRequested = false;
    const rect = projectsSection.getBoundingClientRect();
    const fadeDistance = window.innerHeight * 0.45;
    const entering = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / fadeDistance));
    const leaving = Math.min(1, Math.max(0, rect.bottom / fadeDistance));
    const opacity = Math.min(entering, leaving);

    document.body.style.setProperty("--work-dim", opacity.toFixed(3));
  }

  function requestDimUpdate() {
    if (!dimFrameRequested) {
      dimFrameRequested = true;
      requestAnimationFrame(updateWorkDimming);
    }
  }

  window.addEventListener("scroll", requestDimUpdate, { passive: true });
  window.addEventListener("resize", requestDimUpdate);
  requestDimUpdate();
}

document.querySelectorAll("[data-scroll-video]").forEach((scrollVideo) => {
  const projectCard = scrollVideo.closest(".project-card");
  let frameRequested = false;
  let isPrimed = false;
  let targetTime = 0;

  function primeVideo() {
    if (isPrimed) {
      return;
    }

    isPrimed = true;
    const playAttempt = scrollVideo.play();

    if (playAttempt) {
      playAttempt
        .then(() => {
          scrollVideo.pause();
          seekToTarget();
        })
        .catch(() => {
          isPrimed = false;
        });
    }
  }

  function seekToTarget() {
    if (
      scrollVideo.seeking ||
      Math.abs(scrollVideo.currentTime - targetTime) <= 0.01
    ) {
      return;
    }

    scrollVideo.currentTime = targetTime;
  }

  function updateScrollVideo() {
    frameRequested = false;

    const rect = projectCard.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const cardCenter = rect.top + rect.height / 2;
    const revealStart = window.innerHeight;
    const revealProgress = Math.min(1, Math.max(0, (revealStart - cardCenter) / (revealStart - viewportCenter)));

    projectCard.style.setProperty("--video-opacity", revealProgress > 0.001 ? "1" : "0");
    projectCard.style.setProperty("--video-reveal", `${(revealProgress * 100).toFixed(2)}%`);

    if (scrollVideo.readyState < HTMLMediaElement.HAVE_METADATA) {
      return;
    }

    const scrubDistance = Math.max(window.innerHeight, rect.height);
    const scrubProgress = Math.min(1, Math.max(0, (viewportCenter - cardCenter) / scrubDistance));
    targetTime = scrubProgress * Math.max(0, scrollVideo.duration - 0.05);

    seekToTarget();
  }

  function requestVideoUpdate() {
    if (!frameRequested) {
      frameRequested = true;
      requestAnimationFrame(updateScrollVideo);
    }
  }

  scrollVideo.addEventListener("loadedmetadata", () => {
    requestVideoUpdate();
    primeVideo();
  });
  scrollVideo.addEventListener("loadeddata", () => {
    seekToTarget();
  });
  scrollVideo.addEventListener("seeked", seekToTarget);
  window.addEventListener("scroll", requestVideoUpdate, { passive: true });
  window.addEventListener("resize", requestVideoUpdate);
  scrollVideo.load();
  requestVideoUpdate();
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
renderPricing();
