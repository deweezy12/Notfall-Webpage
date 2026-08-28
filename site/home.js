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

renderPricing();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!reduceMotion.matches) {
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
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

const projectsSection = document.querySelector(".projects-section");

if (projectsSection && window.gsap && window.ScrollTrigger) {
  window.gsap.registerPlugin(window.ScrollTrigger);

  const stage = projectsSection.querySelector("[data-projects-stage]");
  const track = projectsSection.querySelector("[data-project-track]");
  const projectCards = [...projectsSection.querySelectorAll(".project-card")];
  const media = window.gsap.matchMedia();

  media.add("(min-width: 981px) and (prefers-reduced-motion: no-preference)", () => {
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const horizontalTween = window.gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: () => `+=${Math.max(distance(), window.innerWidth * 2.5)}`,
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: ({ progress: timelineProgress }) => {
          document.body.style.setProperty("--work-dim", String(Math.min(1, timelineProgress * 8, (1 - timelineProgress) * 8)));
        },
        onLeave: () => document.body.style.setProperty("--work-dim", "0"),
        onLeaveBack: () => document.body.style.setProperty("--work-dim", "0"),
      },
    });

    projectCards.forEach((card) => {
      const image = card.querySelector("img");
      if (image) {
        window.gsap.fromTo(
          image,
          { xPercent: -3 },
          {
            xPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      }
    });

    const focusCard = (event) => {
      const card = event.target.closest(".project-card");
      if (!card) {
        return;
      }

      const targetX = Math.min(distance(), Math.max(0, card.offsetLeft - (window.innerWidth - card.offsetWidth) / 2));
      const scrollTrigger = horizontalTween.scrollTrigger;
      const targetScroll = scrollTrigger.start + (targetX / Math.max(1, distance())) * (scrollTrigger.end - scrollTrigger.start);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    };

    track.addEventListener("focusin", focusCard);
    document.fonts?.ready.then(() => window.ScrollTrigger.refresh());

    return () => {
      track.removeEventListener("focusin", focusCard);
      document.body.style.setProperty("--work-dim", "0");
    };
  });
}

document.querySelector("[data-year]").textContent = new Date().getFullYear();
