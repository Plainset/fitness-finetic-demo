(function () {
  "use strict";

  // Mobile nav toggle
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  if (header && toggle) {
    toggle.addEventListener("click", function () {
      var open = header.getAttribute("data-nav-open") === "true";
      header.setAttribute("data-nav-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });

    header.querySelectorAll(".primary-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.setAttribute("data-nav-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll-reveal
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll("[data-reveal]");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
