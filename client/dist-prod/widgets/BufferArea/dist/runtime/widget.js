System.register(["jimu-core/react","esri/Graphic","esri/geometry/geometryEngine","esri/geometry/Point"],(function(e,t){var r={},a={},n={},o={};return{setters:[function(e){r.default=e.default,r.useState=e.useState},function(e){a.default=e.default},function(e){n.default=e.default},function(e){o.default=e.default}],execute:function(){e((()=>{var e={2089:e=>{"use strict";e.exports=a},422:e=>{"use strict";e.exports=o},7958:e=>{"use strict";e.exports=n},8972:e=>{"use strict";e.exports=r}},t={};function u(r){var a=t[r];if(void 0!==a)return a.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,u),n.exports}u.d=(e,t)=>{for(var r in t)u.o(t,r)&&!u.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},u.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),u.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.p="";var l={};return u.p=window.jimuConfig.baseUrl,(()=>{"use strict";u.r(l),u.d(l,{__set_webpack_public_path__:()=>o,default:()=>n});var e=u(8972),t=u(2089),r=u(7958),a=u(422);const n=({jimuMapView:n,centerPoint:o})=>{const[u,l]=(0,e.useState)(500);return e.default.createElement("div",{className:"buffer-area-widget"},e.default.createElement("h4",null,"Buffer Area Widget"),e.default.createElement("div",null,e.default.createElement("label",null,"Buffer Distance (meters):"," ",e.default.createElement("input",{type:"number",value:u,onChange:e=>{l(Number(e.target.value))}}))),e.default.createElement("button",{onClick:()=>{if(!n||!o)return void console.error("Map view or center point is not available");const{view:e}=n,l=new a.default({longitude:o.lon,latitude:o.lat,spatialReference:e.spatialReference}),i=r.default.buffer(l,u,"meters"),s=new t.default({geometry:i,symbol:{type:"simple-fill",color:[0,0,255,.3],outline:{color:[0,0,255],width:2}}});e.graphics.removeAll(),e.graphics.add(s),e.goTo(i.extent)},disabled:!o},"Create Buffer!"))};function o(e){u.p=e}})(),l})())}}}));