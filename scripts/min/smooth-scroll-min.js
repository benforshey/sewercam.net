!function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.smoothScroll=t(e)}("undefined"!=typeof global?global:this.window||this.global,function(e){"use strict";var t={},n="querySelector"in document&&"addEventListener"in e,o,r,a,u,c={selector:"[data-scroll]",selectorHeader:"[data-scroll-header]",speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callback:function(){}},i=function(){var e={},t=!1,n=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],n++);for(var r=function(n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t&&"[object Object]"===Object.prototype.toString.call(n[o])?e[o]=i(!0,e[o],n[o]):e[o]=n[o])};o>n;n++){var a=arguments[n];r(a)}return e},s=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},l=function(e,t){var n=t.charAt(0),o="classList"in document.documentElement,r,a;for("["===n&&(t=t.substr(1,t.length-2),r=t.split("="),r.length>1&&(a=!0,r[1]=r[1].replace(/"/g,"").replace(/'/g,"")));e&&e!==document;e=e.parentNode){if("."===n)if(o){if(e.classList.contains(t.substr(1)))return e}else if(new RegExp("(^|\\s)"+t.substr(1)+"(\\s|$)").test(e.className))return e;if("#"===n&&e.id===t.substr(1))return e;if("["===n&&e.hasAttribute(r[0])){if(!a)return e;if(e.getAttribute(r[0])===r[1])return e}if(e.tagName.toLowerCase()===t)return e}return null},f=function(e){for(var t=String(e),n=t.length,o=-1,r,a="",u=t.charCodeAt(0);++o<n;){if(r=t.charCodeAt(o),0===r)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");a+=r>=1&&31>=r||127==r||0===o&&r>=48&&57>=r||1===o&&r>=48&&57>=r&&45===u?"\\"+r.toString(16)+" ":r>=128||45===r||95===r||r>=48&&57>=r||r>=65&&90>=r||r>=97&&122>=r?t.charAt(o):"\\"+t.charAt(o)}return a},d=function(e,t){var n;return"easeInQuad"===e&&(n=t*t),"easeOutQuad"===e&&(n=t*(2-t)),"easeInOutQuad"===e&&(n=.5>t?2*t*t:-1+(4-2*t)*t),"easeInCubic"===e&&(n=t*t*t),"easeOutCubic"===e&&(n=--t*t*t+1),"easeInOutCubic"===e&&(n=.5>t?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e&&(n=t*t*t*t),"easeOutQuart"===e&&(n=1- --t*t*t*t),"easeInOutQuart"===e&&(n=.5>t?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e&&(n=t*t*t*t*t),"easeOutQuint"===e&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e&&(n=.5>t?16*t*t*t*t*t:1+16*--t*t*t*t*t),n||t},m=function(e,t,n){var o=0;if(e.offsetParent)do o+=e.offsetTop,e=e.offsetParent;while(e);return o=o-t-n,o>=0?o:0},h=function(){return Math.max(e.document.body.scrollHeight,e.document.documentElement.scrollHeight,e.document.body.offsetHeight,e.document.documentElement.offsetHeight,e.document.body.clientHeight,e.document.documentElement.clientHeight)},p=function(e){return e&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(e):{}},g=function(t,n){e.history.pushState&&(n||"true"===n)&&"file:"!==e.location.protocol&&e.history.pushState(null,null,[e.location.protocol,"//",e.location.host,e.location.pathname,e.location.search,t].join(""))},b=function(e){return null===e?0:s(e)+e.offsetTop};t.animateScroll=function(t,n,o){var r=p(t?t.getAttribute("data-options"):null),s=i(s||c,o||{},r);n="#"+f(n.substr(1));var l="#"===n?e.document.documentElement:e.document.querySelector(n),v=e.pageYOffset;a||(a=e.document.querySelector(s.selectorHeader)),u||(u=b(a));var y=m(l,u,parseInt(s.offset,10)),O,S=y-v,I=h(),H=0,E,L;g(n,s.updateURL);var j=function(o,r,a){var u=e.pageYOffset;(o==r||u==r||e.innerHeight+u>=I)&&(clearInterval(a),l.focus(),s.callback(t,n))},w=function(){H+=16,E=H/parseInt(s.speed,10),E=E>1?1:E,L=v+S*d(s.easing,E),e.scrollTo(0,Math.floor(L)),j(L,y,O)},C=function(){O=setInterval(w,16)};0===e.pageYOffset&&e.scrollTo(0,0),C()};var v=function(e){var n=l(e.target,o.selector);n&&"a"===n.tagName.toLowerCase()&&(e.preventDefault(),t.animateScroll(n,n.hash,o))},y=function(e){r||(r=setTimeout(function(){r=null,u=b(a)},66))};return t.destroy=function(){o&&(e.document.removeEventListener("click",v,!1),e.removeEventListener("resize",y,!1),o=null,r=null,a=null,u=null)},t.init=function(r){n&&(t.destroy(),o=i(c,r||{}),a=e.document.querySelector(o.selectorHeader),u=b(a),e.document.addEventListener("click",v,!1),a&&e.addEventListener("resize",y,!1))},t});