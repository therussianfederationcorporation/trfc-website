(function () {
  "use strict";

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function initContactForm() {
    var form = qs("#contact-form");
    if (!form) return;

    var status = qs("#form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var name = String(fd.get("name") || "").trim();
      var org = String(fd.get("organization") || "").trim();
      var email = String(fd.get("email") || "").trim();
      var topic = String(fd.get("topic") || "");
      var message = String(fd.get("message") || "").trim();

      if (!name || !org || !email || !message) {
        if (status) {
          status.hidden = false;
          status.className = "form-status form-status--err";
          status.textContent =
            "Please complete all required fields. This form does not transmit data; it validates locally for demonstration.";
        }
        return;
      }

      if (status) {
        status.hidden = false;
        status.className = "form-status form-status--ok";
        status.textContent =
          "Submission captured for demonstration only. Connect through official channels listed on this page for production correspondence. Topic: " +
          topic +
          ".";
      }
      form.reset();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactForm);
  } else {
    initContactForm();
  }
})();
