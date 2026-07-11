/* ==========================================================================
   ANSHUMAN MOHAPATRA — PORTFOLIO INTERACTIONS
   Vanilla JS, no dependencies. Respects prefers-reduced-motion throughout.
   ========================================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Footer year -------------------------------------------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Sticky nav: shadow/border after scroll ------------------------ */
  var nav = document.getElementById("siteNav");
  var lastScrollState = false;

  function updateNavState() {
    var scrolled = window.scrollY > 8;
    if (scrolled !== lastScrollState) {
      nav.classList.toggle("scrolled", scrolled);
      lastScrollState = scrolled;
    }
  }
  window.addEventListener("scroll", updateNavState, { passive: true });
  updateNavState();

  /* ---- Mobile nav toggle ---------------------------------------------- */
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  var navToggleIcon = document.getElementById("navToggleIcon");

  function closeMobileNav() {
    mobileNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggleIcon.innerHTML = '<use href="#i-menu"></use>';
    document.body.style.overflow = "";
  }

  function openMobileNav() {
    mobileNav.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggleIcon.innerHTML = '<use href="#i-close"></use>';
    document.body.style.overflow = "hidden";
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.contains("open");
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  /* Close mobile nav after tapping a link */
  if (mobileNav) {
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileNav);
    });
  }

  /* Close mobile nav on Escape */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileNav.classList.contains("open")) {
      closeMobileNav();
      navToggle.focus();
    }
  });

  /* ---- Scroll reveal ---------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---- Active nav link highlighting on scroll --------------------------- */
  var sections = document.querySelectorAll("main section[id], header[id]");
  var navLinks = document.querySelectorAll(".nav-links a");

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var match = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active", match);
      if (match) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---- Only allow one expanded case-study block per project at a time ---
     (keeps the case study readable — expanding "Security" while
     "Engineering Decisions" is open doesn't create a huge wall of text) */
  document.querySelectorAll(".project").forEach(function (project) {
    var blocks = project.querySelectorAll(".expand-block");
    blocks.forEach(function (block) {
      block.addEventListener("toggle", function () {
        if (block.open) {
          blocks.forEach(function (other) {
            if (other !== block) other.open = false;
          });
        }
      });
    });
  });
})();
