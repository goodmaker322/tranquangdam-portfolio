// =========================
// NAVBAR SCROLL EFFECT (mượt + tối ưu)
// =========================
const navbar = document.querySelector(".navbar");

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
      ticking = false;
    });
    ticking = true;
  }
});

// =========================
// MOBILE MENU
// =========================
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // đóng khi click link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // click ngoài
  document.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
    }
  });

  // ESC đóng menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navMenu.classList.remove("active");
    }
  });

  // resize reset
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      navMenu.classList.remove("active");
    }
  });
}

// =========================
// REVEAL ANIMATION (optimized)
// =========================
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        obs.unobserve(entry.target); // chỉ chạy 1 lần
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px",
  },
);

reveals.forEach((el) => observer.observe(el));

// =========================
// SMOOTH SCROLL (có offset navbar)
// =========================
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();

    const navHeight = navbar.offsetHeight;

    const offsetTop =
      target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  });
});

// =========================
// ACTIVE MENU THEO SCROLL
// =========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

function updateActiveMenu() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveMenu);

// =========================
// PARALLAX HERO (nhẹ + mượt)
// =========================
const heroImage = document.querySelector(".hero-image img");

window.addEventListener("scroll", () => {
  if (!heroImage) return;

  const offset = window.scrollY * 0.12;
  heroImage.style.transform = `translateY(${offset}px) scale(1.02)`;
});

// =========================
// LAZY IMAGE LOAD (mượt hơn)
// =========================
const images = document.querySelectorAll("img");

const imgObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

images.forEach((img) => {
  img.style.opacity = 0;
  img.style.transition = "opacity 0.8s ease";
  imgObserver.observe(img);
});

// =========================
// BUTTON RIPPLE EFFECT (luxury touch)
// =========================
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    const diameter = Math.max(this.clientWidth, this.clientHeight);

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.position = "absolute";
    circle.style.borderRadius = "50%";
    circle.style.background = "rgba(255,255,255,0.3)";
    circle.style.transform = "scale(0)";
    circle.style.animation = "ripple 0.6s linear";
    circle.style.left = `${e.offsetX - diameter / 2}px`;
    circle.style.top = `${e.offsetY - diameter / 2}px`;

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 600);
  });
});

// inject ripple CSS
const style = document.createElement("style");
style.innerHTML = `
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
.btn {
  position: relative;
  overflow: hidden;
}
`;
document.head.appendChild(style);

// =========================
// REDUCED MOTION (accessibility)
// =========================
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

if (prefersReducedMotion.matches) {
  s;
  document.querySelectorAll("*").forEach((el) => {
    el.style.transition = "none";
    el.style.animation = "none";
  });
}
