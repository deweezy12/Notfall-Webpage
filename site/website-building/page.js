const steps = [...document.querySelectorAll("[data-web-step]")];
const visual = document.querySelector(".web-process-visual");
const visuals = [...document.querySelectorAll(".web-process-sticky .web-visual")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// Chat-Card: erst "tippt...", dann schreibt sich die Antwort Buchstabe für Buchstabe.
const chatTimers = new WeakMap();
const playChat = (scene, active) => {
  const bubble = scene.querySelector("[data-reply]");
  const target = bubble?.querySelector("[data-type]");
  if (!target) return;
  clearTimeout(chatTimers.get(bubble));
  bubble.classList.remove("is-replying", "is-done");
  target.textContent = "";
  if (!active) return;
  const text = bubble.dataset.reply;
  if (reduceMotion.matches) {
    target.textContent = text;
    bubble.classList.add("is-replying", "is-done");
    return;
  }
  let index = 0;
  const tick = () => {
    target.textContent = text.slice(0, ++index);
    if (index < text.length) chatTimers.set(bubble, setTimeout(tick, 34));
    else bubble.classList.add("is-done");
  };
  chatTimers.set(bubble, setTimeout(() => {
    bubble.classList.add("is-replying");
    tick();
  }, 2600));
};

const setActive = (scene, active) => {
  scene.classList.toggle("is-active", active);
  if (scene.matches("[data-chat]")) playChat(scene, active);
};

if (steps.length && visual) {
  // Mobile: dieselbe Card direkt unter dem jeweiligen Text anzeigen.
  const inlineScenes = steps.map((step, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "web-process-inline";
    wrapper.setAttribute("aria-hidden", "true");
    const frame = document.createElement("div");
    frame.className = "web-process-visual";
    const scene = visuals[index].cloneNode(true);
    scene.classList.remove("is-active");
    frame.append(scene);
    wrapper.append(frame);
    step.append(wrapper);
    return scene;
  });

  const activateStep = (index) => {
    visual.dataset.activeStep = String(index);
    steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
    visuals.forEach((item, itemIndex) => {
      if (item.classList.contains("is-active") !== (itemIndex === index)) setActive(item, itemIndex === index);
    });
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

  const inlineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const scene = entry.target.querySelector(".web-visual");
        if (scene.classList.contains("is-active") !== entry.isIntersecting) setActive(scene, entry.isIntersecting);
      });
    },
    { threshold: 0.35 },
  );
  inlineScenes.forEach((scene) => inlineObserver.observe(scene.closest(".web-process-inline")));

  setActive(visuals[0], true);
}
