!function(e,t){"function"==typeof define&&define.amd?define([],t(e)):"object"==typeof exports?module.exports=t(e):e.smoothScroll=t(e)}("undefined"!=typeof global?global:this.window||this.global,function(e){"use strict";var t,n,o,r,a={},c="querySelector"in document&&"addEventListener"in e,u={selector:"[data-scroll]",selectorHeader:"[data-scroll-header]",speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callback:function(){}},i=function(){var e={},t=!1,n=0,o=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(t=arguments[0],n++);for(var r=function(n){for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t&&"[object Object]"===Object.prototype.toString.call(n[o])?e[o]=i(!0,e[o],n[o]):e[o]=n[o])};n<o;n++){r(arguments[n])}return e},l=function(e){return null===e?0:(t=e,Math.max(t.scrollHeight,t.offsetHeight,t.clientHeight)+e.offsetTop);var t};a.animateScroll=function(t,n,a){var c=function(e){return e&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(e):{}}(t?t.getAttribute("data-options"):null),s=i(s||u,a||{},c),f="#"===(n="#"+function(e){for(var t,n=String(e),o=n.length,r=-1,a="",c=n.charCodeAt(0);++r<o;){if(0===(t=n.charCodeAt(r)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");a+=t>=1&&t<=31||127==t||0===r&&t>=48&&t<=57||1===r&&t>=48&&t<=57&&45===c?"\\"+t.toString(16)+" ":t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?n.charAt(r):"\\"+n.charAt(r)}return a}(n.substr(1)))?e.document.documentElement:e.document.querySelector(n),d=e.pageYOffset;o||(o=e.document.querySelector(s.selectorHeader)),r||(r=l(o));var h,p,m,g=function(e,t,n){var o=0;if(e.offsetParent)do{o+=e.offsetTop,e=e.offsetParent}while(e);return(o=o-t-n)>=0?o:0}(f,r,parseInt(s.offset,10)),b=g-d,v=Math.max(e.document.body.scrollHeight,e.document.documentElement.scrollHeight,e.document.body.offsetHeight,e.document.documentElement.offsetHeight,e.document.body.clientHeight,e.document.documentElement.clientHeight),y=0;!function(t,n){e.history.pushState&&(n||"true"===n)&&"file:"!==e.location.protocol&&e.history.pushState(null,null,[e.location.protocol,"//",e.location.host,e.location.pathname,e.location.search,t].join(""))}(n,s.updateURL);var O=function(){var o,r,a;p=(p=(y+=16)/parseInt(s.speed,10))>1?1:p,m=d+b*(o=s.easing,r=p,"easeInQuad"===o&&(a=r*r),"easeOutQuad"===o&&(a=r*(2-r)),"easeInOutQuad"===o&&(a=r<.5?2*r*r:(4-2*r)*r-1),"easeInCubic"===o&&(a=r*r*r),"easeOutCubic"===o&&(a=--r*r*r+1),"easeInOutCubic"===o&&(a=r<.5?4*r*r*r:(r-1)*(2*r-2)*(2*r-2)+1),"easeInQuart"===o&&(a=r*r*r*r),"easeOutQuart"===o&&(a=1- --r*r*r*r),"easeInOutQuart"===o&&(a=r<.5?8*r*r*r*r:1-8*--r*r*r*r),"easeInQuint"===o&&(a=r*r*r*r*r),"easeOutQuint"===o&&(a=1+--r*r*r*r*r),"easeInOutQuint"===o&&(a=r<.5?16*r*r*r*r*r:1+16*--r*r*r*r*r),a||r),e.scrollTo(0,Math.floor(m)),function(o,r,a){var c=e.pageYOffset;(o==r||c==r||e.innerHeight+c>=v)&&(clearInterval(a),f.focus(),s.callback(t,n))}(m,g,h)};0===e.pageYOffset&&e.scrollTo(0,0),h=setInterval(O,16)};var s=function(e){var n=function(e,t){var n,o,r=t.charAt(0),a="classList"in document.documentElement;for("["===r&&(n=(t=t.substr(1,t.length-2)).split("=")).length>1&&(o=!0,n[1]=n[1].replace(/"/g,"").replace(/'/g,""));e&&e!==document;e=e.parentNode){if("."===r)if(a){if(e.classList.contains(t.substr(1)))return e}else if(new RegExp("(^|\\s)"+t.substr(1)+"(\\s|$)").test(e.className))return e;if("#"===r&&e.id===t.substr(1))return e;if("["===r&&e.hasAttribute(n[0])){if(!o)return e;if(e.getAttribute(n[0])===n[1])return e}if(e.tagName.toLowerCase()===t)return e}return null}(e.target,t.selector);n&&"a"===n.tagName.toLowerCase()&&(e.preventDefault(),a.animateScroll(n,n.hash,t))},f=function(e){n||(n=setTimeout(function(){n=null,r=l(o)},66))};return a.destroy=function(){t&&(e.document.removeEventListener("click",s,!1),e.removeEventListener("resize",f,!1),t=null,n=null,o=null,r=null)},a.init=function(n){c&&(a.destroy(),t=i(u,n||{}),o=e.document.querySelector(t.selectorHeader),r=l(o),e.document.addEventListener("click",s,!1),o&&e.addEventListener("resize",f,!1))},a});