const plans = {
  webdesign: [
    {
      name: "Kostenlos",
      monthly: 0,
      description: "Ein klarer erster Blick auf deine Idee.",
      features: ["30 Minuten Kennenlernen", "Kurzanalyse deines Auftritts", "Drei konkrete Empfehlungen"],
      cta: "Kennenlernen",
    },
    {
      name: "Basic",
      monthly: 29.99,
      description: "Für einen professionellen, ruhigen Start.",
      features: ["Kompakte Onepage-Website", "Responsive Design", "Technische Pflege", "Persönlicher Ansprechpartner"],
      cta: "Basic anfragen",
    },
    {
      name: "Business",
      monthly: 59.99,
      description: "Mehr Raum für Inhalte und Wachstum.",
      features: ["Website mit bis zu 5 Seiten", "Individuelles Designsystem", "SEO-Grundoptimierung", "Regelmäßige Inhaltsupdates"],
      cta: "Business anfragen",
      featured: true,
    },
    {
      name: "All-in",
      monthly: 99.99,
      description: "Eine digitale Heimat, die mit dir weiterdenkt.",
      features: ["Individueller Projektumfang", "Automationen & KI-Integration", "Fortlaufende Optimierung", "Priorisierte Betreuung"],
      cta: "All-in anfragen",
    },
  ],
  social: [
    {
      name: "Kostenlos",
      monthly: 0,
      description: "Orientierung für deinen nächsten Schritt.",
      features: ["30 Minuten Kennenlernen", "Profil-Kurzanalyse", "Drei konkrete Content-Ideen"],
      cta: "Kennenlernen",
    },
    {
      name: "Basic",
      monthly: 99,
      description: "Ein verlässlicher Rhythmus für deine Marke.",
      features: ["Monatlicher Contentplan", "4 Beiträge pro Monat", "Texte & Gestaltung", "Monatlicher Check-in"],
      cta: "Basic anfragen",
    },
    {
      name: "Business",
      monthly: 199,
      description: "Für eine aktive Präsenz mit echter Nähe.",
      features: ["Strategie & Redaktionsplan", "8 Beiträge pro Monat", "2 Kurzvideos pro Monat", "Auswertung & Optimierung"],
      cta: "Business anfragen",
      featured: true,
    },
    {
      name: "All-in",
      monthly: 349,
      description: "Deine Geschichte, durchgehend gut betreut.",
      features: ["Umfassende Contentstrategie", "12 Beiträge pro Monat", "4 Kurzvideos pro Monat", "Community-Begleitung"],
      cta: "All-in anfragen",
    },
  ],
};

const state = {
  service: "webdesign",
  billing: "monthly",
};

const serviceLabels = {
  webdesign: "Webdesign",
  social: "Social Media",
};

const grid = document.querySelector("[data-pricing-grid]");
const status = document.querySelector("[data-pricing-status]");

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
            <p class="plan-description">${plan.description}</p>
            <p class="plan-price"><span>${pricePrefix}${formatPrice(price)}</span> €</p>
            <p class="plan-cycle">${billingText}${yearly && price > 0 ? " · jährlich abgerechnet" : ""}</p>
          </div>
          <ul>${features}</ul>
          <a href="/contacts/">${plan.cta}<span aria-hidden="true">↗</span></a>
        </article>`;
    })
    .join("");

  status.textContent = `${serviceLabels[state.service]} · ${yearly ? "jährliche Abrechnung mit 15 % Rabatt" : "monatliche Abrechnung"}`;
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
document.querySelector("[data-year]").textContent = new Date().getFullYear();
renderPricing();
