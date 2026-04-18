(function () {
  "use strict";

  var STORAGE_KEY = "trfc-theme";
  var pages = [
    { id: "home", href: "index.html", label: "Home" },
    { id: "about", href: "about.html", label: "About & Governance" },
    { id: "divisions", href: "divisions.html", label: "Divisions" },
    { id: "team", href: "team.html", label: "Leadership" },
    { id: "contact", href: "contact.html", label: "Contact" },
  ];

  function getActivePage() {
    var body = document.body;
    if (body && body.dataset && body.dataset.page) {
      return body.dataset.page;
    }
    var path = window.location.pathname.split("/").pop() || "index.html";
    if (path === "" || path === "/") return "home";
    var map = {
      "index.html": "home",
      "about.html": "about",
      "divisions.html": "divisions",
      "team.html": "team",
      "contact.html": "contact",
    };
    return map[path] || "home";
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function buildNav(active) {
    var items = pages
      .map(function (p) {
        var isCurrent = p.id === active;
        var cls = isCurrent ? ' class="site-nav__link site-nav__link--current"' : ' class="site-nav__link"';
        var aria = isCurrent ? ' aria-current="page"' : "";
        return (
          "<li><a" +
          cls +
          ' href="' +
          escapeHtml(p.href) +
          '"' +
          aria +
          ">" +
          escapeHtml(p.label) +
          "</a></li>"
        );
      })
      .join("");

    return (
      '<a class="skip-link" href="#main">Skip to main content</a>' +
      '<header class="site-header" role="banner">' +
      '<div class="site-header__inner">' +
      '<div class="site-brand">' +
      '<a class="site-brand__link" href="index.html">' +
      '<span class="site-brand__mark" aria-hidden="true"></span>' +
      '<span class="site-brand__text">' +
      '<span class="site-brand__title">The Russian Federation Corporation</span>' +
      '<span class="site-brand__subtitle">Federal technology &amp; systems directorate</span>' +
      "</span>" +
      "</a>" +
      "</div>" +
      '<button type="button" class="theme-toggle" id="theme-toggle" aria-pressed="false" aria-label="Toggle color theme">' +
      '<span class="theme-toggle__icon" aria-hidden="true"></span>' +
      '<span class="theme-toggle__label">Theme</span>' +
      "</button>" +
      '<button type="button" class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="site-nav">' +
      '<span class="nav-toggle__bar" aria-hidden="true"></span>' +
      '<span class="nav-toggle__bar" aria-hidden="true"></span>' +
      '<span class="nav-toggle__bar" aria-hidden="true"></span>' +
      '<span class="visually-hidden">Menu</span>' +
      "</button>" +
      '<nav class="site-nav" id="site-nav" aria-label="Primary">' +
      "<ul>" +
      items +
      "</ul>" +
      "</nav>" +
      "</div>" +
      "</header>"
    );
  }

  function buildFooter() {
    var year = new Date().getFullYear();
    return (
      '<footer class="site-footer" role="contentinfo">' +
      '<div class="site-footer__grid">' +
      '<div>' +
      '<p class="site-footer__title">The Russian Federation Corporation</p>' +
      "<p class=\"site-footer__muted\">Unified coordination for federal R&amp;D, engineering, and operational technology programs.</p>" +
      "</div>" +
      '<div class="site-footer__links">' +
      '<a href="about.html#compliance">Compliance</a>' +
      '<a href="about.html#regulations">Regulations</a>' +
      '<a href="divisions.html">Divisions</a>' +
      '<a href="contact.html">Secure inquiries</a>' +
      "</div>" +
      "</div>" +
      '<p class="site-footer__legal">Publication for official coordination purposes. Unclassified overview. &copy; ' +
      year +
      " TRFC. All rights reserved.</p>" +
      "</footer>"
    );
  }

  function applyStoredTheme() {
    var stored = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      stored = null;
    }
    var mode =
      stored === "light" || stored === "dark"
        ? stored
        : "dark";
    document.documentElement.setAttribute("data-theme", mode);
    syncThemeToggle(mode);
    return mode;
  }

  function setTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch (e) {
      /* ignore */
    }
    syncThemeToggle(mode);
  }

  function syncThemeToggle(mode) {
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute("aria-pressed", mode === "light" ? "true" : "false");
    }
  }

  function wireThemeToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  function wireNavToggle() {
    var nav = document.getElementById("site-nav");
    var toggle = document.getElementById("nav-toggle");
    if (!nav || !toggle) return;

    function close() {
      nav.classList.remove("site-nav--open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("site-nav--open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", close);
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 960px)").matches) {
        close();
      }
    });
  }

  function mount() {
    var active = getActivePage();
    var headerMount = document.querySelector("[data-site-header]");
    var footerMount = document.querySelector("[data-site-footer]");
    if (headerMount) {
      headerMount.outerHTML = buildNav(active);
    }
    if (footerMount) {
      footerMount.outerHTML = buildFooter();
    }
    applyStoredTheme();
    wireThemeToggle();
    wireNavToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
