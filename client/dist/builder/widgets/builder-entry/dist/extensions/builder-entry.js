System.register(["jimu-core","jimu-for-builder/service"],(function(e,t){var r={},o={};return{setters:[function(e){r.getAppStore=e.getAppStore,r.jimuHistory=e.jimuHistory,r.urlUtils=e.urlUtils},function(e){o.appServices=e.appServices}],execute:function(){e((()=>{"use strict";var e={9244:e=>{e.exports=r},9860:e=>{e.exports=o}},t={};function i(r){var o=t[r];if(void 0!==o)return o.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,i),n.exports}i.d=(e,t)=>{for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return(()=>{i.r(n),i.d(n,{default:()=>o});var e=i(9244),t=i(9860),r=function(e,t,r,o){return new(r||(r=Promise))((function(i,n){function s(e){try{p(o.next(e))}catch(e){n(e)}}function u(e){try{p(o.throw(e))}catch(e){n(e)}}function p(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}p((o=o.apply(e,t||[])).next())}))};class o{constructor(){this.id="app-config-processor-extension-builder-entry"}process(o){return r(this,void 0,void 0,(function*(){const r=(0,e.getAppStore)().getState().queryObject;return"express"===o.name&&(window.isExpressBuilder=!0),r.id||r.app_config?yield Promise.resolve(o):r.template?yield t.appServices.createAppByTemplateId(r.template).then((t=>{const i=r.set("id",t).without("template");return e.jimuHistory.changeQueryObject(i,!0,!0),o})):(e.jimuHistory.browserHistory.push(e.urlUtils.getPageLinkUrl("template",r)),Promise.resolve(o))}))}}})(),n})())}}}));