

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// انیمیشن نمایش عناصر هنگام اسکرول
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// افکت نور دنبال‌کننده موس
const cursorGlow = document.querySelector(".cursor-glow");

if (cursorGlow && !reduceMotion) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

// نمایش پنجره مشخصات ماشین
const modal = document.getElementById("carModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalSpeed = document.getElementById("modalSpeed");
const modalPower = document.getElementById("modalPower");
const modalPrice = document.getElementById("modalPrice");

let lastFocusedElement = null;

function openCarModal(card, button) {
  lastFocusedElement = button;

  modalTitle.textContent = card.dataset.name;
  modalSpeed.textContent = card.dataset.speed;
  modalPower.textContent = card.dataset.power;
  modalPrice.textContent = card.dataset.price;

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  closeModal.focus();
}

function hideCarModal() {
  modal.hidden = true;
  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

document.querySelectorAll(".details-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".car-card");
    openCarModal(card, button);
  });
});

closeModal.addEventListener("click", hideCarModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideCarModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    hideCarModal();
  }
});

// تغییر ماشین اصلی با انتخاب کارت
const heroCar = document.getElementById("heroCar");

document.querySelectorAll(".car-card").forEach((card) => {
  const image = card.querySelector(".car-image img");

  image.addEventListener("click", () => {
    heroCar.style.opacity = "0";
    heroCar.style.transform = "translateY(12px) scale(.97)";

    window.setTimeout(() => {
      heroCar.src = image.src;
      heroCar.alt = image.alt;

      heroCar.onload = () => {
        heroCar.style.opacity = "1";
        heroCar.style.transform = "translateY(0) scale(1)";
      };

      // اگر تصویر از قبل در حافظه بارگذاری شده باشد
      if (heroCar.complete && heroCar.naturalWidth > 0) {
        heroCar.style.opacity = "1";
        heroCar.style.transform = "translateY(0) scale(1)";
      }
    }, reduceMotion ? 0 : 220);
  });
});

// تغییر نرم تصویر اصلی
heroCar.style.transition = "opacity .25s, transform .25s";

// نمایش افکت ورود اولیه
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
