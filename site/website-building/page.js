const steps = [...document.querySelectorAll("[data-web-step]")];
const visual = document.querySelector(".web-process-visual");
const visuals = [...document.querySelectorAll(".web-visual")];

if (steps.length && visual) {
  const activateStep = (index) => {
    visual.dataset.activeStep = String(index);
    steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
    visuals.forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === index));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) activateStep(steps.indexOf(current.target));
    },
    { rootMargin: "-28% 0px -40%", threshold: [0.15, 0.35, 0.6] },
  );

  steps.forEach((step) => observer.observe(step));
}
