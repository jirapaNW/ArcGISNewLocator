"use strict";var __awaiter=this&&this.__awaiter||function(e,i,u,o){return new(u=u||Promise)(function(r,t){function n(e){try{s(o.next(e))}catch(e){t(e)}}function a(e){try{s(o.throw(e))}catch(e){t(e)}}function s(e){var t;e.done?r(e.value):((t=e.value)instanceof u?t:new u(function(e){e(t)})).then(n,a)}s((o=o.apply(e,i||[])).next())})},__generator=this&&this.__generator||function(n,a){var s,i,u,o={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]},l={next:e(0),throw:e(1),return:e(2)};return"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function e(r){return function(e){var t=[r,e];if(s)throw new TypeError("Generator is already executing.");for(;o=l&&t[l=0]?0:o;)try{if(s=1,i&&(u=2&t[0]?i.return:t[0]?i.throw||((u=i.return)&&u.call(i),0):i.next)&&!(u=u.call(i,t[1])).done)return u;switch(i=0,(t=u?[2&t[0],u.value]:t)[0]){case 0:case 1:u=t;break;case 4:return o.label++,{value:t[1],done:!1};case 5:o.label++,i=t[1],t=[0];continue;case 7:t=o.ops.pop(),o.trys.pop();continue;default:if(!(u=0<(u=o.trys).length&&u[u.length-1])&&(6===t[0]||2===t[0])){o=0;continue}if(3===t[0]&&(!u||t[1]>u[0]&&t[1]<u[3]))o.label=t[1];else if(6===t[0]&&o.label<u[1])o.label=u[1],u=t;else{if(!(u&&o.label<u[2])){u[2]&&o.ops.pop(),o.trys.pop();continue}o.label=u[2],o.ops.push(t)}}t=a.call(n,o)}catch(e){t=[6,e],i=0}finally{s=u=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}}},fs=(Object.defineProperty(exports,"__esModule",{value:!0}),exports.getMessage=void 0,require("fs")),path=require("path"),SystemJS=require("systemjs"),default_1=require("../../translations/default");function getMessage(n,a){return __awaiter(this,void 0,void 0,function(){var t,r;return __generator(this,function(e){switch(e.label){case 0:return(t=Array.isArray(a),"en"===a||t&&"en"===a[0])?[2,default_1.default[n]]:(r=path.join(__dirname,"../../translations",a+".js"),fs.existsSync(r)?[4,SystemJS.import(r)]:[3,2]);case 1:return[2,e.sent()[n]||default_1.default[n]];case 2:return t&&0<a.length?fs.existsSync(r)?(r=path.join(__dirname,"translations",a[0]+".js"),[4,SystemJS.import(r)]):[3,4]:[3,6];case 3:return[2,e.sent()[n]||default_1.default[n]];case 4:return[2,default_1.default[n]];case 5:return[3,7];case 6:return[2,default_1.default[n]];case 7:return[2]}})})}exports.getMessage=getMessage;