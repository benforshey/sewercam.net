"use strict";function ready(e){"loading"!==document.readyState?e():document.addEventListener?document.addEventListener("DOMContentLoaded",e):document.attachEvent("onreadystatechange",function(){"loading"!==document.readyState&&e()})}function readyWrap(){var e=document.getElementsByClassName("form_submit")[0],t=document.getElementsByClassName("form_feedback"),n=document.getElementsByTagName("input"),a=document.getElementsByClassName("inspection_form"),o=document.getElementsByClassName("logoNav"),r=document.getElementsByClassName("form_security");function i(){if(!1===navigator.onLine){var n=document.createElement("p");return e.setAttribute("disabled","true"),e.className="button form_submit disabled",n.className="feedback_warning",n.innerHTML="Sorry for the inconvenience, but you are currently offline. You can't send a message while offline. You can wait until you are back online or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us.",t[0].appendChild(n)}for(;t[0].hasChildNodes();)t[0].removeChild(t[0].firstChild);return e.className="button form_submit",e.removeAttribute("disabled")}if("serviceWorker"in navigator&&navigator.serviceWorker.register("serviceWorker.js").then(function(e){console.log("ServiceWorker registration successful with scope: "+e.scope)}).catch(function(e){console.log("ServiceWorker registration failed: "+e)}),o.length&&o[0].addEventListener("click",function(){window.location="https://sewercam.net/"}),n.length){for(var s=0;s<n.length;s+=1)n[s].addEventListener("input",function(e){var t,n,a;t=e.target,n=t.value.length,a=t.size,n>a?(t.size=t.value.length,t.size):n<a&&n>25?(t.size=t.value.length,t.size):(t.size=25,t.size)});a[0].addEventListener("submit",function(n){return n.preventDefault(),o=a[0],i=document.createElement("p"),r[0].value?(i.className="feedback_error",i.innerHTML="Sorry for the inconvenience, but you somehow triggered our anti-spam protection. Please use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us.",t[0].appendChild(i),ga("send",{hitType:"event",eventCategory:"Form",eventAction:"spam",eventLabel:"Contact Form"})):!1===navigator.onLine?(i.className="feedback_warning",i.innerHTML="Sorry for the inconvenience, but you are currently offline. You can't send a message while offline. You can wait until you are back online or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us.",t[0].appendChild(i),ga("send",{hitType:"event",eventCategory:"Form",eventAction:"offline",eventLabel:"Contact Form"})):(e.textContent="Sending Message…",e.setAttribute("disabled","true"),fetch("/api/sms-send",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({address:o.querySelector('[name="address"]').value,contact:o.querySelector('[name="contact"]').value,name:o.querySelector('[name="name"]').value,time:o.querySelector('[name="time"]').value})}).then(function(n){return n.ok?(i.className="feedback_success",i.innerHTML="Your message was sent!",t[0].appendChild(i),document.querySelector(".inspection_form").reset(),e.textContent="Send",e.removeAttribute("disabled"),ga("send",{hitType:"event",eventCategory:"Form",eventAction:"send",eventLabel:"Contact Form"})):(i.className="feedback_warning",i.innerHTML="Sorry for the inconvenience, but your message may have not sent. You can try sending it again or use the contact information at the <a data-scroll href='#footer'>bottom of the page</a> to reach us.",t[0].appendChild(i),ga("send",{hitType:"event",eventCategory:"Form",eventAction:"fail",eventLabel:"Contact Form"}))}).catch(function(e){return console.error(e),ga("send",{hitType:"event",eventCategory:"Form",eventAction:"fail",eventLabel:"Contact Form"})}));var o,i}),window.addEventListener("online",i),window.addEventListener("offline",i)}}ready(readyWrap);
//# sourceMappingURL=main-min.js.map