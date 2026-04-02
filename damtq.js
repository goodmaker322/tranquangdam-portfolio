// NAVBAR EFFECT
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// FADE IN SCROLL
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.2 },
);

reveals.forEach((el) => observer.observe(el));

// SMOOTH SCROLL
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
