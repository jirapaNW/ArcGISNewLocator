!function(t,r){"use strict";var n={};t.PubSub?(n=t.PubSub,console.warn("PubSub already loaded, using existing version")):(t.PubSub=n,function(t){var r={},n=-1,e="*";function o(t){var r;for(r in t)if(Object.prototype.hasOwnProperty.call(t,r))return!0;return!1}function i(t){return function(){throw t}}function u(t,r,n){try{t(r,n)}catch(t){setTimeout(i(t),0)}}function c(t,r,n){t(r,n)}function s(t,n,e,o){var i,s=r[n],f=o?c:u;if(Object.prototype.hasOwnProperty.call(r,n))for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&f(s[i],t,e)}function f(t,r,n){return function(){var o=String(t),i=o.lastIndexOf(".");for(s(t,t,r,n);-1!==i;)i=(o=o.substr(0,i)).lastIndexOf("."),s(t,o,r,n);s(t,e,r,n)}}function p(t){var n=String(t);return Boolean(Object.prototype.hasOwnProperty.call(r,n)&&o(r[n]))}function a(t){for(var r=String(t),n=p(r)||p(e),o=r.lastIndexOf(".");!n&&-1!==o;)o=(r=r.substr(0,o)).lastIndexOf("."),n=p(r);return n}function b(t,r,n,e){var o=f(t="symbol"==typeof t?t.toString():t,r,e);return!!a(t)&&(!0===n?o():setTimeout(o,0),!0)}t.publish=function(r,n){return b(r,n,!1,t.immediateExceptions)},t.publishSync=function(r,n){return b(r,n,!0,t.immediateExceptions)},t.subscribe=function(t,e){if("function"!=typeof e)return!1;t="symbol"==typeof t?t.toString():t,Object.prototype.hasOwnProperty.call(r,t)||(r[t]={});var o="uid_"+String(++n);return r[t][o]=e,o},t.subscribeAll=function(r){return t.subscribe(e,r)},t.subscribeOnce=function(r,n){var e=t.subscribe(r,(function(){t.unsubscribe(e),n.apply(this,arguments)}));return t},t.clearAllSubscriptions=function(){r={}},t.clearSubscriptions=function(t){var n;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&0===n.indexOf(t)&&delete r[n]},t.countSubscriptions=function(t){var n,e,o=0;for(n in r)if(Object.prototype.hasOwnProperty.call(r,n)&&0===n.indexOf(t)){for(e in r[n])o++;break}return o},t.getSubscriptions=function(t){var n,e=[];for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&0===n.indexOf(t)&&e.push(n);return e},t.unsubscribe=function(n){var e,o,i,u=function(t){var n;for(n in r)if(Object.prototype.hasOwnProperty.call(r,n)&&0===n.indexOf(t))return!0;return!1},c="string"==typeof n&&(Object.prototype.hasOwnProperty.call(r,n)||u(n)),s=!c&&"string"==typeof n,f="function"==typeof n,p=!1;if(!c){for(e in r)if(Object.prototype.hasOwnProperty.call(r,e)){if(o=r[e],s&&o[n]){delete o[n],p=n;break}if(f)for(i in o)Object.prototype.hasOwnProperty.call(o,i)&&o[i]===n&&(delete o[i],p=!0)}return p}t.clearSubscriptions(n)}}(n)),"object"==typeof exports?(void 0!==module&&module.exports&&(exports=module.exports=n),exports.PubSub=n,module.exports=exports=n):"function"==typeof define&&define.amd&&define((function(){return n}))}("object"==typeof window&&window||this);