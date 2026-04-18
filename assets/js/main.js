(function () {
  "use strict";

  const API_URL =
    "https://7fa5-2405-201-b-407b-551d-38b4-7f95-d63d.ngrok-free.app/forms/submit";

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
      } else {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const formObject = {
          fields: { name, organization, email, topic, message },
          form_name: "contact",
        };
        fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(formObject),
          headers: myHeaders,
          redirect: "follow",
        })
          .then((response) => {
            if (response.ok) {
              if (status) {
                status.hidden = false;
                status.className = "form-status form-status--ok";
                status.textContent =
                  "Submission captured for demonstration only. Connect through official channels listed on this page for production correspondence. Topic: " +
                  topic +
                  ".";
              }
            }
            form.reset();
          })
          .catch((error) => {
            console.error("Error:", error);
            if (status) {
              status.hidden = false;
              status.className = "form-status form-status--err";
              status.textContent =
                "An error occurred while submitting the form. Please try again later.";
            }
          });
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
