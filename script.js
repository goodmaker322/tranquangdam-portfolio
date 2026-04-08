(function () {
  // Mobile Menu
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".menu-overlay");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function toggleMenu() {
    menuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = mobileMenu.classList.contains("active")
      ? "hidden"
      : "";
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
    mobileLinks.forEach((link) => link.addEventListener("click", toggleMenu));
  }

  // Reveal Animation
  const reveals = document.querySelectorAll(".reveal");
  function checkReveal() {
    for (let el of reveals) {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - 100) el.classList.add("visible");
    }
  }

  window.addEventListener("scroll", checkReveal);
  window.addEventListener("resize", checkReveal);
  checkReveal();

  // Header Scroll Effect
  const header = document.querySelector(".luxury-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.background = "rgba(8, 22, 22, 0.9)";
      header.style.padding = "0.8rem clamp(1rem, 5vw, 5rem)";
    } else {
      header.style.background = "rgba(10, 26, 26, 0.75)";
      header.style.padding = "1.2rem clamp(1rem, 5vw, 5rem)";
    }
  });

  // Close mobile menu on window resize
  window.addEventListener("resize", () => {
    if (
      window.innerWidth > 768 &&
      mobileMenu &&
      mobileMenu.classList.contains("active")
    ) {
      toggleMenu();
    }
  });
})();
// Popup functions
function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.remove("active");

    // Check if any other popup is still open
    const activePopups = document.querySelectorAll(".popup-overlay.active");
    if (activePopups.length === 0) {
      document.body.style.overflow = "";
    }
  }
}

// Close popup when clicking outside
document.querySelectorAll(".popup-overlay").forEach((overlay) => {
  overlay.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("active");
      const activePopups = document.querySelectorAll(".popup-overlay.active");
      if (activePopups.length === 0) {
        document.body.style.overflow = "";
      }
    }
  });
});

// Close popup with ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll(".popup-overlay.active").forEach((popup) => {
      popup.classList.remove("active");
    });
    document.body.style.overflow = "";
  }
});

// Tự động hiển thị popup khuyến mãi sau 10 giây (chỉ hiện 1 lần mỗi phiên)
let promoShown = sessionStorage.getItem("promoPopupShown");

if (!promoShown) {
  setTimeout(() => {
    openPopup("promoPopup");
    sessionStorage.setItem("promoPopupShown", "true");
  }, 10000); // 10 giây
}

// Tự động hiển thị popup gọi điện khi người dùng scroll đến cuối trang
let callPopupShown = sessionStorage.getItem("callPopupShown");
let hasScrolledToBottom = false;

window.addEventListener("scroll", () => {
  if (!hasScrolledToBottom && !callPopupShown) {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 100) {
      hasScrolledToBottom = true;
      setTimeout(() => {
        openPopup("callPopup");
        sessionStorage.setItem("callPopupShown", "true");
      }, 500);
    }
  }
});

// Hiển thị popup email khi người dùng rời khỏi trang (exit intent)
let emailPopupShown = sessionStorage.getItem("emailPopupShown");

if (!emailPopupShown) {
  document.addEventListener("mouseleave", function (e) {
    if (e.clientY < 0 && !emailPopupShown) {
      openPopup("emailPopup");
      sessionStorage.setItem("emailPopupShown", "true");
      emailPopupShown = true;
    }
  });
}

// Sticky CTA button (nút gọi điện cố định góc phải)
const stickyCTA = document.createElement("div");
stickyCTA.innerHTML = `
        <div style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        ">
            <button onclick="openPopup('callPopup')" style="
                width: 55px;
                height: 55px;
                border-radius: 50%;
                background: linear-gradient(145deg, var(--gold-silver), var(--gold-silver-dark));
                border: 1px solid var(--gold-silver-light);
                color: var(--bg-deep);
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 8px 25px rgba(196, 181, 154, 0.3);
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
            " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                <i class="fas fa-phone-alt"></i>
            </button>
    `;
document.body.appendChild(stickyCTA);
