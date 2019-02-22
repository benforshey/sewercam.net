/* eslint-env browser */
/* global ga */

function ready(fn) {
	if (document.readyState !== 'loading') {
		fn()
	} else if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', fn)
	} else {
		document.attachEvent('onreadystatechange', () => {
			if (document.readyState !== 'loading') {
				fn()
			}
		})
	}
}

function readyWrap() {
	const button = document.getElementsByClassName('form_submit')[0]
	const feedbackContainer = document.getElementsByClassName('form_feedback')
	const inputs = document.getElementsByTagName('input')
	const inspectionForm = document.getElementsByClassName('inspection_form')
	const logoNav = document.getElementsByClassName('logoNav')
	const security = document.getElementsByClassName('form_security')

	// Register the ServiceWorker.
	if ('serviceWorker' in navigator) {
		// The service worker cannot access parent directories (apart from explicity setting scope), so keep it in the root directory.
		navigator.serviceWorker
			.register('serviceWorker.js')
			.then((registration) => {
				console.log(`ServiceWorker registration successful with scope: ${registration.scope}`)
			})
			.catch((e) => {
				console.log(`ServiceWorker registration failed: ${e}`)
			})
	}

	function inputWidthController(target) {
		const base = 25 // base size for all inputs
		const chars = target.value.length
		const size = target.size
		if (chars > size) {
			// if the input needs to expand
			target.size = target.value.length // expand it
			return target.size
		} else if (chars < size && chars > base) {
			// if the input contains less than its width and still has more than 15 characters
			target.size = target.value.length // shrink it
			return target.size
		} // otherwise
		target.size = base // set to the base width
		return target.size
	}

	function sendReport() {
		const AJAX = new XMLHttpRequest()
		const feedback = document.createElement('p')
		const payload = new FormData(inspectionForm[0])
		const URL = 'https://message.integrisweb.com/sms/'

		if (security[0].value) {
			// if the security input has a value, it's been filled
			feedback.className = 'feedback_error'
			feedback.innerHTML =
				"Sorry for the inconvenience, but you somehow triggered our anti-spam protection. Please use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us."
			feedbackContainer[0].appendChild(feedback)
		} else {
			if (navigator.onLine === false) {
				feedback.className = 'feedback_warning'
				feedback.innerHTML =
					"Sorry for the inconvenience, but you are currently offline. You can't send a message while offline. You can wait until you are back online or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us."
				feedbackContainer[0].appendChild(feedback)
			}

			AJAX.addEventListener('load', (e) => {
				if (e.target.status === 200) {
					// if the message was sent
					feedback.className = 'feedback_success'
					feedback.innerHTML = 'Your message was sent!'
					feedbackContainer[0].appendChild(feedback)

					ga('send', {
						// since GA is loaded in the head, assume its presence
						hitType: 'event',
						eventCategory: 'Form',
						eventAction: 'send',
						eventLabel: 'Contact Form'
					})

					document.querySelector('.inspection_form').reset() // empty the form on success
				} else {
					// something nonspecific has gone wrong
					feedback.className = 'feedback_warning'
					feedback.innerHTML =
						"Sorry for the inconvenience, but your message may have not sent. You can try sending it again or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us."
					feedbackContainer[0].appendChild(feedback)
				}
			})

			AJAX.open('POST', URL, true)
			AJAX.send(payload)
		}
	}

	function formConnectionManager() {
		if (navigator.onLine === false) {
			const feedback = document.createElement('p')

			button.setAttribute('disabled', 'true')
			button.className = 'button form_submit disabled'

			feedback.className = 'feedback_warning'
			feedback.innerHTML =
				"Sorry for the inconvenience, but you are currently offline. You can't send a message while offline. You can wait until you are back online or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us."
			return feedbackContainer[0].appendChild(feedback)
		}
		while (feedbackContainer[0].hasChildNodes()) {
			feedbackContainer[0].removeChild(feedbackContainer[0].firstChild)
		}

		button.removeAttribute('disabled')
		button.className = 'button form_submit'
		return button.className
	}

	/* event listeners & function calls */
	if (logoNav.length) {
		logoNav[0].addEventListener('click', () => {
			window.location = 'https://sewercam.net/'
		})
	}

	if (inputs.length) {
		// the only page with a form is 'your-sewer-scope.html'
		for (let i = 0; i < inputs.length; i += 1) {
			inputs[i].addEventListener('input', (e) => {
				inputWidthController(e.target)
			})
		}

		inspectionForm[0].addEventListener('submit', (e) => {
			e.preventDefault()
			return sendReport()
		})

		window.addEventListener('online', formConnectionManager)

		window.addEventListener('offline', formConnectionManager)
	}
}

ready(readyWrap)
