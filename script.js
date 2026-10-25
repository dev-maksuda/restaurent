/* ============================================================
   FLAVORA RESTAURANT — script.js
   All the interactions of the site live in this file.
   Each job is kept in a small function so the code stays easy to read.
============================================================ */

/* ---------- Small helper functions ---------- */
// Select one element
const $ = (selector) => document.querySelector(selector);
// Select many elements
const $$ = (selector) => [...document.querySelectorAll(selector)];

// Show a small notification message
let toastTimer;
function toast(message, isError = false) {
  const box = $("#toast");
  box.textContent = message;
  box.classList.toggle("is-error", isError);
  box.classList.add("is-show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => box.classList.remove("is-show"), 3200);
}

/* ============================================================
   1. PRELOADER
============================================================ */
window.addEventListener("load", () => {
  setTimeout(() => $("#preloader").classList.add("is-hidden"), 500);
});

/* ============================================================
   2. HEADER - scroll effect, mobile menu and scroll spy
============================================================ */
const header = $("#header");
const navToggle = $("#navToggle");
const nav = $("#nav");

// White header background and back to top button while scrolling
function handleScroll() {
  const y = window.scrollY;

  header.classList.toggle("scrolled", y > 60);
  $("#toTop").classList.toggle("is-show", y > 500);

  // Highlight the menu item of the section in view
  $$("main section[id]").forEach((section) => {
    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;

    if (y >= top && y < bottom) {
      $$(".nav__link").forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${section.id}`);
      });
    }
  });
}

window.addEventListener("scroll", handleScroll);
handleScroll();

// Open and close the mobile menu
navToggle.addEventListener("click", () => {
  nav.classList.toggle("is-open");
  navToggle.classList.toggle("is-open");
});

// Close the menu when a menu link is clicked
$$(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
  });
});

/* ============================================================
   3. SLIDER (the same function powers the hero and the testimonials)
============================================================ */
function createSlider({ items, dotsWrap, prevBtn, nextBtn, delay = 5000 }) {
  if (!items.length) return;

  const dots = dotsWrap ? $$(`${dotsWrap} button`) : [];
  let current = 0;
  let timer = null;

  function show(index) {
    current = (index + items.length) % items.length;

    items.forEach((el, i) => el.classList.toggle("is-active", i === current));
    dots.forEach((el, i) => el.classList.toggle("is-active", i === current));
  }

  function start() {
    stop();
    timer = setInterval(() => show(current + 1), delay);
  }

  function stop() {
    clearInterval(timer);
  }

  dots.forEach((dot, i) =>
    dot.addEventListener("click", () => {
      show(i);
      start();
    })
  );

  if (prevBtn) $(prevBtn).addEventListener("click", () => { show(current - 1); start(); });
  if (nextBtn) $(nextBtn).addEventListener("click", () => { show(current + 1); start(); });

  // Pause autoplay while the mouse is over the slider
  items[0].parentElement.addEventListener("mouseenter", stop);
  items[0].parentElement.addEventListener("mouseleave", start);

  show(0);
  start();
}

// Hero slider
createSlider({
  items: $$(".hero__slide"),
  dotsWrap: "#heroDots",
  prevBtn: "#heroPrev",
  nextBtn: "#heroNext",
  delay: 6000,
});

// Testimonial slider
createSlider({
  items: $$(".t-card"),
  dotsWrap: "#tDots",
  delay: 5500,
});

/* ============================================================
   4. FILTER TABS (same code for dishes, menu and gallery)
============================================================ */
$$(".tabs").forEach((tabsBox) => {
  const grid = $(tabsBox.dataset.target);
  if (!grid) return;

  tabsBox.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      tabsBox.querySelectorAll(".tab").forEach((b) => b.classList.remove("is-active"));
      button.classList.add("is-active");

      const filter = button.dataset.filter;

      grid.querySelectorAll("[data-cat]").forEach((item) => {
        const match = filter === "all" || item.dataset.cat === filter;
        item.classList.toggle("is-hide", !match);
      });
    });
  });
});

/* ============================================================
   5. COUNTDOWN TIMER (offer section)
============================================================ */
const OFFER_KEY = "flavoraOfferEnd";

// Offer end time - saved in the browser, so a refresh does not reset it
function getOfferEnd() {
  const saved = localStorage.getItem(OFFER_KEY);
  if (saved && Number(saved) > Date.now()) return Number(saved);

  const end = Date.now() + 3 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000; // 3 days and 8 hours
  localStorage.setItem(OFFER_KEY, end);
  return end;
}

const offerEnd = getOfferEnd();

function updateCountdown() {
  let left = offerEnd - Date.now();
  if (left < 0) left = 0;

  const day = Math.floor(left / (1000 * 60 * 60 * 24));
  const hour = Math.floor((left / (1000 * 60 * 60)) % 24);
  const min = Math.floor((left / (1000 * 60)) % 60);
  const sec = Math.floor((left / 1000) % 60);

  // Always show two digits (for example 05)
  const pad = (num) => String(num).padStart(2, "0");

  $("#tDay").textContent = pad(day);
  $("#tHour").textContent = pad(hour);
  $("#tMin").textContent = pad(min);
  $("#tSec").textContent = pad(sec);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ============================================================
   6. SCROLL ANIMATION + COUNTER
============================================================ */
const revealItems = $$(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

// Cards in the same row appear one after another for a nicer effect
revealItems.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 90}ms`;
  revealObserver.observe(el);
});

// Counting animation for the numbers (stats section)
function countUp(el) {
  const target = Number(el.dataset.count);
  const duration = 1600;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(progress * target);

    // Show the short form above 1000 (for example 12k)
    el.textContent = target >= 1000 && value >= 1000
      ? `${Math.floor(value / 1000)}k+`
      : value.toLocaleString("en-US");

    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target >= 1000 ? `${target / 1000}k+` : target.toLocaleString("en-US");
  }

  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countUp(entry.target);
      statObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

$$(".stat__num").forEach((el) => statObserver.observe(el));

/* ============================================================
   7. GALLERY LIGHTBOX
============================================================ */
const lightbox = $("#lightbox");
const lightboxImg = $("#lightboxImg");

$$(".gallery__item").forEach((item) => {
  item.addEventListener("click", () => {
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add("is-open");
  });
});

// Three ways to close the lightbox - button, outside click and the Esc key
function closeLightbox() {
  lightbox.classList.remove("is-open");
}

$("#lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* ============================================================
   8. HEART BUTTON ON THE DISH CARDS
============================================================ */
$$(".dish-card__fav").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("is-liked");
    const liked = button.classList.contains("is-liked");
    button.textContent = liked ? "♥" : "♡";
    toast(liked ? "Dish saved to your favourites!" : "Removed from favourites.");
  });
});

/* ============================================================
   9. DEFAULT VALUES FOR THE DATE AND TIME PICKERS (today)
============================================================ */
const dateInput = $("#rDate");
const today = new Date();
const todayText = today.toISOString().split("T")[0];

dateInput.value = todayText;
dateInput.min = todayText;
$("#rTime").value = "19:30";

/* ============================================================
   10. RESERVATION FORM VALIDATION
============================================================ */
$("#reserveForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = $("#rName");
  const phone = $("#rPhone");
  const date = $("#rDate");
  const time = $("#rTime");

  // Clear the error style of the previous attempt
  [name, phone, date, time].forEach((el) => el.classList.remove("is-error"));

  // The name must be at least 3 characters long
  if (name.value.trim().length < 3) {
    name.classList.add("is-error");
    return toast("Please write your full name (at least 3 letters).", true);
  }

  // Check the Bangladeshi mobile number format
  if (!/^01[3-9]\d{8}$/.test(phone.value.trim())) {
    phone.classList.add("is-error");
    return toast("Please give a valid phone number like 01712345678.", true);
  }

  // Date and time cannot be empty
  if (!date.value) {
    date.classList.add("is-error");
    return toast("Please choose a reservation date.", true);
  }

  if (!time.value) {
    time.classList.add("is-error");
    return toast("Please choose a reservation time.", true);
  }

  // Everything is fine, show the success message
  const guests = $("#rGuest").value;
  toast(`Thank you ${name.value.trim()}! Table for ${guests} is booked on ${date.value} at ${time.value}.`);

  e.target.reset();
  date.value = todayText;
  time.value = "19:30";
});

/* ============================================================
   11. NEWSLETTER FORM
============================================================ */
$("#newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = $("#nEmail");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(email.value.trim())) {
    return toast("Please enter a correct email address.", true);
  }

  toast("Subscribed! Your 10% discount code is on the way 🎉");
  e.target.reset();
});

/* ============================================================
   12. BACK TO TOP BUTTON
============================================================ */
$("#toTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
