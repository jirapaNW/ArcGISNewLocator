System.register(["jimu-core"],(function(t,e){var r={};return{setters:[function(t){r.css=t.css}],execute:function(){t((()=>{"use strict";var t={244:t=>{t.exports=r}},e={};function o(r){var n=e[r];if(void 0!==n)return n.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,o),i.exports}o.d=(t,e)=>{for(var r in e)o.o(e,r)&&!o.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var n={};return(()=>{o.r(n),o.d(n,{Global:()=>i,Nav:()=>e,Select:()=>r});var t=o(244);const e=e=>{const r=e.pills;return t.css`
    ${r&&t.css`
      .nav-item {
        &:not(:first-of-type):not(:last-of-type) {
          .nav-link {
            border-radius: 0;
          }
        }
        &:first-of-type {
          .nav-link {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
        &:last-of-type {
          .nav-link {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
          }
        }
      }
    `}
  `},r=e=>{var r,o;const n=e.theme;return t.css`
    .dropdown-button {
      .caret-icon {
        color: ${null===(o=null===(r=null==n?void 0:n.ref.palette)||void 0===r?void 0:r.neutral)||void 0===o?void 0:o[1e3]};
        svg {
          height: 8px;
          width: 8px;
        }
      }
    }
  `},i=e=>{const r=e.theme;return t.css`
    html, body {
      overflow: hidden;
    }
    html.scrollable {
      overflow: auto;
      body {
        overflow: unset;
      }
    }
    .jimu-widget-setting--header {
      padding: ${r.sys.spacing(4)} ${r.sys.spacing(4)};
      margin-bottom: 0;
      padding-bottom: 0;
      line-height: 1;
    }
  `}})(),n})())}}}));