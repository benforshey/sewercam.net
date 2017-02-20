/* eslint-env browser */
/* global ga */
function ready (fn) {
  if (document.readyState !== 'loading') {
    fn()
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn)
  } else {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState !== 'loading') {
        fn()
      }
    })
  }
}

var readyWrap = function () {
  'use strict'

  var button = document.getElementsByClassName('form_submit')[0]
  var feedbackContainer = document.getElementsByClassName('form_feedback')
  var inputs = document.getElementsByTagName('input')
  var inspectionForm = document.getElementsByClassName('inspection_form')
  var logoNav = document.getElementsByClassName('logoNav')
  var security = document.getElementsByClassName('form_security')

  function inputWidthController (target) {
    var base = 25 // base size for all inputs
    var chars = target.value.length
    var size = target.size
    if (chars > size) { // if the input needs to expand
      target.size = target.value.length // expand it
      return target.size
    } else if (chars < size && chars > base) { // if the input contains less than its width and still has more than 15 characters
      target.size = target.value.length // shrink it
      return target.size
    } else { // otherwise
      target.size = base // set to the base width
      return target.size
    }
  }

  function sendReport () {
    var AJAX = new XMLHttpRequest()
    var feedback = document.createElement('p')
    var payload = new FormData(inspectionForm[0])
    var URL = 'http://159.203.239.117:3025/sms'

    if (security[0].value) { // if the security input has a value, it's been filled
      feedback.className = 'feedback_error'
      feedback.innerHTML = "Sorry for the inconvenience, but you somehow triggered our anti-spam protection. Please use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us."
      feedbackContainer[0].appendChild(feedback)
    } else {
      if (navigator.onLine === false) {
        feedback.className = 'feedback_warning'
        feedback.innerHTML = "Sorry for the inconvenience, but you are currently offline. You can't send a message while offline. You can wait until you are back online or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us."
        feedbackContainer[0].appendChild(feedback)
      }

      AJAX.addEventListener('load', function (e) {
        if (e.target.status === 200) { // if the message was sent
          feedback.className = 'feedback_success'
          feedback.innerHTML = 'Your message was sent!'
          feedbackContainer[0].appendChild(feedback)

          ga('send', {  // since GA is loaded in the head, assume its presence
            hitType: 'event',
            eventCategory: 'Form',
            eventAction: 'send',
            eventLabel: 'Contact Form'
          })

          inspectionForm.reset()  // empty the form on success
        } else { // something nonspecific has gone wrong
          feedback.className = 'feedback_warning'
          feedback.innerHTML = "Sorry for the inconvenience, but your message may have not sent. You can try sending it again or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us."
          feedbackContainer[0].appendChild(feedback)
        }
      })

      AJAX.open('POST', URL, true)
      AJAX.send(payload)
    }
  }

  function formConnectionManager () {
    if (navigator.onLine === false) {
      var feedback = document.createElement('p')

      button.setAttribute('disabled', 'true')
      button.className = 'button form_submit disabled'

      feedback.className = 'feedback_warning'
      feedback.innerHTML = "Sorry for the inconvenience, but you are currently offline. You can't send a message while offline. You can wait until you are back online or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us."
      return feedbackContainer[0].appendChild(feedback)
    } else {
      while (feedbackContainer[0].hasChildNodes()) {
        feedbackContainer[0].removeChild(feedbackContainer[0].firstChild)
      }

      button.removeAttribute('disabled')
      button.className = 'button form_submit'
      return button.className
    }
  }

  /* event listeners & function calls */

  if (logoNav.length) {
    logoNav[0].addEventListener('click', function () {
      window.location.href = 'index.html'
    })
  }

  if (inputs.length) { // the only page with a form is 'your-sewer-scope.html'

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', function (e) {
        inputWidthController(e.target)
      })
    }

    inspectionForm[0].addEventListener('submit', function (e) {
      e.preventDefault()
      return sendReport()
    })

    window.addEventListener('online', formConnectionManager)

    window.addEventListener('offline', formConnectionManager)
  }

  if (typeof smoothScroll !== 'undefined') { // check if smoothScroll script is present
    smoothScroll.init({ // init smooth scroll
      easing: 'easeInOutQuad',
      speed: 500
    })
  }
}

ready(readyWrap)
