System.register(["jimu-core","jimu-ui"],(function(e,t){var n={},o={};return{setters:[function(e){n.BaseVersionManager=e.BaseVersionManager,n.BrowserSizeMode=e.BrowserSizeMode,n.Immutable=e.Immutable,n.LinkType=e.LinkType,n.PageType=e.PageType,n.React=e.React,n.ReactRedux=e.ReactRedux,n.css=e.css,n.hooks=e.hooks,n.jsx=e.jsx,n.polished=e.polished},function(e){o.Button=e.Button,o.Drawer=e.Drawer,o.Icon=e.Icon,o.Navigation=e.Navigation,o.PanelHeader=e.PanelHeader,o.componentStyleUtils=e.componentStyleUtils,o.styleUtils=e.styleUtils,o.utils=e.utils}],execute:function(){e((()=>{var e={37222:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path fill="#000" fill-rule="nonzero" d="M1 0h3a1 1 0 0 1 1 1v1h6a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1m0 1v10h10V3H4V1zm0 3.5h10v1H1z"></path></svg>'},49846:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path fill-rule="nonzero" d="M7.42 8.839a.5.5 0 0 1 0 .71L6 10.966a3.5 3.5 0 0 1-4.967 0 3.5 3.5 0 0 1 0-4.966l1.416-1.422a.504.504 0 0 1 .713.712L1.746 6.713a2.497 2.497 0 0 0-.003 3.545c.983.983 2.56.98 3.544-.003l1.42-1.42a.504.504 0 0 1 .712.004m1.415-2.132 1.422-1.416a2.5 2.5 0 0 0 0-3.547 2.5 2.5 0 0 0-3.547 0L5.29 3.163a.504.504 0 0 1-.713-.712l1.42-1.42a3.506 3.506 0 0 1 4.97.003 3.5 3.5 0 0 1 0 4.967L9.547 7.42a.504.504 0 0 1-.713-.712m-4.967.71 3.548-3.548a.504.504 0 0 1 .713.713L4.58 8.129a.504.504 0 0 1-.713-.712"></path></svg>'},73635:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 12"><path fill="#000" fill-rule="nonzero" d="M1 0h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1m0 1v10h8V1zm2 2h4a.5.5 0 0 1 0 1H3a.5.5 0 0 1 0-1m0 2.5h4a.5.5 0 0 1 0 1H3a.5.5 0 0 1 0-1"></path></svg>'},79244:e=>{"use strict";e.exports=n},14321:e=>{"use strict";e.exports=o}},t={};function i(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,i),a.exports}i.d=(e,t)=>{for(var n in t)i.o(t,n)&&!i.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.p="";var a={};return i.p=window.jimuConfig.baseUrl,(()=>{"use strict";i.r(a),i.d(a,{__set_webpack_public_path__:()=>L,default:()=>k});var e,t=i(79244);!function(e){e.Icon="ICON",e.Vertical="VERTICAL",e.Horizontal="HORIZONTAL"}(e||(e={}));const n={type:"HORIZONTAL",subOpenMode:"FOLDABLE",main:{alignment:"center",space:{distance:0,unit:"px"},showText:!0,showIcon:!1,iconPosition:"start"},navType:"default",advanced:!1},o=n=>{var o,i,a,r,l,s,c;if(!n)return;const u=n,d=(0,t.Immutable)({}),p=u.type===e.Icon?"drawer":"nav",v=u.navType,m=u.type!==e.Horizontal,g=null==u?void 0:u.icon,y=null==u?void 0:u.drawerDirection,h=(f=u.type,b=u.subOpenMode,f===e.Horizontal?"dropdown":"EXPAND"===b?"static":"foldable");var f,b;const w=null===(o=null==u?void 0:u.main)||void 0===o?void 0:o.alignment,x=null===(i=null==u?void 0:u.main)||void 0===i?void 0:i.showText,j=null===(a=null==u?void 0:u.main)||void 0===a?void 0:a.showIcon,O=null===(r=null==u?void 0:u.main)||void 0===r?void 0:r.iconPosition,T=null!==(s=null===(l=null==u?void 0:u.main)||void 0===l?void 0:l.space)&&void 0!==s?s:{distance:0,unit:"px"},S={icon:g,anchor:y,submenuMode:h,textAlign:w,showIcon:j,showText:x,iconPosition:O,gap:`${null==T?void 0:T.distance}${null==T?void 0:T.unit}`},P=u.advanced,R=u.paper,I=((e,t)=>{if(!e)return;const n=null==e?void 0:e[t];if(!n)return;let o=n;return n.bg&&(o=o.setIn(["root","bg"],n.bg),o=o.without("bg")),o})(null===(c=null==u?void 0:u.main)||void 0===c?void 0:c.variants,u.navType);return d.set("type",p).set("menuStyle",v).set("vertical",m).set("standard",S).set("advanced",P).set("paper",R).set("variant",I)};class r extends t.BaseVersionManager{constructor(){super(...arguments),this.versions=[{version:"1.0.0",description:"The first release.",upgrader:e=>{var t;if(!e)return n;let o=e;return(null===(t=null==e?void 0:e.main)||void 0===t?void 0:t.variants)&&(o=o.set("advanced",!0)),o}},{version:"1.1.0",description:"Version manager for release 1.1",upgrader:e=>o(e||n)},{version:"1.13.0",description:"Change borderRadius from 50rem to 6.25rem in pills style",upgrader:e=>{var t;if("pills"!==(null==e?void 0:e.menuStyle)||!(null==e?void 0:e.advanced))return e;let n=e;return Object.keys((null===(t=null==n?void 0:n.variant)||void 0===t?void 0:t.item)||{}).forEach((e=>{var t;"50rem"===(null===(t=n.variant.item[e])||void 0===t?void 0:t.borderRadius)&&(n=n.setIn(["variant","item",e,"borderRadius"],"6.25rem"))})),n}}]}}const l=new r;var s=i(14321);const{useState:c,useEffect:u,useMemo:d}=t.React,{useSelector:p}=t.ReactRedux,v=i(73635),m=i(49846),g=i(37222),y={[t.PageType.Normal]:v,[t.PageType.Link]:m,[t.PageType.Folder]:g},h=(e,t)=>(e=((e,t)=>(e=e.filter((e=>{const n=Object.keys(e)[0];return(null==t?void 0:t[n]).isVisible}))).map((e=>{const n=Object.entries(e)[0],o=n[0];let i=n[1];return i=i.filter((e=>(null==t?void 0:t[e]).isVisible)),e.set(o,i)})))(e,t),e.map((e=>{const n=Object.entries(e)[0],o=n[0],i=n[1],a=t[o],r=f(a),l=i.map((e=>{const n=t[e];return f(n)}));return r.set("subs",l)}))),f=e=>{const n=b(e),o=w(e),i=e.icon||y[e.type];return(0,t.Immutable)({linkType:n,value:o,icon:"[object Object]"===Object.prototype.toString.call(i)?i:s.utils.toIconResult(i,e.type,16),target:e.openTarget,name:e.label})},b=e=>e.type===t.PageType.Link?t.LinkType.WebAddress:e.type===t.PageType.Normal?t.LinkType.Page:e.type===t.PageType.Folder?t.LinkType.None:void 0,w=e=>e.type===t.PageType.Link?e.linkUrl:e.type===t.PageType.Normal?e.id:e.type===t.PageType.Folder?"#":void 0,x=(e,n,o,i)=>d((()=>e?t.css`
      .jimu-nav,
      &.jimu-nav {
        ${s.componentStyleUtils.nav.getRootStyles(null==o?void 0:o.root)};
        ${s.componentStyleUtils.nav.getVariantStyles(n,(e=>(0,t.Immutable)(e).merge({item:{hover:{fontWeight:"400"},active:{fontWeight:"400"}}},{deep:!0}))(o),i,!0)};
        ${s.styleUtils.getButtonStyleByState(null==o?void 0:o.item,!0)}
      }
    `:t.css``),[e,n,o,i]),j={_widgetLabel:"Menu"};var O=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]])}return n};const T=e=>{var n,o;const[i,a]=t.React.useState(!1),{icon:r,anchor:l,advanced:c,type:u,variant:p,paper:v,vertical:m}=e,g=O(e,["icon","anchor","advanced","type","variant","paper","vertical"]),y=()=>{a((e=>!e))},h=((e,n,o)=>{var i,a;const r=null==o?void 0:o.bg,l=null===(a=null===(i=null==n?void 0:n.item)||void 0===i?void 0:i.default)||void 0===a?void 0:a.color;return d((()=>e?t.css`
      .paper {
        background: ${r};
        .header {
          color: ${l};
          padding: ${t.polished.rem(8)};
        }
      }
    `:t.css`
      .paper {
        .header {
          padding: ${t.polished.rem(8)};
        }
      }
    `),[e,r,l])})(c,p,v),f=x(c,u,p,!0),b=t.hooks.useCheckSmallBrowserSizeMode(),w=(e=>d((()=>e?t.css`
      & .jimu-nav-link-wrapper {
        text-overflow: ellipsis !important;
        white-space: nowrap;
        overflow: hidden !important;
      }
    `:t.css`
      &{
        min-width: ${t.polished.rem(240)};
        max-width: ${t.polished.rem(320)};
      }
      & .jimu-nav-link-wrapper {
        text-overflow: ellipsis !important;
        overflow: hidden !important;
        white-space: nowrap;
      }
    `),[e]))(b),T=t.ReactRedux.useSelector((e=>e.appRuntimeInfo.currentPageId));t.React.useEffect((()=>{a(!1)}),[T]);const S=t.hooks.useTranslation(j);return(0,t.jsx)(t.React.Fragment,null,(0,t.jsx)("div",{className:"button-container w-100 h-100 d-flex align-items-center justify-content-center"},(0,t.jsx)(s.Button,{icon:!0,type:"tertiary",onClick:y,"aria-label":S("_widgetLabel"),"aria-haspopup":"menu"},(0,t.jsx)(s.Icon,{className:"caret-icon",icon:null==r?void 0:r.svg,color:null===(n=null==r?void 0:r.properties)||void 0===n?void 0:n.color,size:null===(o=null==r?void 0:r.properties)||void 0===o?void 0:o.size}))),(0,t.jsx)(s.Drawer,{anchor:l,open:i,toggle:y,autoFlip:!1,css:h},(0,t.jsx)(s.PanelHeader,{className:"header",title:"",onClose:y}),(0,t.jsx)(s.Navigation,Object.assign({role:"menu",className:b?"w-100":"menu-navigation",vertical:m,css:[w,f],type:u,showTitle:!0,isUseNativeTitle:!0,right:!0},g))))};var S=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]])}return n};const{useMemo:P}=t.React,R=e=>{const{type:n,menuStyle:o,vertical:i,standard:a,advanced:r,paper:l,variant:d}=e,v=(()=>{const[e,t]=c([]),n=p((e=>{var t;return null===(t=null==e?void 0:e.appConfig)||void 0===t?void 0:t.pages})),o=p((e=>{var t;return null===(t=null==e?void 0:e.appConfig)||void 0===t?void 0:t.pageStructure}));return u((()=>{const e=h(o,n);t(e)}),[n,o]),e})(),m=(()=>{const e=p((e=>{var t;return null===(t=null==e?void 0:e.appRuntimeInfo)||void 0===t?void 0:t.currentPageId}));return t.React.useCallback((t=>(e=>{if(!(null==e?void 0:e.value))return"";const t=e.value.split(",");return(null==t?void 0:t.length)?t[0]:""})(t)===e),[e])})(),{icon:g,anchor:y}=a,f=S(a,["icon","anchor"]),b=(e=>p((n=>(null==n?void 0:n.browserSizeMode)===t.BrowserSizeMode.Small?"full":e)))(y),w=(e=>P((()=>t.css`
      width: 100%;
      height: 100%;
      max-width: 100vw;
      max-height: 100vh;
      .nav-item {
        &.nav-link {
          width: ${e?"100%":"unset"};
          height: ${e?"unset":"100%"};
        }
        ${!e&&t.css`
          .nav-link:hover {
            position: relative;
            &::before {
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              top: -1000px;
              bottom: 100%;
            }
            &::after {
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              top: 100%;
              bottom: -1000px;
            }
          }
        `}
      }
    `),[e]))(i),j=x(r,o,d,i);return(0,t.jsx)("div",{className:"menu-navigation",css:[w,j]},"nav"===n&&(0,t.jsx)(s.Navigation,Object.assign({role:"menu",data:v,vertical:i,isActive:m,showTitle:!0,isUseNativeTitle:!0,scrollable:!0,right:!0},f,{type:o})),"drawer"===n&&(0,t.jsx)(T,Object.assign({data:v,advanced:r,variant:d,paper:l,type:o,vertical:i,isActive:m,scrollable:!1,icon:g,anchor:b},f)))},I=e=>{const{config:n}=e;return t.React.createElement("div",{className:"widget-menu jimu-widget"},t.React.createElement(R,Object.assign({},n)))};I.versionManager=l;const k=I;function L(e){i.p=e}})(),a})())}}}));