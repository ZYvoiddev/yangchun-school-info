const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  const closeMenu = () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

const noticeBars = document.querySelectorAll(".notice-bar");
const noticeStorageKey = "yangchun-school-notice-dismissed-v1";
const noticeStorage = (() => {
  try {
    const testKey = "__yangchun_notice_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return window.localStorage;
  } catch {
    return null;
  }
})();

if (noticeBars.length && (!noticeStorage || noticeStorage.getItem(noticeStorageKey) !== "1")) {
  noticeBars.forEach((bar) => {
    if (bar.dataset.noticeReady) return;

    const text = bar.textContent.trim();
    bar.textContent = "";

    const span = document.createElement("span");
    span.className = "notice-bar-text";
    span.textContent = text;

    const close = document.createElement("button");
    close.className = "notice-close";
    close.type = "button";
    close.setAttribute("aria-label", "关闭通知栏");
    close.textContent = "×";
    close.addEventListener("click", () => {
      if (noticeStorage) {
        try {
          noticeStorage.setItem(noticeStorageKey, "1");
        } catch {
          // storage is optional
        }
      }
      bar.remove();
    });

    bar.append(span, close);
    bar.dataset.noticeReady = "true";
  });
} else if (noticeBars.length) {
  noticeBars.forEach((bar) => bar.remove());
}

const filterButtons = document.querySelectorAll("[data-filter]");
const majorCards = document.querySelectorAll(".major-card[data-category]");
const filterStatus = document.querySelector("[data-filter-status]");
const filterLabels = {
  all: "全部专业方向",
  it: "信息技术类专业",
  manufacturing: "智能制造类专业",
  service: "现代服务类专业",
};

const applyMajorFilter = (filter) => {
  let visibleCount = 0;

  filterButtons.forEach((item) => {
    const isActive = item.dataset.filter === filter;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });

  majorCards.forEach((card) => {
    const isVisible = filter === "all" || card.dataset.category === filter;
    card.hidden = !isVisible;
    card.classList.toggle("is-hidden", !isVisible);
    if (isVisible) visibleCount += 1;
  });

  if (filterStatus) {
    filterStatus.textContent = `当前显示 ${filterLabels[filter] || "所选分类"}，共 ${visibleCount} 个专业。`;
  }
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyMajorFilter(button.dataset.filter || "all");
  });
});

if (filterButtons.length && majorCards.length) {
  const activeFilter = document.querySelector("[data-filter].active")?.dataset.filter || "all";
  applyMajorFilter(activeFilter);
}

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
    const duration = 900;
    const startTime = performance.now();
    const hasDecimal = !Number.isInteger(end);

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = end * eased;
      target.textContent = hasDecimal ? value.toFixed(1) : Math.round(value).toString();

      if (progress < 1) {
        setTimeout(() => tick(performance.now()), 16);
      } else {
        target.textContent = hasDecimal ? end.toFixed(1) : String(end);
      }
    };

    setTimeout(() => tick(performance.now()), 16);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = "true";
          animateCount(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  countTargets.forEach((target) => observer.observe(target));
}

window.addEventListener("load", () => {
  if (window.lucide) {
    window.lucide.createIcons({ strokeWidth: 1.8 });
  }
});

const floatingTools = document.querySelector("[data-floating-tools]");
if (floatingTools) {
  const wechatToggle = floatingTools.querySelector("[data-wechat-toggle]");
  const popover = floatingTools.querySelector("[data-wechat-popover]");
  const topButton = floatingTools.querySelector("[data-scroll-top]");

  const setPopoverOpen = (open) => {
    if (!wechatToggle || !popover) return;
    wechatToggle.setAttribute("aria-expanded", String(open));
    popover.hidden = !open;
  };

  if (wechatToggle && popover) {
    wechatToggle.addEventListener("click", () => {
      const shouldOpen = wechatToggle.getAttribute("aria-expanded") !== "true";
      setPopoverOpen(shouldOpen);
    });

    floatingTools.addEventListener("mouseenter", () => setPopoverOpen(true));
    floatingTools.addEventListener("mouseleave", () => setPopoverOpen(false));
    floatingTools.addEventListener("focusin", () => setPopoverOpen(true));
    floatingTools.addEventListener("focusout", (event) => {
      if (!floatingTools.contains(event.relatedTarget)) {
        setPopoverOpen(false);
      }
    });
  }

  if (topButton) {
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
