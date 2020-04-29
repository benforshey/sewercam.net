"use strict";

/* eslint-env browser */
/* global ga */

function ready(fn) {
  if (document.readyState !== "loading") {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState !== "loading") {
        fn();
      }
    });
  }
}

function readyWrap() {
  var button = document.getElementsByClassName("form_submit")[0];
  var feedbackContainer = document.getElementsByClassName("form_feedback");
  var inputs = document.getElementsByTagName("input");
  var inspectionForm = document.getElementsByClassName("inspection_form");
  var logoNav = document.getElementsByClassName("logoNav");
  var security = document.getElementsByClassName("form_security");

  // Register the ServiceWorker.
  if ("serviceWorker" in navigator) {
    // The service worker cannot access parent directories (apart from explicity setting scope), so keep it in the root directory.
    navigator.serviceWorker.register("serviceWorker.js").then(function (registration) {
      console.log("ServiceWorker registration successful with scope: " + registration.scope);
    }).catch(function (e) {
      console.log("ServiceWorker registration failed: " + e);
    });
  }

  function inputWidthController(target) {
    var base = 25; // base size for all inputs
    var chars = target.value.length;
    var size = target.size;
    if (chars > size) {
      // if the input needs to expand
      target.size = target.value.length; // expand it
      return target.size;
    } else if (chars < size && chars > base) {
      // if the input contains less than its width and still has more than 15 characters
      target.size = target.value.length; // shrink it
      return target.size;
    } // otherwise
    target.size = base; // set to the base width
    return target.size;
  }

  function sendRequest() {
    var form = inspectionForm[0];
    var feedback = document.createElement("p");

    if (security[0].value) {
      feedback.className = "feedback_error";
      feedback.innerHTML = "Sorry for the inconvenience, but you somehow triggered our anti-spam protection. Please use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us.";
      feedbackContainer[0].appendChild(feedback);

      return ga("send", {
        hitType: "event",
        eventCategory: "Form",
        eventAction: "spam",
        eventLabel: "Contact Form"
      });
    } else {
      if (navigator.onLine === false) {
        feedback.className = "feedback_warning";
        feedback.innerHTML = "Sorry for the inconvenience, but you are currently offline. You can't send a message while offline. You can wait until you are back online or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us.";
        feedbackContainer[0].appendChild(feedback);

        return ga("send", {
          hitType: "event",
          eventCategory: "Form",
          eventAction: "offline",
          eventLabel: "Contact Form"
        });
      }

      button.textContent = "Sending Message…";
      button.setAttribute("disabled", "true");

      return fetch("/api/sms-send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: form.querySelector('[name="address"]').value,
          contact: form.querySelector('[name="contact"]').value,
          name: form.querySelector('[name="name"]').value,
          time: form.querySelector('[name="time"]').value
        })
      }).then(function (response) {
        if (!response.ok) {
          feedback.className = "feedback_warning";
          feedback.innerHTML = "Sorry for the inconvenience, but your message may have not sent. You can try sending it again or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us.";
          feedbackContainer[0].appendChild(feedback);

          return ga("send", {
            hitType: "event",
            eventCategory: "Form",
            eventAction: "fail",
            eventLabel: "Contact Form"
          });
        }

        feedback.className = "feedback_success";
        feedback.innerHTML = "Your message was sent!";
        feedbackContainer[0].appendChild(feedback);

        document.querySelector(".inspection_form").reset();
        button.textContent = "Send";
        button.removeAttribute("disabled");

        return ga("send", {
          hitType: "event",
          eventCategory: "Form",
          eventAction: "send",
          eventLabel: "Contact Form"
        });
      }).catch(function (error) {
        console.error(error);

        return ga("send", {
          hitType: "event",
          eventCategory: "Form",
          eventAction: "fail",
          eventLabel: "Contact Form"
        });
      });
    }
  }

  function formConnectionManager() {
    if (navigator.onLine === false) {
      var feedback = document.createElement("p");

      button.setAttribute("disabled", "true");
      button.className = "button form_submit disabled";

      feedback.className = "feedback_warning";
      feedback.innerHTML = "Sorry for the inconvenience, but you are currently offline. You can't send a message while offline. You can wait until you are back online or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us.";
      return feedbackContainer[0].appendChild(feedback);
    }
    while (feedbackContainer[0].hasChildNodes()) {
      feedbackContainer[0].removeChild(feedbackContainer[0].firstChild);
    }

    button.className = "button form_submit";
    return button.removeAttribute("disabled");
  }

  /* event listeners & function calls */
  if (logoNav.length) {
    logoNav[0].addEventListener("click", function () {
      window.location = "https://sewercam.net/";
    });
  }

  if (inputs.length) {
    // the only page with a form is 'your-sewer-scope.html'
    for (var i = 0; i < inputs.length; i += 1) {
      inputs[i].addEventListener("input", function (e) {
        inputWidthController(e.target);
      });
    }

    inspectionForm[0].addEventListener("submit", function (e) {
      e.preventDefault();
      return sendRequest();
    });

    window.addEventListener("online", formConnectionManager);

    window.addEventListener("offline", formConnectionManager);
  }
}

ready(readyWrap);
//# sourceMappingURL=main.js.map
