function ready(e){"loading"!==document.readyState?e():document.addEventListener?document.addEventListener("DOMContentLoaded",e):document.attachEvent("onreadystatechange",function(){"loading"!==document.readyState&&e()})}var readyWrap=function(){"use strict";function e(e){var t=25,n=e.value.length,a=e.size;return n>a?(e.size=e.value.length,e.size):n<a&&n>t?(e.size=e.value.length,e.size):(e.size=t,e.size)}function t(){var e=new XMLHttpRequest,t=document.createElement("p"),n=new FormData(i[0]),a="http://159.203.239.117:3025/sms";c[0].value?(t.className="feedback_error",t.innerHTML="Sorry for the inconvenience, but you somehow triggered our anti-spam protection. Please use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us.",o[0].appendChild(t)):(navigator.onLine===!1&&(t.className="feedback_warning",t.innerHTML="Sorry for the inconvenience, but you are currently offline. You can't send a message while offline. You can wait until you are back online or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us.",o[0].appendChild(t)),e.addEventListener("load",function(e){200===e.target.status?(t.className="feedback_success",t.innerHTML="Your message was sent!",o[0].appendChild(t),ga("send",{hitType:"event",eventCategory:"Form",eventAction:"send",eventLabel:"Contact Form"}),i.reset()):(t.className="feedback_warning",t.innerHTML="Sorry for the inconvenience, but your message may have not sent. You can try sending it again or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us.",o[0].appendChild(t))}),e.open("POST",a,!0),e.send(n))}function n(){if(navigator.onLine===!1){var e=document.createElement("p");return a.setAttribute("disabled","true"),a.className="button form_submit disabled",e.className="feedback_warning",e.innerHTML="Sorry for the inconvenience, but you are currently offline. You can't send a message while offline. You can wait until you are back online or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us.",o[0].appendChild(e)}for(;o[0].hasChildNodes();)o[0].removeChild(o[0].firstChild);return a.removeAttribute("disabled"),a.className="button form_submit",a.className}var a=document.getElementsByClassName("form_submit")[0],o=document.getElementsByClassName("form_feedback"),r=document.getElementsByTagName("input"),i=document.getElementsByClassName("inspection_form"),s=document.getElementsByClassName("logoNav"),c=document.getElementsByClassName("form_security");if(s.length&&s[0].addEventListener("click",function(){window.location.href="index.html"}),r.length){for(var d=0;d<r.length;d++)r[d].addEventListener("input",function(t){e(t.target)});i[0].addEventListener("submit",function(e){return e.preventDefault(),t()}),window.addEventListener("online",n),window.addEventListener("offline",n)}"undefined"!=typeof smoothScroll&&smoothScroll.init({easing:"easeInOutQuad",speed:500})};ready(readyWrap);