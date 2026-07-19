const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll("[data-category]").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("这是学生个人项目的演示表单，不会提交到学校，也不代表报名成功。请以学校官方发布的信息为准。");
    form.reset();
  });
});

const countTargets = document.querySelectorAll("[data-count]");

if (countTargets.length) {
  const animateCount = (target) => {
    const end = Number(target.dataset.count);
    const duration = 1100;
    const startTime = performance.now();
    const hasDecimal = !Number.isInteger(end);

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = end * eased;
      target.textContent = hasDecimal ? value.toFixed(1) : Math.round(value).toString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        target.textContent = hasDecimal ? end.toFixed(1) : String(end);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = "true";
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.4 });

  countTargets.forEach((target) => observer.observe(target));
}
