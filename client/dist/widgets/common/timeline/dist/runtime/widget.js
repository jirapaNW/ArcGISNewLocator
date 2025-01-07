System.register(["jimu-core","jimu-arcgis","jimu-ui","jimu-core/dnd","jimu-theme"],(function(e,t){var n={},a={},i={},o={},s={};return{setters:[function(e){n.AllDataSourceTypes=e.AllDataSourceTypes,n.AppMode=e.AppMode,n.BaseVersionManager=e.BaseVersionManager,n.DataSourceComponent=e.DataSourceComponent,n.DataSourceManager=e.DataSourceManager,n.DataSourceStatus=e.DataSourceStatus,n.DataSourceTypes=e.DataSourceTypes,n.Immutable=e.Immutable,n.React=e.React,n.ReactRedux=e.ReactRedux,n.ReactResizeDetector=e.ReactResizeDetector,n.TimezoneConfig=e.TimezoneConfig,n.classNames=e.classNames,n.css=e.css,n.dataSourceUtils=e.dataSourceUtils,n.dateUtils=e.dateUtils,n.defaultMessages=e.defaultMessages,n.getAppStore=e.getAppStore,n.hooks=e.hooks,n.jsx=e.jsx,n.lodash=e.lodash,n.polished=e.polished,n.useIntl=e.useIntl,n.utils=e.utils},function(e){a.ArcGISDataSourceTypes=e.ArcGISDataSourceTypes,a.MapViewManager=e.MapViewManager,a.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules},function(e){i.Alert=e.Alert,i.Button=e.Button,i.Dropdown=e.Dropdown,i.DropdownButton=e.DropdownButton,i.DropdownItem=e.DropdownItem,i.DropdownMenu=e.DropdownMenu,i.Icon=e.Icon,i.Label=e.Label,i.Popper=e.Popper,i.Switch=e.Switch,i.Tooltip=e.Tooltip,i.WidgetPlaceholder=e.WidgetPlaceholder,i.defaultMessages=e.defaultMessages},function(e){o.interact=e.interact},function(e){s.getThemeColorValue=e.getThemeColorValue}],execute:function(){e((()=>{var e={10307:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="#000" d="m9 6.809 3.276 1.638.448-.894L10 6.19V3H9z"></path><path fill="#000" fill-rule="evenodd" d="M10.293 11.943A5.501 5.501 0 0 0 9.5 1a5.5 5.5 0 0 0-.792 10.943L9.5 13zM14 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0M12 16.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0m-1 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" clip-rule="evenodd"></path><path fill="#000" d="M6 16H0v1h6zM13 16h6v1h-6z"></path></svg>'},44383:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 4 16"><path fill="#282828" fill-rule="evenodd" d="M.322.03A.504.504 0 0 1 .96.305L4 8 .96 15.695a.504.504 0 0 1-.638.275.464.464 0 0 1-.29-.606L2.94 8 .031.636A.464.464 0 0 1 .322.03" clip-rule="evenodd"></path></svg>'},75102:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M8 3c1.175 0 2.27.337 3.195.92l.9-.598A7 7 0 0 0 2.5 13.33h10.999A6.97 6.97 0 0 0 15 9a6.97 6.97 0 0 0-1.256-4.002l-.603.906C13.686 6.808 14 7.867 14 9a5.97 5.97 0 0 1-1.008 3.33H3.008A6 6 0 0 1 8 3m-.183 6.9a1.322 1.322 0 0 1-.43-2.158L13 4 9.258 9.612a1.32 1.32 0 0 1-1.441.287" clip-rule="evenodd"></path></svg>'},72259:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0m1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" clip-rule="evenodd"></path></svg>'},62241:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M2 2.22V1l1 .7 8.128 5.69L12 8l-.872.61L3 14.3 2 15V2.22M10.256 8 3 13.08V2.92zM14 1h-1v14h1z" clip-rule="evenodd"></path></svg>'},40904:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M5 1H4v14h1zm7 0h-1v14h1z" clip-rule="evenodd"></path></svg>'},97408:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="m2 1 12 7-12 7zm9.983 6.999L3 2.723v10.553z" clip-rule="evenodd"></path></svg>'},64811:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0m1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0M7.5 4.5a.5.5 0 0 1 1 0v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3z" clip-rule="evenodd"></path></svg>'},12033:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M14 2.22V1l-1 .7-8.128 5.69L4 8l.872.61L13 14.3l1 .7V2.22M5.744 8 13 13.08V2.92zM2 1h1v14H2z" clip-rule="evenodd"></path></svg>'},45508:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6.5 7.5A.5.5 0 0 1 7 7h1.5v4.5h1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h1V8H7a.5.5 0 0 1-.5-.5"></path><path fill="#000" fill-rule="evenodd" d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16m0-1A7 7 0 1 0 8 1a7 7 0 0 0 0 14" clip-rule="evenodd"></path></svg>'},62686:e=>{"use strict";e.exports=a},79244:e=>{"use strict";e.exports=n},26245:e=>{"use strict";e.exports=o},1888:e=>{"use strict";e.exports=s},14321:e=>{"use strict";e.exports=i}},t={};function l(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,l),i.exports}l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var n in t)l.o(t,n)&&!l.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="";var r={};return l.p=window.jimuConfig.baseUrl,(()=>{"use strict";l.r(r),l.d(r,{__set_webpack_public_path__:()=>Ye,default:()=>He});var e,t,n,a=l(79244),i=l(62686),o=l(14321);!function(e){e.Classic="CLASSIC",e.Modern="MODERN"}(e||(e={})),function(e){e.Slowest="SLOWEST",e.Slow="SLOW",e.Medium="MEDIUM",e.Fast="FAST",e.Fastest="FASTEST"}(t||(t={})),function(e){e.current="CURRENT",e.cumulatively="CUMULATIVE"}(n||(n={}));const s=["year","month","day"],c=["hour","minute","second"],u=4,d=10,m="d/M/y",p="h:mm:ss a";var h;!function(e){e[e.year=31536e3]="year",e[e.month=2592e3]="month",e[e.day=86400]="day",e[e.hour=3600]="hour",e[e.minute=60]="minute",e[e.second=1]="second"}(h||(h={}));const g={slowest:5e3,slow:4e3,medium:3e3,fast:2e3,fastest:1e3};function f(e){let n;const a=1e3*Math.ceil(e/1e3);return Object.keys(g).some((e=>g[e]===a&&(n=e.toUpperCase(),!0))),n||(a>g.slowest?n=t.Slowest:a<g.fastest&&(n=t.Fastest)),n}function v(e,n,i=!1){const{startTime:o,endTime:s,layerList:l,accuracy:r,stepLength:c}=e||{};let u;const{startTime:m,endTime:p}=function(e,t,n,a){let i=y(n),o=y(a,!1),s=null,l=null;if(!i||!o){const n=w(e,t);n&&(e=n);if(Object.keys(e).filter((t=>null===e[t])).length===Object.keys(e).length)return{startTime:i,endTime:o};Object.keys(e).forEach((t=>{var n,a;const r=e[t];if(!r)return;const c=r.getTimeInfo();if(!i){const e=null===(n=null==c?void 0:c.timeExtent)||void 0===n?void 0:n[0];s=s?Math.min(s,e):e}if(!o){const e=null===(a=null==c?void 0:c.timeExtent)||void 0===a?void 0:a[1];l=l?Math.max(l,e):e}})),i=i||s,o=o||l}return x(i,o,!0)}(n,l,o,s);if(!m||!p)return null;const g=S(m,p),f=g[0],v=function(e,t,n){const a=(t-e)/1e3/h[n];return{val:a>10?d:a>5?5:1,unit:n}}(m,p,f);if(e){u=(0,a.Immutable)(e);const t=!g.includes(r);t&&(u=u.set("accuracy",f)),c&&(t||h[c.unit]>h[f]||1e3*h[c.unit]*c.val>p-m)&&(u=u.set("stepLength",v))}else u=(0,a.Immutable)(function(e,n){return{layerList:null,startTime:{value:a.dateUtils.VirtualDateType.Min},endTime:{value:a.dateUtils.VirtualDateType.Max},timeDisplayStrategy:"CURRENT",dividedCount:null,accuracy:e,stepLength:n,speed:t.Medium}}(f,v));return i?(u=u.set("startTime",{value:m}).set("endTime",{value:p}),u):(0,a.Immutable)({config:u,exactStartTime:m,exactEndTime:p,minAccuracy:f,accuracyList:g})}function y(e,t=!0){let n=null;if(e)if("number"==typeof e.value)n=e.value;else{const i=new Date;i.setMinutes(0),i.setSeconds(0),i.setMilliseconds(0),e.value===a.dateUtils.VirtualDateType.Today?(i.setHours(0),n=i.getTime()+b(e),n=t?n:n+1e3*h.day):e.value===a.dateUtils.VirtualDateType.Now&&(n=i.getTime()+b(e),n=t?n:n+1e3*h.hour)}return n}function b(e){return e.offset?e.offset.val*h[e.offset.unit]*1e3:0}function w(e,t){let n=null;const o=Object.keys(e).map((t=>e[t]))[0];if((null==o?void 0:o.type)===i.ArcGISDataSourceTypes.WebMap){const e=[];o.getAllChildDataSources().forEach((t=>{((t.type===a.DataSourceTypes.MapService||t.type===a.DataSourceTypes.ImageryLayer||t.type===a.DataSourceTypes.ImageryTileLayer)&&t.supportTime()||t.type===a.DataSourceTypes.FeatureLayer&&null===a.dataSourceUtils.findMapServiceDataSource(t)&&t.supportTime())&&e.push(t)}));const i=(null==t?void 0:t.map((e=>e.dataSourceId)))||[];n={},e.forEach((e=>{(0===i.length||i.includes(e.id))&&(n[e.id]=e)}))}return n}function x(e,t,n=!1){let i;if(i=window.jimuConfig.isBuilder?(0,a.getAppStore)().getState().appStateInBuilder.appConfig.attributes.timezone:(0,a.getAppStore)().getState().appConfig.attributes.timezone,(null==i?void 0:i.type)===a.TimezoneConfig.Specific){const o=a.dataSourceUtils.getTimeZoneOffsetByName(i.value),s=a.dataSourceUtils.getLocalTimeOffset();n?(e=e-s+o,t=t-s+o):(e=e+s-o,t=t+s-o)}return{startTime:e,endTime:t}}function S(e,t){const n=[...s,...c],a=[],i=t-e;return n.forEach((e=>{i>=1e3*h[e]&&a.push(e)})),a}function M(e){return e===a.DataSourceTypes.FeatureLayer||e===a.DataSourceTypes.ImageryLayer||e===a.DataSourceTypes.ImageryTileLayer}var j;function k(e){const{width:t,startTime:n,endTime:a,accuracy:i="hour"}=e,o=j[i],s={year:null,month:null,day:null,hour:null,minute:null,second:null},l=function(e,t,n){const a=n/u;let i,o;const s=(t.getTime()-e.getTime())/31536e6,l=a/s;l>=1?(i=1,o=l*u):(l>=.2?i=5:l>=.1&&l<.2?i=10:l>=.02&&l<.1?i=50:l<.02&&(i=100),o=n/(s/i));return{value:i,tickWidth:o/n}}(new Date(n),new Date(a),t);if(s.year={value:l.value,tickWidth:l.tickWidth},j.month<=o&&1===l.value){const e=function(e,t){const n=e*t/u;let a=null;n>=12?a=1:n>=4?a=3:n>=2&&(a=6);return{value:a,tickWidth:e/(12/a)}}(l.tickWidth,t);if(null!==e.value&&(s.month={value:e.value,tickWidth:e.tickWidth},j.day<=o&&1===e.value)){const e=function(e,t,n){const a=n/u;let i;const o=(t-e)/864e5,s=a/o;i=s>=1?1:s>=.5&&s<1?2:s>=1/7&&s<.5?7:s>=.1&&s<1/7?10:s>=1/15&&s<.1?15:null;return{value:i,tickWidth:1/(o/i)}}(n,a,t);if(null!==e.value&&(s.day={value:e.value,tickWidth:e.tickWidth},j.hour<=o&&1===e.value)){const n=function(e,t){const n=e*t/u;let a;n>=24?a=1:n>=12&&n<24?a=2:n>=4&&n<12?a=6:n>=3&&n<4?a=8:n>=2&&n<3?a=12:n<2&&(a=null);return{value:a,tickWidth:e/(24/a)}}(e.tickWidth,t);if(null!==n.value&&(s.hour={value:n.value,tickWidth:n.tickWidth},j.minute<=o&&1===n.value)){const e=D(n.tickWidth,t);if(null!==e.value&&(s.minute={value:e.value,tickWidth:e.tickWidth},j.second<=o)){const n=D(e.tickWidth,t);null!==n.value&&(s.second={value:n.value,tickWidth:n.tickWidth})}}}}}return s}function D(e,t){const n=e*t/u;let a;n>=60?a=1:n>=12&&n<60?a=5:n>=6&&n<12?a=10:n>=4&&n<6?a=15:n>=2&&n<4?a=30:n<2&&(a=null);return{value:a,tickWidth:e/(60/a)}}function T(e,t,n,a,i,o,s,l){const r=new Date(n),c=new Date(a),u=r.getFullYear(),d=c.getFullYear(),m=[],p=[],h={value:u,label:z(e,r,!0),position:0};G(i,o,0,s)&&(m.push(h),p.push(h));let g=function(e,t){let n=new Date(e).getFullYear(),a=null;for(;!a;)n%100%t==0&&(a=n),n++;return a}(n,e.year.value);g===u&&(g=u+e.year.value);for(let l=g;l<=d;l+=e.year.value){const r=new Date(l,0,1,0,0,0),c=(r.getTime()-n)/(a-n);if(!G(i,o,100*c,s))continue;let d=!1;const h=e.year.tickWidth*t/52;h>=1?d=!0:h<.03?d=l%50==0&&l-u>=49:h<.15?d=l%(10*e.year.value)==0&&l-u>=9:h<.3?d=l%(5*e.year.value)==0&&l-u>=4:h<1&&(d=l%2==0);const g=z(e,r);d=L(d,g,c,p,t);const f={value:l,label:d?g:null,position:100*c+"%"};d&&p.push(f),m.push(f)}return m}function R(e,t,n,a,i,o,s){if(!e.month||e.month.tickWidth>1&&new Date(a).getMonth()===new Date(n).getMonth())return[];const l=new Date(n),r=new Date(a),c=l.getMonth()+1,u=r.getMonth()+1,d=l.getFullYear(),m=12-c+12*(r.getFullYear()-d-1)+u+1,p=[],h=[];let g=function(e,t){const n=new Date(e);n.setDate(1),n.setHours(0),n.setMinutes(0),n.setSeconds(0),n.setMilliseconds(0),e>n.getTime()&&n.setMonth(n.getMonth()+1);let a=n.getMonth(),i=null;for(;!i;)a%t!=0&&11!==a||(i=a),a++;return i+1}(n,e.month.value);g===c&&(g=c+e.month.value);let f=!1;for(let l=g-c;l<=m-1;l+=e.month.value){const r=new Date(d,c+l-1,1,0,0,0),u=(r.getTime()-n)/(a-n);if(!G(i,o,100*u,s))continue;if(!f||0===r.getMonth()){const t=new Date(r.getFullYear(),r.getMonth()-1,1,0,0,0),i=t.getTime()-n,o=Math.max(i,0)/(a-n);if(h.unshift({value:t.getFullYear(),label:z(e,t,!f),position:100*o+"%"}),f=!0,0===r.getMonth())continue}let m=!1;const g=e.month.tickWidth*t;e.year.tickWidth*t>58&&(m=g>=28||(g>=15?r.getMonth()%3==0:(r.getMonth()+1)%12==7));const v=W(e,r);m=L(m,v,u,h,t);const y={value:r.getMonth()+1,label:m?v:null,position:100*u+"%"};m&&h.push(y),p.push(y)}return p}function O(e,t,n){let a=!1;const i=n.day.value;if(1!==i){const n=e.getMonth()+1;2===i?(2===n&&28===t||30===t)&&(a=!0):7===i?(2===n&&21===t||28===t)&&(a=!0):10===i?20===t&&(a=!0):15===i&&15===t&&(a=!0)}return a}function C(e,t,n,a,i,o,s){if(!e.day)return[];const l=new Date(n),r=l.getDate(),c=l.getFullYear(),u=l.getMonth(),d=Math.ceil((a-n)/864e5)+1,m=[],p=[],h={value:r,label:W(e,l),position:0};p.push(h);let g=function(e,t){let n=new Date(e).getDate(),a=null;for(;!a;)(n-1)%t==0&&1!==n&&(a=n),n++;return a}(n,e.day.value);g===r&&(g=r+e.day.value);for(let l=g-r;l<=d-1;l+=e.day.value){const d=new Date(c,u,r+l,0,0,0),h=d.getDate();if(1===h)continue;const g=(d.getTime()-n)/(a-n);if(!G(i,o,100*g,s))continue;let f=!1;const v=e.day.tickWidth*t;e.month.tickWidth*t>100&&(v>=30?f=!0:v>=15?f=h%2==0:v>=8?f=(h-1)%7==0:v>=3&&(f=11===h||21===h));const y=A(d,e);f=L(f,y,g,p,t);const b={value:h,label:f?y:"",position:100*g+"%"};if(f&&p.push(b),m.push(b),O(d,h,e)){const e=new Date(d.getTime());e.setDate(1),e.setMonth(e.getMonth()+1);l+=(e.getTime()-d.getTime())/864e5-1}}return m}function N(e,t,n,a,i,o,s){if(!e.hour)return[];const l=new Date(n),r=l.getHours(),c=l.getFullYear(),u=l.getMonth(),d=l.getDate(),m=Math.ceil((a-n)/36e5)+1,p=[],h=[],g={value:r,label:A(l,e),position:0};h.push(g);let f=function(e,t){let n=new Date(e).getHours(),a=null;for(;!a;)n%t==0&&(a=n),n++;return a}(n,e.hour.value);f===r&&(f=r+e.hour.value);for(let l=f-r;l<=m-1;l+=e.hour.value){const m=new Date(c,u,d,r+l,0,0),g=m.getHours();if(0===g)continue;if(m.getTime()>a)break;const f=(m.getTime()-n)/(a-n);if(!G(i,o,100*f,s))continue;let v=!1;const y=e.day.tickWidth*t,b=e.hour.tickWidth*t;y<60?v=!1:y<100?v=g%12==0:b>=40?v=!0:b>=20?v=g%2==0:b>=6.67?v=g%6==0:b>=5?v=g%8==0:b>=3.3&&(v=g%12==0);const w=P(m,e);v=L(v,w,f,h,t);const x={value:g,label:v?w:"",position:100*f+"%"};v&&h.push(x),p.push(x)}return p}function E(e,t,n,a,i,o,s){if(!e.minute)return[];const l=new Date(n),r=l.getMinutes(),c=l.getFullYear(),u=l.getMonth(),d=l.getDate(),m=l.getHours(),p=(a-n)/6e4+1,h=[],g=[],f={value:r,label:P(l,e),position:0};g.push(f);let v=function(e,t){let n=new Date(e).getMinutes(),a=null;for(;!a;)n%t==0&&(a=n),n++;return a}(n,e.minute.value);v===r&&(v=r+e.minute.value);for(let l=v-r;l<=p-1;l+=e.minute.value){const p=new Date(c,u,d,m,r+l,0),f=p.getMinutes();if(0===p.getMinutes())continue;const v=(p.getTime()-n)/(a-n);if(!G(i,o,100*v,s))continue;let y=!1;const b=e.hour.tickWidth*t,w=e.minute.tickWidth*t;b<60?y=!1:b<=160?y=f%30==0:b<300?y=f%15==0:w>28?y=!0:w>20?y=f%2==0:b>15?y=f%5==0:b>10&&(y=f%10==0);const x=$(p,e);y=L(y,x,v,g,t);const S={value:p.getMinutes(),label:y?x:"",position:100*v+"%"};y&&g.push(S),h.push(S)}return h}function I(e,t,n,a,i,o,s){if(!e.second)return[];const l=new Date(n),r=l.getSeconds(),c=l.getFullYear(),u=l.getMonth(),d=l.getDate(),m=l.getHours(),p=l.getMinutes(),h=(a-n)/1e3+1,g=[],f=[],v={value:r,label:$(l,e),position:0};f.push(v);let y=function(e,t){let n=new Date(e).getSeconds(),a=null;for(;!a;)n%t==0&&(a=n),n++;return a}(n,e.second.value);y===r&&(y=r+e.second.value);for(let l=y-r;l<=h-1;l+=e.second.value){const h=new Date(c,u,d,m,p,r+l),v=h.getSeconds();if(0===h.getSeconds())continue;const y=(h.getTime()-n)/(a-n);if(!G(i,o,100*y,s))continue;let b=!1;const w=e.minute.tickWidth*t,x=e.second.tickWidth*t;w<60?b=!1:w<=160?b=v%30==0:w<300?b=v%15==0:x>28?b=!0:x>20?b=v%2==0:w>15?b=v%5==0:w>10&&(b=v%10==0);const S=V(h,e);b=L(b,S,y,f,t);const M={value:h.getSeconds(),label:b?S:"",position:100*y+"%"};b&&f.push(M),g.push(M)}return g}function L(e,t,n,a,i){if(e){const o=a[a.length-1];if(!o)return!0;const s=U(o.label),l=U(t);s/(1===a.length?1:2)+l/2>(n-parseFloat(o.position)/100)*i&&(e=!1)}return e}function z(e,t,n=!1){let a="";return e.day?a=t.getFullYear():e.month?(a=t.getFullYear(),n&&(a+="/"+(t.getMonth()+1))):a=t.getFullYear(),a}function W(e,t){const n=t.getMonth()+1;let a="";return!e.day||e.hour&&1===e.hour.value?1!==n&&(a=n):a=n+"/"+t.getDate(),a}function A(e,t){let n=e.getDate();const a=e.getMonth()+1;return t.hour&&(n=a+"/"+n),n}function P(e,t){return e.getHours()+":00"}function $(e,t){let n=e.getMinutes();return t.second&&(n=e.getHours()+":"+(n<10?"0":"")+n),n}function V(e,t){return e.getSeconds()}!function(e){e[e.year=1]="year",e[e.month=2]="month",e[e.day=3]="day",e[e.hour=4]="hour",e[e.minute=5]="minute",e[e.second=6]="second"}(j||(j={}));const F={};function U(e,t,n){const a=window;if(void 0===a.measureCanvasCTX){const e=document.createElement("canvas");a.measureCanvasCTX=e.getContext("2d")}if(F[e])return F[e];const i=a.measureCanvasCTX.measureText(e).width+10;return F[e]=i,i}function B(e,t,n,a,i){let o,s,l,r,c,u,d=null;return e(t).draggable({inertia:!1,modifiers:[],autoScroll:!0,onstart:e=>{e.stopPropagation(),e.preventDefault(),s=n(),l=s.startValue,r=s.endValue,c=s.startValue,u=s.endValue,o=0},onmove:e=>{e.stopPropagation(),e.preventDefault();const{extent:t,width:n}=s;o=e.clientX-e.clientX0;const i=function(e,t,n){return(e[1]-e[0])/t*n}(t,n,o),m=function(e,t,n,a,i,o,s){const{extent:l,stepLength:r,dividedCount:c}=t;let u=n,d=a;if(r){const t=Math.round(e/h[r.unit]/r.val/1e3);0!==t&&(u=Y(r.unit,new Date(u),t*r.val),d=Y(r.unit,new Date(d),t*r.val))}else{const t=(l[1]-l[0])/c,n=Math.round(e/t);0!==n&&(u+=n*t,d+=n*t)}e>0?d>l[1]?r?u>=l[1]?(u=i,d=o):s=l[1]:(u=l[1]-(a-n),d=l[1]):s=null:(s=null,u<l[0]&&(u=l[0],d=u+(a-n)));return{newStart:u,newEnd:d,newTempEnd:s}}(i,s,l,r,c,u,d);a(m.newStart,m.newEnd),c=m.newStart,u=m.newEnd,d=m.newTempEnd},onend:e=>{e.stopPropagation(),i(c,u,d)}})}function H(e,t,n,a,i){let o,s;let l,r,c,u,d,m;return e(t).resizable({edges:{left:".resize-left",right:".resize-right"}}).on("resizestart",(e=>{e.stopPropagation(),l=n(),c=l.startValue,u=l.endValue,d=l.startValue,m=l.endValue,r=u-c,o=0;const a=t.getBoundingClientRect();s=a.width,t.style.minWidth="0px"})).on("resizemove",(e=>{const{extent:t}=l;e.stopPropagation();const n=e.deltaRect;o+=n.width;const i=r&&s+o,p=function(e,t,n,a,i,o){let s=e,l=t;const r=(n[1]-n[0])/a*i;o.edges.left?s=e-r:l=t+r;return{newStart:s,newEnd:l}}(d,m,t,i,o,e),g=function(e,t,n,a,i,o,s){const{width:l,extent:r,stepLength:c,accuracy:u,dividedCount:d}=n;let m=a,p=i;if(c){const n=Math.round((r[1]-r[0])*t/l/h[u]/1e3);e.edges.left?m=Y(u,new Date(s),-n):p=Y(u,new Date(o),n)}else{const n=(r[1]-r[0])/d,a=Math.round((r[1]-r[0])*t/l/n);e.edges.left?m=s-a*n:p=o+a*n}e.edges.left?(m=Math.min(m,p),m=Math.max(r[0],m),m=Math.min(r[1],m)):(p=Math.max(m,p),p=Math.min(r[1],p),p=Math.max(r[0],p));return{newStart:m,newEnd:p}}(e,i||o,l,c,u,p.newStart,p.newEnd);a(g.newStart,g.newEnd),d=g.newStart,m=g.newEnd})).on("resizeend",(e=>{e.stopPropagation(),i(d,m)}))}function Y(e,t,n){switch(e){case"year":t.setFullYear(t.getFullYear()+n);break;case"month":t.setMonth(t.getMonth()+n);break;case"day":t.setDate(t.getDate()+n);break;case"hour":t.setHours(t.getHours()+n);break;case"minute":t.setMinutes(t.getMinutes()+n);break;case"second":t.setSeconds(t.getSeconds()+n)}return t.getTime()}function _(e,t,n,a,i,o=!0){let s;const l=o?1:-1;if(i)s=n+1/i*(t-e)*l,s=Math.round(s),Math.abs(s-e)<1e4?s=e:Math.abs(s-t)<1e4&&(s=t);else{const e=new Date(n),t=a.val*l;switch(null==a?void 0:a.unit){case"year":e.setFullYear(e.getFullYear()+t);break;case"month":e.setMonth(e.getMonth()+t);break;case"day":e.setDate(e.getDate()+t);break;case"hour":e.setHours(e.getHours()+t);break;case"minute":e.setMinutes(e.getMinutes()+t);break;case"second":e.setSeconds(e.getSeconds()+t)}s=e.getTime()}return s}function G(e,t,n,a){let i=!1;const o=1/a/2*100;return n>=e-o&&n<=t+o&&(i=!0),i}function J(e,t,n){return(null==n?void 0:n.zoomLevel)===t&&0!==t?n.maxWidth/e:Math.pow(2,t)}function X(e,t,n){return e*J(e,t,n)}const q=30;var Q=l(26245);const Z={_widgetLabel:"Timeline",overallTimeExtent:"Overall time extent",filteringApplied:"Timeline filtering applied",noTlFromHonoredMapWarning:"Oops! Seems like something went wrong with this map and we cannot get any valid time settings.",invalidTimeSpanWarning:"Please check the widget configurations to make sure the time span is valid.",timezoneWarning:"The Timeline widget is not available to use under the data time zone."};var K=l(64811),ee=l.n(K),te=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n};const ne=e=>{const t=window.SVG,{className:n}=e,i=te(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:ee()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var ae=l(72259),ie=l.n(ae),oe=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n};const se=e=>{const t=window.SVG,{className:n}=e,i=oe(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:ie()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var le=l(45508),re=l.n(le),ce=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n};const ue=e=>{const t=window.SVG,{className:n}=e,i=ce(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:re()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var de=l(97408),me=l.n(de),pe=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n};const he=e=>{const t=window.SVG,{className:n}=e,i=pe(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:me()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var ge=l(40904),fe=l.n(ge),ve=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n};const ye=e=>{const t=window.SVG,{className:n}=e,i=ve(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:fe()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var be=l(12033),we=l.n(be),xe=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n};const Se=e=>{const t=window.SVG,{className:n}=e,i=xe(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:we()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var Me=l(62241),je=l.n(Me),ke=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n};const De=e=>{const t=window.SVG,{className:n}=e,i=ke(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:je()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var Te=l(75102),Re=l.n(Te),Oe=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(a=Object.getOwnPropertySymbols(e);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(e,a[i])&&(n[a[i]]=e[a[i]])}return n};const Ce=e=>{const t=window.SVG,{className:n}=e,i=Oe(e,["className"]),o=(0,a.classNames)("jimu-icon jimu-icon-component",n);return t?a.React.createElement(t,Object.assign({className:o,src:Re()},i)):a.React.createElement("svg",Object.assign({className:o},i))};var Ne=l(1888);const Ee=l(44383),Ie=Object.assign({},Z,a.defaultMessages,o.defaultMessages);const Le=()=>{const e=(0,a.useIntl)();return a.React.useCallback(((t,n)=>e.formatMessage({id:t,defaultMessage:Ie[t]},n)),[e])},ze=function(n){const{width:i,height:s,applied:l,timeStyle:r=e.Classic,foregroundColor:c,backgroundColor:d,sliderColor:f,theme:v,startTime:y,endTime:b,accuracy:w="year",stepLength:x,dividedCount:S,cumulatively:M=!1,enablePlayControl:j=!1,speed:D=t.Medium,autoPlay:O,updating:L=!1,onTimeChanged:z,onApplyStateChanged:W}=n,[A,P]=a.React.useState(i),[$,V]=a.React.useState(s);a.React.useEffect((()=>{P(i-(r===e.Classic?64:80)),V(r===e.Classic?52:80)}),[i,s,r]);const[F,U]=a.React.useState(0),[G,Z]=a.React.useState(null),K=(0,a.useIntl)(),ee=Le(),te=a.React.useMemo((()=>[{value:t.Slowest,label:ee("slowest")},{value:t.Slow,label:ee("slow")},{value:t.Medium,label:ee("medium")},{value:t.Fast,label:ee("fast")},{value:t.Fastest,label:ee("fastest")}]),[]),[ae,ie]=a.React.useState(D);a.React.useEffect((()=>{ie(D)}),[D]);const[oe,le]=a.React.useState(O||!1),re=a.React.useRef(null),ce=a.React.useRef(null),[de,me]=a.React.useState(null),[pe,ge]=a.React.useState(0),[fe,ve]=a.React.useState(y),[be,we]=a.React.useState(null),[xe,Me]=a.React.useState(null),[je,ke]=a.React.useState(null),[Te,Re]=a.React.useState(null),[Oe,Ie]=a.React.useState(null),[ze,We]=a.React.useState(null),Ae=a.React.useRef(null),Pe=a.React.useRef(null),$e=a.React.useRef(null),Ve=a.React.useRef(null),Fe=a.React.useRef(null),[Ue,Be]=a.React.useState(!1),He=a.React.useRef(!1),Ye=e=>{window.jimuConfig.isInBuilder&&He.current&&e.key.includes("Arrow")&&e.preventDefault()};a.React.useEffect((()=>{function e(e){He.current=!0}function t(e){He.current=!1}function n(e){e.edges={left:!0},_e(e)}function a(e){e.edges={right:!0},_e(e)}return re.current.addEventListener("mousedown",Ke),Pe.current.addEventListener("keyup",n,!0),$e.current.addEventListener("keyup",a,!0),document.body.addEventListener("keydown",Ye,{passive:!1}),Pe.current.addEventListener("focus",e,!0),Pe.current.addEventListener("blur",t,!0),$e.current.addEventListener("focus",e,!0),$e.current.addEventListener("blur",t,!0),()=>{var i;null===(i=re.current)||void 0===i||i.removeEventListener("mousedown",Ke),null==Oe||Oe.unset(),null==ze||ze.unset(),Pe.current&&$e.current&&(Pe.current.removeEventListener("keyup",n,!0),$e.current.removeEventListener("keyup",a,!0),document.body.removeEventListener("keydown",Ye),Pe.current.removeEventListener("focus",e,!0),Pe.current.removeEventListener("blur",t,!0),$e.current.removeEventListener("focus",e,!0),$e.current.removeEventListener("blur",t,!0))}}),[]);const _e=a.hooks.useEventCallback((e=>{if(e.key.includes("Arrow")){e.preventDefault();const t="ArrowLeft"===e.key||"ArrowTop"===e.key?-1:1,n=Xe();let a=n.startValue,i=n.endValue;if(x)e.edges.left?a=Y(x.unit,new Date(n.startValue),t*x.val):i=Y(x.unit,new Date(n.endValue),t*x.val);else{const o=(n.extent[1]-n.extent[0])/S;e.edges.left?a+=t*o:i+=t*o}e.edges.left?(a=Math.max(n.extent[0],a),a=Math.min(a,i)):(i=Math.min(n.extent[1],i),i=Math.max(a,i)),ot(a,i)}}));a.React.useEffect((()=>{Ae.current&&(Ie(H(Q.interact,Ae.current,Xe,ot,st)),We(B(Q.interact,Ae.current,qe,ot,st)))}),[r]),a.React.useEffect((()=>{ce.current={left:0,x:0},Be(!1),ge(0),U(0),le(O),Me(null),ve(y);const e=M?y:_(y,b,y,x,S);we(e),z(y,e)}),[O,j,y,M,b,w,x,S]),a.React.useEffect((()=>{const e=k({width:X(A,F,G),startTime:y,endTime:b,accuracy:w});me(e)}),[A,y,b,w,F,G]),a.React.useEffect((()=>{const e=function(e,t,n,a){if(e<0)return;const i=(n-t)/h[a]/1e3,o=Math.max(e,8*u*i);let s=0;for(;X(e,s)<o||s===q;)s++;return{maxWidth:o,zoomLevel:s}}(A,y,b,w);Z(e)}),[A,y,b,w]);const Ge=a.ReactRedux.useSelector((e=>{var t,n;return oe?(null===(t=e.appRuntimeInfo)||void 0===t?void 0:t.appMode)===a.AppMode.Design||(null===(n=e.appRuntimeInfo)||void 0===n?void 0:n.isPrintPreview):null})),Je=a.React.useRef(Ge),Xe=a.hooks.useEventCallback((()=>({startValue:je||fe,endValue:Te||xe||be,extent:[y,b],width:X(A,F,G),accuracy:w,stepLength:x,dividedCount:S}))),qe=a.hooks.useEventCallback((()=>({startValue:je||fe,endValue:Te||be,extent:[y,b],width:X(A,F,G),accuracy:w,stepLength:x,dividedCount:S}))),Qe=a.hooks.useEventCallback((e=>{a.lodash.debounce((()=>{if(je)return;const t=J(A,F,G),n=e.clientX-ce.current.x;let a=ce.current.left-n/(t*A)*100;a=Math.min(a/100,(t-1)/t),a=a<0?0:a,ge(100*a)}),50)()})),Ze=a.hooks.useEventCallback((()=>{re.current.style.cursor="grab",re.current.style.removeProperty("user-select"),document.removeEventListener("mousemove",Qe),document.removeEventListener("mouseup",Ze)})),Ke=a.hooks.useEventCallback((e=>{0!==F&&"BUTTON"!==e.target.tagName&&(re.current.style.cursor="grabbing",re.current.style.userSelect="none",ce.current={left:pe,x:e.clientX},document.addEventListener("mousemove",Qe),document.addEventListener("mouseup",Ze))})),et=a.React.useCallback(((e=fe,t=be,n)=>{if(e<=y)return void ge(0);const a=b-y,i=a/J(A,F,G),o=y+pe/100*a,s=o+i;let l;if(n&&(t<=o||e>=s))l=Math.min(e,b-i);else{if(n||!(e>=s||t<=o))return;l=Math.max(y,t-i)}ge((l-y)/(b-y)*100)}),[F,y,b,pe,fe,be,A,G]),tt=a.React.useCallback((e=>{const t=F+(e?1:-1);if(0===t)return void ge(0);const n=b-y,a=J(A,F,G),i=J(A,t,G),o=n/a,s=y+pe/100*n,l=s+o;let r=pe;const c=xe||be;if(c===b&&c===l)r=(i-1)/i*100;else if(fe<s&&c>s&&c<l)r=(c-(c-s)/(i/a)-y)/(b-y)*100;else{if(fe>=l||be<=s&&fe!==be||fe<s&&be>l)r=(fe+(be-fe)/2-o*a/i/2-y)/(b-y)*100;else{const t=(fe-y)/(b-y)*100-pe;r=e?pe+t/2:pe-t}}r=Math.max(0,r),r=Math.min(r,(i-1)/i*100),ge(r)}),[F,y,b,pe,A,fe,be,xe,G]),nt=a.React.useCallback((e=>{const t=_(y,b,be,x,S,e);let n=y,a=b;if(M){const n=e&&be>=b,i=!e&&y===be;if(e&&t>b)(xe||S)&&e?(a=y,Me(null)):(a=t,Me(b));else{if(i)return;a=n?y:t,Me(null)}}else{const i=_(y,b,fe,x,S,e),o=!e&&y===fe,s=!e&&i<y,l=e&&i>=b;if(i<b&&t>b)(xe||S)&&e?(n=y,a=y+be-fe,Me(null)):(n=i,a=t,Me(b));else{if(o)return;s||l?(n=y,a=y+be-fe):(n=i,a=t),Me(null)}ve(n)}we(a),0!==F&&et(n,a,e),z(n,a)}),[S,b,be,y,fe,x,M,z,et]),at=a.React.useCallback((()=>{Ve.current&&(clearInterval(Ve.current),Ve.current=null)}),[]),it=a.React.useCallback((()=>{at(),Ve.current=setInterval((()=>{L||nt(!0)}),g[ae.toLowerCase()])}),[ae,at,L,nt]);a.React.useEffect((()=>{if(!Ve.current){if(Ge||!oe||L)return void at();it()}return()=>{at()}}),[oe,L,Ge,at,it]),a.React.useEffect((()=>{if(Je.current!==Ge&&null!==Ge){if(Je.current=Ge,Ge)return void at();oe&&!L&&it()}}),[Ge,it,at,oe,L]);const ot=(e,t)=>{ke(e),Re(t)},st=(e,t,n)=>{ot(null,null),ve(e),we(t),Me(n),z(e,n||t)},lt=a.React.useMemo((()=>{if(!de)return null;const e=X(A,F,G),t=A/e*100+pe,n=e/A,i=T(de,e,y,b,pe,t,n),o=R(de,e,y,b,pe,t,n),s=C(de,e,y,b,pe,t,n),l=N(de,e,y,b,pe,t,n),r=E(de,e,y,b,pe,t,n),c=I(de,e,y,b,pe,t,n),u=function(e,t,n,a,i,o,s){const l={labels:{},ticks:{}},r=[];t.length>1&&r.push("year"),n.length>1&&r.push("month"),a.length>1&&r.push("day"),i.length>1&&r.push("hour"),o.length>1&&r.push("minute"),s.length>1&&r.push("second");const c=r[r.length-1],u=Object.keys(e).filter((t=>e[t]));if(1===r.length)u.forEach((e=>{l.ticks[e]="medium",l.labels[e]="short"}));else{if(2===r.length)l.ticks[c]="medium",u.forEach((e=>{e!==c&&(l.ticks[e]="long")}));else{const e=r[r.length-2];l.ticks[c]="short",l.ticks[e]="medium",u.forEach((t=>{t!==c&&t!==e&&(l.ticks[t]="long")}))}l.labels=l.ticks}return l}(de,i,o,s,l,r,c),d=["year","month","day","hour","minute","second"];return(0,a.jsx)("div",{className:"timeline-ticks"},[i,o,s,l,r,c].map(((e,t)=>e.map(((e,n)=>{const i=e.position,o=d[t];return(0,a.jsx)("div",{key:`item-${t}-${n}`,className:"timeline-tick-container","data-unit":o,style:{left:i}},e.label&&(0,a.jsx)("div",{className:`timeline-tick_label ${u.labels[o]}-label ${"year"===o&&0===n&&0===pe?"timeline-first_label":""}`},e.label),(0,a.jsx)("div",{key:n,className:(0,a.classNames)(`timeline-tick ${u.ticks[o]}-tick`,e.label?"has-label":"no-label")}))})))))}),[de,F,pe]),rt=a.React.useMemo((()=>function(e,t,n,i,o){const s=(0,a.getAppStore)().getState().appContext.isRTL;return n=(0,Ne.getThemeColorValue)(n||e.ref.palette.black,e),i=i||e.ref.palette.white,o=(0,Ne.getThemeColorValue)(o||e.sys.color.primary.main),a.css`
    color: red;
    height: fit-content;
    color: ${n};

    // Common style
    .timeline-header, .timeline-footer {
      height: 16px;
      display: flex;
      flex-direction: ${s?"row-reverse":"row"};
      align-items: center;
      justify-content: space-between;
      .zoom-container {
        min-width: 36px;
        display: flex;
        flex-direction: ${s?"row-reverse":"row"};
      }
      .range-label {
        display: flex;
        align-items: center;
        font-size: ${a.polished.rem(12)};
        font-weight: 500;
        line-height: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .range-label-badge {
          width: 8px;
          height: 8px;
          min-width: 8px;
          border-radius: 4px;
          margin-right: 0.25rem;
        }
      }
    }
    .timeline-content {
      overflow-x: hidden;

      .timeline-whole {
        .timeline-ticks {
          position: relative;
          .timeline-tick-container {
            position: absolute;
            user-select: none;
            .timeline-tick {
              width: 1px;
              background: ${a.polished.rgba(n,.5)};
            }
            .timeline-tick_label {
              font-size: ${a.polished.rem(11)};
              font-weight: 400;
              line-height: 15px;
              width: max-content;
              transform: translate(${s?"50%":"-50%"});
              color: foregroundColor;
              &.long-label {
                font-weight: 600;
              }
              &.medium-label {
                font-weight: 500;
              }
              &.short-label {
                font-weight: 400;
              }
              &.timeline-first_label {
                /* transform: ${`translate(-${t}px)`}; */
                transform: translate(0);
              }
            }
          }
        }
      }

      .timeline-range-container {
        height: 8px;
        /* width: ${`calc(100% - ${2*t}px)`}; */
        width: 100%;
        border-radius: 4px;
        background-color: ${a.polished.rgba(n,.2)};
        .resize-handlers {
          height: 100%;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
          background-color: ${o};

          .resize-handler {
            width: 8px;
            height: 8px;
            padding: 0;
            overflow: visible;
            border-radius: 8px;
            background: ${o};
            border: 2px solid ${o};
          }

          &:hover {
            .resize-handler {
              background: ${i};
            }
          }
        }
      }
      .timeline-arrow {
        position: absolute;
        &.left-arrow{
          transform: scaleX(-1);
        }
      }
    }
    .jimu-btn {
        color: ${n};
        border-radius: 16px;
        &:hover:not(:disabled) {
          color: ${n};
          background-color: ${a.polished.rgba(n,.2)};
        }
        &.disabled {
          color: ${a.polished.rgba(n,.2)};
          &:hover {
            color: ${a.polished.rgba(n,.2)};
          }
        }
        .jimu-icon {
          margin: 0
        }

        .icon-btn-sizer {
          min-width: 0;
          min-height: 0;
        }
    }

    .jimu-dropdown-button {
      &:not(:disabled):not(.disabled):active,
      &[aria-expanded="true"]{
        border-color: transparent !important;
        color: unset !important;
      }
    }

    // Clasic style
    &.timeline-classic {
      padding: 1rem 1.5rem;
      .timeline-header .range-label {
        .range-label-badge {
          background-color: ${o};
        }
        .range-label-context {
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .timeline-content {
        margin: 1rem 0.5rem;
        .timeline-whole {
          .timeline-ticks {
            padding-top: 0.75rem;
            .timeline-tick-container {
              .timeline-tick {
                &.long-tick {
                  height: 12px;
                  &.no-label {
                    margin-top: 19px;
                  }
                  &.has-label {
                    margin-top: 0;
                  }
                }
                &.medium-tick {
                  height: 8px;
                  &.no-label {
                    margin-top: 23px;
                  }
                  &.has-label {
                    margin-top: 8px;
                  }
                }
                &.short-tick {
                  height: 4px;
                  &.no-label {
                    margin-top: 27px;
                  }
                  &.has-label {
                    margin-top: 12px;
                  }
                }
              }
              .timeline-tick_label {
                margin-bottom: 4px;
              }
            }
          }
          .timeline-arrow {
            top: 78px;
            &.left-arrow{
              left: ${s?"unset":"20px"};
              right: ${s?"20px":"unset"};
            }
            &.right-arrow{
              left: ${s?"20px":"unset"};
              right: ${s?"unset":"20px"};
            }
          }
        }
        .timeline-range-container .resize-handlers .resize-handler {
          min-width: 8px;
          &:focus {
            background: ${i};
            outline-offset: 0;
          }
        }
      }
      .timeline-footer {
        flex-direction: ${s?"row-reverse":"row"};
        .play-container {
          min-width: 65px;
        }
      }
    }

    // Modern style
    &.timeline-modern {
      padding: 1rem 0.5rem;
      height: 156px;

      .timeline-header{
        padding-top: 0;
        padding-bottom: 0;
        padding: 0 36px;
        &.no-play-container {
          padding-left: ${s?"12px":"36px"};
          padding-right: ${s?"36px":"12px"};
        }
        .range-label {
          margin: 0 0.25rem;
          .range-label-badge {
            background-color: ${a.polished.rgba(o,.7)};
          }
        }
      }

      .timeline-content {
        display: flex;
        margin-top: 0.5rem;
          .timeline-left, .timeline-right {
            display: flex;
            height: 80px;
            .play-container {
              min-width: 17px; /* when play btn is hidden */
              display: flex;
              flex-direction: column;
              justify-content: center;
              .jimu-btn {
                margin: 0 0.5rem;
                &.next-btn {
                  margin-bottom: 0.5rem;
                }
                &.play-btn {
                  margin-top: 0.5rem;
                }
              }
            }
          }
        .timeline-middle {
          height: 115px;
          overflow-x: hidden;
          flex-grow: 1;
          .timeline-content-inside {
            border: 1px solid ${a.polished.rgba(n,.5)};
            border-radius: 8px;
            .timeline-whole {
              display: flex;
              flex-direction: column;
              .timeline-ticks {
                .timeline-tick-container {
                  display: flex;
                  flex-direction: column-reverse;
                  .timeline-tick {
                    &.long-tick {
                      height: 32px;
                    }
                    &.medium-tick {
                      height: 16px;
                      margin-top: 16px;
                    }
                    &.short-tick {
                      height: 8px;
                      margin-top: 24px;
                    }
                  }
                  .timeline-tick_label {
                    margin-top: 0.5rem;
                  }
                }
              }
              .timeline-range-container {
                z-index: 1;
                width: 100%;
                background: transparent;
                .resize-handlers {
                  background-color: ${a.polished.rgba(o,.7)};
                  .resize-handler {
                    min-width: 4px;
                    width: 4px;
                    height: calc(100% - 10px);
                    margin: 5px 0;
                    background: transparent;
                    border: none;
                    &.show-bg { /** When handlers.w = 0 */
                      background-color: ${a.polished.rgba(o,.7)};
                      height: 100%;
                      margin: 0;
                      &:hover {
                        background-color: ${a.polished.rgba(o,.9)};
                      }
                    }
                  }
                  &:hover {
                    .resize-handler {
                      background: ${a.polished.rgba(o,.7)};
                    }
                  }
                }
              }
            }
          }
          .timeline-arrow {
            z-index: 2;
            top: 68px;
            &.left-arrow{
              left: 50px;
              left: ${s?"unset":"50px"};
              right: ${s?"50px":"unset"};
            }
            &.right-arrow{
              right: 50px;
              left: ${s?"50px":"unset"};
              right: ${s?"unset":"50px"};
              &.no-play-container {
                left: ${s?"25px":"unset"};
                right: ${s?"unset":"25px"};
              }
            }
          }
        }
      }
    }
  `}(v,7,c,d,f)),[v,7,c,d,f]),ct=a.React.useMemo((()=>{const e=(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",disabled:0===F,onClick:()=>{tt(!1),U(Math.max(0,F-1))}},(0,a.jsx)(se,null)),t=(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",disabled:F===(null==G?void 0:G.zoomLevel),onClick:()=>{tt(!0),U(Math.min(null==G?void 0:G.zoomLevel,F+1))}},(0,a.jsx)(ne,null));return(0,a.jsx)("div",{className:"zoom-container"},0===F?e:(0,a.jsx)(o.Tooltip,{title:ee("zoomOut"),placement:"bottom"},e),F===(null==G?void 0:G.zoomLevel)?t:(0,a.jsx)(o.Tooltip,{title:ee("zoomIn"),placement:"bottom"},t))}),[F,ee,G,tt]),ut=a.React.useMemo((()=>j?(0,a.jsx)(o.Tooltip,{title:ee(oe?"pause":"play"),placement:"bottom"},(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:"play-btn",onClick:()=>{le(!oe)}},oe?(0,a.jsx)(ye,null):(0,a.jsx)(he,null))):null),[j,oe,ee]),dt=a.React.useMemo((()=>(0,a.jsx)(o.Tooltip,{title:ee("previous"),placement:"bottom"},(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",onClick:e=>{nt(!1)}},(0,a.jsx)(Se,null)))),[ee,nt]),mt=a.React.useMemo((()=>(0,a.jsx)(o.Tooltip,{title:ee("next"),placement:"bottom"},(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:"next-btn",onClick:e=>{nt(!0)}},(0,a.jsx)(De,null)))),[ee,nt]),pt=a.React.useMemo((()=>{const e=a.dateUtils.formatDateLocally(y,K,m,p),t=a.dateUtils.formatDateLocally(b,K,m,p);return(0,a.jsx)(a.React.Fragment,null,(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",ref:e=>{Fe.current=e},"aria-label":ee("moreInfo"),"aria-haspopup":"true","aria-expanded":Ue,onClick:e=>{Be(!Ue)}},(0,a.jsx)(ue,null)),(0,a.jsx)(o.Popper,{open:Ue,keepMount:!0,showArrow:!0,reference:Fe,toggle:e=>{Be(!1),"Escape"===(null==e?void 0:e.key)&&a.lodash.defer((()=>{Fe.current.focus()}))}},(0,a.jsx)("div",{className:"p-4"},(0,a.jsx)("h6",{className:"mb-2"},ee("overallTimeExtent")),(0,a.jsx)("div",{className:"mb-4"},`${e} - ${t}`),(0,a.jsx)(o.Label,{check:!0,className:"d-flex align-items-center"},(0,a.jsx)("h6",{className:"flex-grow-1 mb-0 mr-1"},ee("filteringApplied")),(0,a.jsx)(o.Switch,{checked:l,onChange:(e,t)=>{W(t)}})))))}),[ee,y,b,K,Ue,l,W]),ht=a.React.useMemo((()=>(0,a.jsx)(o.Dropdown,{activeIcon:!0},(0,a.jsx)(o.Tooltip,{title:ee("speed"),placement:"bottom"},(0,a.jsx)(o.DropdownButton,{icon:!0,type:"tertiary",arrow:!1,"aria-label":ee("speed"),"a11y-description":te.filter((e=>e.value===ae))[0].label},(0,a.jsx)(Ce,null))),(0,a.jsx)(o.DropdownMenu,null,te.map((e=>(0,a.jsx)(o.DropdownItem,{key:e.value,value:e.value,active:e.value===ae,onClick:e=>{ie(e.target.value)}},e.label)))))),[te,ae,ee]),gt=a.hooks.useEventCallback((e=>{const t=b-y,n=J(A,F,G);let a=(y+pe/100*t+(e?1:-1)*(t/n)-y)/(b-y)*100;a=Math.max(0,a),a=Math.min(a,(n-1)/n*100),ge(a)})),ft=J(A,F,G),vt=(0,a.getAppStore)().getState().appContext.isRTL,yt=je||fe,bt=Te||xe||be,{startPositionForStep:wt,widthForStep:xt}=((t,n)=>{let a=(t-y)/(b-y),i=(n-y)/(b-y)-a;return t===b?(a=r===e.Classic?"calc(100% - 16px)":"calc(100% - 8px)",i=0):a=100*a+"%",{startPositionForStep:a,widthForStep:i}})(yt,bt),St=a.dateUtils.formatDateLocally(yt,K,m,p),Mt=a.dateUtils.formatDateLocally(bt,K,m,p),jt=0!==pe,kt=100-pe-1/ft*100>1e-11;return(0,a.jsx)("div",{css:rt,dir:"ltr",className:(0,a.classNames)("timeline w-100",{"timeline-classic":r===e.Classic,"timeline-modern":r===e.Modern})},r===e.Classic?(0,a.jsx)(a.React.Fragment,null,(0,a.jsx)("div",{className:"timeline-header"},(0,a.jsx)("div",{className:"range-label",dir:vt?"rtl":"ltr"},(0,a.jsx)("div",{className:"range-label-badge"}),(0,a.jsx)("div",{className:"range-label-context"},St+" - "+Mt)),ct),(0,a.jsx)("div",{className:"timeline-content"},(0,a.jsx)("div",{className:"timeline-content-inside"},(0,a.jsx)("div",{className:"timeline-whole",ref:e=>re.current=e,style:{width:100*ft+"%",height:$+"px",marginLeft:-pe*ft+"%"}},lt,jt&&(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:"timeline-arrow left-arrow",onClick:e=>gt(!1)},(0,a.jsx)(o.Icon,{width:4,height:16,icon:Ee})),kt&&(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:"timeline-arrow right-arrow",onClick:e=>gt(!0)},(0,a.jsx)(o.Icon,{width:4,height:16,icon:Ee}))),(0,a.jsx)("div",{className:"timeline-range-container",style:{width:100*ft+"%",marginLeft:-pe*ft+"%"}},(0,a.jsx)("div",{className:"resize-handlers",ref:e=>Ae.current=e,style:{marginLeft:wt,width:100*xt+"%"}},(0,a.jsx)("button",{className:"resize-handler resize-left",ref:e=>{Pe.current=e},title:St}),(0,a.jsx)("button",{className:"resize-handler resize-right",ref:e=>{$e.current=e},title:Mt}))))),(0,a.jsx)("div",{className:"timeline-footer"},pt,(0,a.jsx)("div",{className:"play-container"},dt,ut,mt),j?ht:(0,a.jsx)("div",null))):(0,a.jsx)(a.React.Fragment,null,(0,a.jsx)("div",{className:(0,a.classNames)("timeline-header",{"no-play-container":!j})},pt,(0,a.jsx)("div",{className:"range-label",dir:vt?"rtl":"ltr"},(0,a.jsx)("div",{className:"range-label-badge"}),St+" - "+Mt),ct),(0,a.jsx)("div",{className:"timeline-content"},(0,a.jsx)("div",{className:"timeline-left"},(0,a.jsx)("div",{className:"play-container"},mt,dt)),(0,a.jsx)("div",{className:"timeline-middle"},jt&&(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:(0,a.classNames)("timeline-arrow left-arrow",{"no-play-container":!j}),onClick:e=>gt(!1)},(0,a.jsx)(o.Icon,{width:4,height:16,icon:Ee})),(0,a.jsx)("div",{className:"timeline-content-inside"},(0,a.jsx)("div",{className:"timeline-whole",ref:e=>re.current=e,style:{width:100*ft+"%",height:$+"px",marginLeft:-pe*ft+"%"}},(0,a.jsx)("div",{style:{height:$-32+"px"}}),lt,(0,a.jsx)("div",{className:"timeline-range-container",style:{height:$+"px",marginTop:-($-32)+"px"}},(0,a.jsx)("div",{className:"resize-handlers",ref:e=>Ae.current=e,style:{marginLeft:wt,width:100*xt+"%"}},(0,a.jsx)("button",{className:"resize-handler resize-left "+(yt===bt?"show-bg":""),ref:e=>{Pe.current=e},title:St}),(0,a.jsx)("button",{className:"resize-handler resize-right "+(yt===bt?"show-bg":""),ref:e=>{$e.current=e},title:Mt}))))),kt&&(0,a.jsx)(o.Button,{icon:!0,type:"tertiary",size:"sm",className:(0,a.classNames)("timeline-arrow right-arrow",{"no-play-container":!j}),onClick:e=>gt(!0)},(0,a.jsx)(o.Icon,{width:4,height:16,icon:Ee}))),(0,a.jsx)("div",{className:"timeline-right"},(0,a.jsx)("div",{className:"play-container"},j&&ht,ut)))))};var We=function(e,t,n,a){return new(n||(n=Promise))((function(i,o){function s(e){try{r(a.next(e))}catch(e){o(e)}}function l(e){try{r(a.throw(e))}catch(e){o(e)}}function r(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,l)}r((a=a.apply(e,t||[])).next())}))};class Ae extends a.BaseVersionManager{constructor(){super(...arguments),this.versions=[{version:"1.11.0",description:"",upgrader:e=>We(this,void 0,void 0,(function*(){let t=e;if(!t.honorTimeSettings)if(t.timeSettings){const{stepLength:e,dividedCount:n}=t.timeSettings;t=e?t.setIn(["timeSettings","stepLength","val"],Math.round(e.val)):t.setIn(["timeSettings","dividedCount"],Math.round(n))}else t=t.set("honorTimeSettings",!0);return t}))},{version:"1.12.0",description:"",upgrader:e=>We(this,void 0,void 0,(function*(){let n=e;return n=n.without("speed"),!n.honorTimeSettings&&n.timeSettings&&(n=n.setIn(["timeSettings","speed"],t.Medium)),n}))}]}}const Pe=new Ae;class $e extends a.React.PureComponent{constructor(){super(...arguments),this.onDataSourceCreated=e=>{this.props.onCreateDataSourceCreatedOrFailed(this.props.useDataSource.dataSourceId,e)},this.onCreateDataSourceFailed=()=>{this.props.onCreateDataSourceCreatedOrFailed(this.props.useDataSource.dataSourceId,null)},this.onDataSourceInfoChange=e=>{this.props.onIsDataSourceNotReady(this.props.useDataSource.dataSourceId,null==e?void 0:e.status)}}componentWillUnmount(){this.props.onCreateDataSourceCreatedOrFailed(this.props.useDataSource.dataSourceId,null),this.props.onIsDataSourceNotReady(this.props.useDataSource.dataSourceId,a.DataSourceStatus.NotReady)}render(){const{useDataSource:e}=this.props;return(0,a.jsx)(a.DataSourceComponent,{useDataSource:e,onDataSourceCreated:this.onDataSourceCreated,onCreateDataSourceFailed:this.onCreateDataSourceFailed,onDataSourceInfoChange:this.onDataSourceInfoChange})}}const Ve=Object.assign({},Z,a.defaultMessages,o.defaultMessages),Fe=l(10307),Ue="156px",Be=e=>{var t,s,l,r,c,u;const{useDataSources:d,theme:m,id:p,config:g,intl:y,autoWidth:b,autoHeight:j}=e,{enablePlayControl:k,autoPlay:D,timeSettings:T,honorTimeSettings:R,dataSourceType:O,timeStyle:C,foregroundColor:N,backgroundColor:E,sliderColor:I}=g,{speed:L}=T||{},[z,W]=a.React.useState(null),[A,P]=a.React.useState(!0),[$,V]=a.React.useState(L),[F,U]=a.React.useState(null),[B,H]=a.React.useState(null),[Y,_]=a.React.useState(null),[G,J]=a.React.useState([]),[X,q]=a.React.useState(!0),[Q,Z]=a.React.useState(null),[K,ee]=a.React.useState(null),te=a.React.useRef(null),ne=a.ReactRedux.useSelector((e=>{var t,n;return(null===(n=null===(t=e.appConfig.attributes)||void 0===t?void 0:t.timezone)||void 0===n?void 0:n.type)===a.TimezoneConfig.Data})),ae=a.React.useMemo((()=>i.MapViewManager.getInstance()),[]),ie=a.React.useMemo((()=>a.DataSourceManager.getInstance()),[]),oe=a.React.useMemo((()=>{if(G.length)return!1;const e=Object.keys(Y||{}).sort(),t=(d||(0,a.Immutable)([])).map((e=>e.dataSourceId)).asMutable({deep:!0});return a.utils.diffArrays(!0,e,t).isEqual}),[Y,d,G]);a.React.useEffect((()=>{var e;return Z(null===(e=te.current)||void 0===e?void 0:e.clientWidth),(0,i.loadArcGISJSAPIModules)(["esri/core/reactiveUtils"]).then((e=>{H(e[0])})),()=>{le(null,null,!0)}}),[]),a.React.useEffect((()=>{_(null),U(null),ee(null)}),[O]),a.React.useEffect((()=>{if(M(O))U(d);else if((null==d?void 0:d.length)>0){const e=[];d.forEach((t=>{e.push(ie.createDataSourceByUseDataSource((0,a.Immutable)(t)).then((e=>e.isDataSourceSet&&!e.areChildDataSourcesCreated()?e.childDataSourcesReady().then((()=>e)):e)))})),Promise.all(e).then((e=>{const t={};e.forEach((e=>{t[e.id]=e})),_(t)})).catch((e=>{}))}}),[d,ie,O,U,_]),a.React.useEffect((()=>{if(Y&&B&&oe)if(R){const e=function(e,t=!1){var a,o,s;let l=null;const r=e[Object.keys(e).filter((t=>e[t].type===i.ArcGISDataSourceTypes.WebMap))[0]],c=null===(s=null===(o=null===(a=null==r?void 0:r.getItemData())||void 0===a?void 0:a.widgets)||void 0===o?void 0:o.timeSlider)||void 0===s?void 0:s.properties;if(c){const{startTime:e,endTime:a,timeStopInterval:i,numberOfStops:o,thumbMovingRate:s,thumbCount:r}=c;let u=e,d=a;if(t){const t=x(e,a,!0);u=t.startTime,d=t.endTime}if(l={speed:f(s),layerList:null,startTime:{value:u},endTime:{value:d},timeDisplayStrategy:2===r?n.current:n.cumulatively},i){const e=function(e){switch(e){case"esriTimeUnitsMonths":return"month";case"esriTimeUnitsDays":return"day";case"esriTimeUnitsHours":return"hour";case"esriTimeUnitsMinutes":return"minute";default:return"year"}}(i.units);l.accuracy=e,l.stepLength={val:i.interval,unit:e}}else if(o){l.dividedCount=o;const e=S(u,d);l.accuracy=e[0];const t=(d-u)/o;e.some((e=>t>=1e3*h[e]&&(l.accuracy=e,!0)))}}return l}(Y,!0);V(null==e?void 0:e.speed),ee(e)}else{const e=v(T,Y,!0);V(L),ee(e)}}),[Y,B,R,L,T,oe]);const se=(e,t)=>{let n=null;return Object.keys(e.jimuLayerViews).forEach((a=>{e.jimuLayerViews[a].layerDataSourceId===t&&(n=e.jimuLayerViews[a])})),n},le=a.hooks.useEventCallback(((e,t,n=!1)=>{var i;if(!Y)return;const o={time:n?null:[e,t]};if(!n){const n=x(e,t);o.time=[n.startTime,n.endTime]}if(n||(()=>{let e=[],t=null;const n=ae.getAllJimuMapViewIds();O===a.AllDataSourceTypes.WebMap?(t=Y[Object.keys(Y)[0]],e=t.getAllChildDataSources().map((e=>e.id))):e=Object.keys(Y);const i=[];e.forEach((e=>{var o;const s=t||(null===(o=Y[e])||void 0===o?void 0:o.getRootDataSource());if((null==s?void 0:s.type)===a.AllDataSourceTypes.WebMap){const t=n.filter((e=>ae.getJimuMapViewById(e).dataSourceId===s.id));t.forEach((t=>{const n=ae.getJimuMapViewById(t),a=se(n,e);(null==a?void 0:a.view)&&i.push(B.whenOnce((()=>!a.view.updating)))}))}})),Promise.all(i).then((e=>{q(!1)}))})(),O===a.AllDataSourceTypes.WebMap){const e=w(Y,null===(i=g.timeSettings)||void 0===i?void 0:i.layerList);Object.keys(e).forEach((t=>{re(e[t],o,p)}))}else Object.keys(Y).forEach((e=>{Y[e]&&re(Y[e],o,p)}))}));a.React.useEffect((()=>{z&&le(z[0],z[1],!A)}),[z,A,le]);const re=(e,t,n)=>{var i,o,s,l;e.type===a.DataSourceTypes.MapService?(null===(i=e.supportTime)||void 0===i?void 0:i.call(e))&&(t=ce(e,t),null===(o=e.changeTimeExtent)||void 0===o||o.call(e,t.time,n)):M(e.type)&&(null===(s=e.supportTime)||void 0===s?void 0:s.call(e))&&(t=ce(e,t),null===(l=e.updateQueryParams)||void 0===l||l.call(e,t,n))},ce=(e,t)=>{const n=e.getTimeInfo().exportOptions||{},{TimeOffset:a=0,timeOffsetUnits:i}=n;if((null==t?void 0:t.time)&&0!==a){let e=t.time[0],n=t.time[1];const o=new Date(e),s=new Date(n);switch(i){case"esriTimeUnitsCenturies":case"esriTimeUnitsDecades":case"esriTimeUnitsYears":const t="esriTimeUnitsCenturies"===i?100:"esriTimeUnitsDecades"===i?10:1;e=o.setFullYear(o.getFullYear()-a*t),n=s.setFullYear(s.getFullYear()-a*t);break;case"esriTimeUnitsMonths":e=o.setMonth(o.getMonth()-a),n=s.setMonth(s.getMonth()-a);break;case"esriTimeUnitsWeeks":case"esriTimeUnitsDays":const l="esriTimeUnitsWeeks"===i?7:1;e=o.setDate(o.getDate()-a*l),n=s.setDate(s.getDate()-a*l);break;case"esriTimeUnitsHours":e=o.setHours(o.getHours()-a),n=s.setHours(s.getHours()-a);break;case"esriTimeUnitsMinutes":e=o.setMinutes(o.getMinutes()-a),n=s.setMinutes(s.getMinutes()-a);break;case"esriTimeUnitsSeconds":e=o.setSeconds(o.getSeconds()-a),n=s.setSeconds(s.getSeconds()-a);break;case"esriTimeUnitsMilliseconds":e=o.setMilliseconds(o.getMilliseconds()-a),n=s.setMilliseconds(s.getMilliseconds()-a)}t.time=[e,n]}return t},ue=t=>{var n,i,o,s;if(b){const{layoutId:l,layoutItemId:r}=e,c=(0,a.getAppStore)().getState(),u=null===(s=null===(o=null===(i=null===(n=null==c?void 0:c.appConfig)||void 0===n?void 0:n.layouts)||void 0===i?void 0:i[l])||void 0===o?void 0:o.content)||void 0===s?void 0:s[r];if(!u)return;const d=u.bbox.width;if(d.includes("px"))t=d;else{const e=`div.layout[data-layoutid=${l}]`,n=document.querySelector(e),{clientWidth:a=480}=n||{};t=a*parseInt(d.split("%")[0])/100}}Z(t)},de=a.React.useMemo((()=>null!==Y&&Object.keys(Y).filter((e=>null===Y[e])).length===Object.keys(Y).length),[Y]),me=G.length>0,pe=(e,t)=>{M(O)&&Y&&Y[e]&&Y[e].getDataSourceJson().isOutputFromWidget&&ge(e,t)},he=(e,t)=>{M(O)&&_((n=>{const i=t||(null==n?void 0:n[e]);(null==i?void 0:i.getDataSourceJson().isOutputFromWidget)&&ge(e,t?i.getInfo().status:a.DataSourceStatus.Unloaded);const o=Object.assign({},n);return(null==n?void 0:n[e])&&!t?delete o[e]:o[e]=t,o}))},ge=(e,t)=>{J((n=>{let i=[];return i=t===a.DataSourceStatus.NotReady?n.includes(e)?n:n.concat(e):n.includes(e)?n.filter((t=>t!==e)):n,i}))},fe=e=>y.formatMessage({id:e,defaultMessage:Ve[e]}),ve=Y&&O===a.AllDataSourceTypes.WebMap&&B&&null===K,ye=(null===(t=null==K?void 0:K.startTime)||void 0===t?void 0:t.value)>(null===(s=null==K?void 0:K.endTime)||void 0===s?void 0:s.value),be=de||me||ve||ye||ne;return!d||0===d.length||!me&&K&&(null===(l=null==K?void 0:K.startTime)||void 0===l?void 0:l.value)===(null===(r=null==K?void 0:K.endTime)||void 0===r?void 0:r.value)?(0,a.jsx)(o.WidgetPlaceholder,{icon:Fe,widgetId:p,css:a.css`height: ${j?Ue:"100%"};`,message:fe("_widgetLabel")}):(0,a.jsx)(a.React.Fragment,null,(null==F?void 0:F.length)>0&&(null==F?void 0:F.map((e=>(0,a.jsx)($e,{key:e.dataSourceId,useDataSource:e,onIsDataSourceNotReady:pe,onCreateDataSourceCreatedOrFailed:he})))),be?(()=>{let e="";return e=de?"dataSourceCreateError":me?"outputDatasAreNotGenerated":ve?"noTlFromHonoredMapWarning":ne?"timezoneWarning":"invalidTimeSpanWarning",(0,a.jsx)("div",{className:"placeholder-container w-100 h-100 position-relative"},(0,a.jsx)(o.WidgetPlaceholder,{icon:Fe,widgetId:p,css:a.css`height: ${j?Ue:"100%"};`,message:fe("_widgetLabel")}),(0,a.jsx)(o.Alert,{form:"tooltip",size:"small",type:"warning",withIcon:!0,className:"position-absolute",style:{bottom:10,right:10},text:fe(e)}))})():(0,a.jsx)("div",{className:"timeline-widget",css:a.css`
              width: ${b?Q+"px":"unset"};
              height: ${j&&!Y?Ue:"unset"};
              background: ${E||m.ref.palette.white};
            `,ref:e=>te.current=e},(0,a.jsx)(a.ReactResizeDetector,{handleWidth:!0,onResize:ue}),null!==Y&&oe?K&&Q>=0&&(0,a.jsx)(ze,{theme:m,width:Q,updating:!!Y&&Object.keys(Y).filter((e=>{var t;return(null===(t=Y[e])||void 0===t?void 0:t.getInfo().status)===a.DataSourceStatus.Loading})).length>0||X,startTime:null===(c=K.startTime)||void 0===c?void 0:c.value,endTime:null===(u=K.endTime)||void 0===u?void 0:u.value,accuracy:K.accuracy,stepLength:K.stepLength,dividedCount:K.dividedCount,cumulatively:K.timeDisplayStrategy===n.cumulatively,timeStyle:C,foregroundColor:N,backgroundColor:E,sliderColor:I,enablePlayControl:k,speed:$,autoPlay:D,applied:A,onTimeChanged:(e,t)=>{W([e,t])},onApplyStateChanged:e=>{P(e)}}):(0,a.jsx)("div",{className:"jimu-secondary-loading",css:a.css`position: 'absolute';left: '50%';top: '50%';`})))};Be.versionManager=Pe;const He=Be;function Ye(e){l.p=e}})(),r})())}}}));