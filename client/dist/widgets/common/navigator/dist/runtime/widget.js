System.register(["jimu-core","jimu-ui","jimu-layouts/layout-runtime"],(function(e,t){var o={},n={},i={};return{setters:[function(e){o.AppMode=e.AppMode,o.BaseVersionManager=e.BaseVersionManager,o.BrowserSizeMode=e.BrowserSizeMode,o.ButtonClickMessage=e.ButtonClickMessage,o.Immutable=e.Immutable,o.LayoutItemType=e.LayoutItemType,o.LayoutType=e.LayoutType,o.LinkType=e.LinkType,o.MessageManager=e.MessageManager,o.React=e.React,o.ReactRedux=e.ReactRedux,o.ViewChangeMessage=e.ViewChangeMessage,o.appActions=e.appActions,o.css=e.css,o.getAppStore=e.getAppStore,o.getIndexFromProgress=e.getIndexFromProgress,o.hooks=e.hooks,o.jimuHistory=e.jimuHistory,o.jsx=e.jsx,o.lodash=e.lodash,o.moduleLoader=e.moduleLoader,o.polished=e.polished,o.utils=e.utils},function(e){n.NavButtonGroup=e.NavButtonGroup,n.Navigation=e.Navigation,n.PageNumber=e.PageNumber,n.Slider=e.Slider,n.TextAlignValue=e.TextAlignValue,n.WidgetPlaceholder=e.WidgetPlaceholder,n.componentStyleUtils=e.componentStyleUtils,n.defaultMessages=e.defaultMessages,n.styleUtils=e.styleUtils,n.utils=e.utils},function(e){i.searchUtils=e.searchUtils}],execute:function(){e((()=>{var e={82606:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="#000" fill-rule="evenodd" d="M1.25 2.5h17.5v11.25H1.25zM0 2.5c0-.69.56-1.25 1.25-1.25h17.5c.69 0 1.25.56 1.25 1.25v11.25c0 .69-.56 1.25-1.25 1.25H1.25C.56 15 0 14.44 0 13.75zm3.75 16.25h2.5V17.5h-2.5zm7.5 0h-2.5V17.5h2.5zm2.5 0h2.5V17.5h-2.5z" clip-rule="evenodd"></path></svg>'},37568:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M11.347 2.146a.485.485 0 0 1 0 .708L5.76 8l5.587 5.146a.486.486 0 0 1 0 .708.54.54 0 0 1-.738 0l-5.956-5.5a.485.485 0 0 1 0-.708l5.956-5.5a.54.54 0 0 1 .738 0" clip-rule="evenodd"></path></svg>'},52943:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M4.653 13.854a.485.485 0 0 1 0-.708L10.24 8 4.653 2.854a.485.485 0 0 1 0-.708.54.54 0 0 1 .738 0l5.956 5.5a.485.485 0 0 1 0 .708l-5.956 5.5a.54.54 0 0 1-.738 0" clip-rule="evenodd"></path></svg>'},12907:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6"><circle cx="1104" cy="1049" r="3" fill="#000" fill-rule="nonzero" transform="translate(-1101 -1046)"></circle></svg>'},89768:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="nonzero" d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm0-1h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m6 12.9a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6M3.16 7l1.7 1.686a.474.474 0 0 1 0 .674.483.483 0 0 1-.68 0L2.14 7.337a.474.474 0 0 1 0-.674L4.18 4.64a.483.483 0 0 1 .68 0 .474.474 0 0 1 0 .674zm9.68 0-1.7-1.686a.474.474 0 0 1 0-.674.483.483 0 0 1 .68 0l2.04 2.023a.474.474 0 0 1 0 .674L11.82 9.36a.483.483 0 0 1-.68 0 .474.474 0 0 1 0-.674zM5.4 12.9a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6m5.2 0a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6"></path></svg>'},79244:e=>{"use strict";e.exports=o},41496:e=>{"use strict";e.exports=i},14321:e=>{"use strict";e.exports=n}},t={};function l(o){var n=t[o];if(void 0!==n)return n.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,l),i.exports}l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var o in t)l.o(t,o)&&!l.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="";var a={};return l.p=window.jimuConfig.baseUrl,(()=>{"use strict";l.r(a),l.d(a,{__set_webpack_public_path__:()=>q,default:()=>Q});var e,t=l(79244);!function(e){e.Auto="AUTO",e.Custom="CUSTOM"}(e||(e={}));var o=l(14321);const n={_widgetLabel:"Views Navigation",widgetPlaceholder:"Please add a Section to use this widget.",tabDefault:"Tab default",tabUnderline:"Tab underline",tabPills:"Tab pills",arrow1:"Arrow 1",arrow2:"Arrow 2",arrow3:"Arrow 3"},i=l(89768),s=e=>{const{widgetId:l,show:a}=e,s=t.hooks.useTranslation(n);return a?t.React.createElement(o.WidgetPlaceholder,{icon:i,widgetId:l,message:s("widgetPlaceholder")}):null};var r,d=l(41496),u=l(82606),v=l.n(u);!function(e){e[e.BringForward=0]="BringForward",e[e.SendBackward=1]="SendBackward",e[e.BringToFront=2]="BringToFront",e[e.SendToBack=3]="SendToBack"}(r||(r={}));var c,p;!function(e){e.Auto="auto",e[e.Normal=0]="Normal",e[e.BoundaryDropArea=10]="BoundaryDropArea",e[e.DragMoveTip=20]="DragMoveTip",e[e.HandlerTools=30]="HandlerTools",e[e.DraggingItem=40]="DraggingItem"}(c||(c={})),function(e){e.Auto="AUTO",e.Stretch="STRETCH",e.Custom="CUSTOM"}(p||(p={}));const g=e=>{var t,o;return"nav"===(null==e?void 0:e.type)&&!(null===(t=null==e?void 0:e.standard)||void 0===t?void 0:t.alternateIcon)&&!(null===(o=null==e?void 0:e.standard)||void 0===o?void 0:o.activedIcon)},h=e=>{var t,o;return!("nav"!==(null==e?void 0:e.type)||!(null===(t=null==e?void 0:e.standard)||void 0===t?void 0:t.alternateIcon)||!(null===(o=null==e?void 0:e.standard)||void 0===o?void 0:o.activedIcon))},{useEffect:m,useMemo:f,useCallback:w}=t.React,{useSelector:y,useDispatch:x}=t.ReactRedux,S=l(12907),b=l(37568),I=l(52943),T=(e,t)=>(100*e+100*t)/100,C=e=>{if(!(null==e?void 0:e.value))return"";const t=e.value.split(",");return(null==t?void 0:t.length)?t[1]:""},M=(e,o)=>{const n=(e=>{const o=t.ReactRedux.useSelector((e=>{var t;return null===(t=null==e?void 0:e.appConfig)||void 0===t?void 0:t.layouts})),n=t.ReactRedux.useSelector((e=>{var t;return null===(t=null==e?void 0:e.appConfig)||void 0===t?void 0:t.sections})),i=t.ReactRedux.useSelector((e=>null==e?void 0:e.browserSizeMode)),l=t.ReactRedux.useSelector((e=>null==e?void 0:e.appConfig.mainSizeMode));return t.React.useMemo((()=>{const o=(0,t.getAppStore)().getState().appConfig,n=d.searchUtils.getContentsInTheSameContainer(o,e,t.LayoutItemType.Widget,t.LayoutItemType.Section,i);return n&&n.length>0?n:d.searchUtils.getContentsInTheSameContainer(o,e,t.LayoutItemType.Widget,t.LayoutItemType.Section,l)||[]}),[e,i,n,o])})(e),i=t.hooks.useLatest(o),{current:l}=t.React.useRef((0,t.getAppStore)().getState().appContext.isInBuilder);m((()=>{var e;l&&(null===(e=i.current)||void 0===e||e.call(i,n))}),[n,l,i])},R=e=>{const o=x();return w(((n,i)=>{var l,a,s,r,d,u,v,c,p,g,h,m,f;const w=null===(l=(0,t.getAppStore)())||void 0===l?void 0:l.getState(),y=null===(s=null===(a=w.appConfig.sections)||void 0===a?void 0:a[e])||void 0===s?void 0:s.views,x=null===(d=null===(r=null==w?void 0:w.appRuntimeInfo)||void 0===r?void 0:r.sectionNavInfos)||void 0===d?void 0:d[e],S=(null==x?void 0:x.currentViewId)||y[0],b=(null==x?void 0:x.visibleViews)||y,I=null!==(u=null==x?void 0:x.progress)&&void 0!==u?u:0;let C=null;if((null===(p=null===(c=null===(v=w.appConfig)||void 0===v?void 0:v.sections)||void 0===c?void 0:c[e])||void 0===p?void 0:p.transition)&&"None"!==(null===(f=null===(m=null===(h=null===(g=w.appConfig)||void 0===g?void 0:g.sections)||void 0===h?void 0:h[e])||void 0===m?void 0:m.transition)||void 0===f?void 0:f.type)||(i=Math.ceil(i)),1===i)C=((e,o,n,i=(0,t.Immutable)([]))=>{let l=i.indexOf(o);l=-1===l?0:l;const a=i[e?Math.max(0,l-1):Math.min(i.length-1,l+1)];return(0,t.Immutable)({visibleViews:n}).set("previousViewId",o).set("currentViewId",a).set("useProgress",!1).set("progress",i.indexOf(a)/(i.length-1))})(n,S,y,b);else{const e=n?Math.max(T(I,-i/(y.length-1)),0):Math.min(T(I,i/(y.length-1)),1);C=A(e,y,b)}return o(t.appActions.sectionNavInfoChanged(e,C)),t.jimuHistory.changeViewBySectionNavInfo(e,C),C}),[o,e])},A=(e,o,n=(0,t.Immutable)([]))=>{const i=(0,t.getIndexFromProgress)(e,n.length);return(0,t.Immutable)({visibleViews:o}).set("previousViewId",n[i.previousIndex]).set("currentViewId",n[i.currentIndex]).set("useProgress",!0).set("progress",e)},P=e=>(0,t.Immutable)(e).merge({item:{hover:{fontWeight:"400"},active:{fontWeight:"400"},disabled:{fontWeight:"400"}}},{deep:!0}),B=(e,n,i,l)=>t.css`
    .jimu-nav{
      ${o.componentStyleUtils.nav.getRootStyles(null==n?void 0:n.root)};
      ${o.componentStyleUtils.nav.getVariantStyles(e,P(n),i,l)};
      ${o.styleUtils.getButtonStyleByState(null==n?void 0:n.item,!0)}
    }
`,k=e=>t.css`
    .nav-button-group {
      ${o.componentStyleUtils.navButtonGroup.getVariantStyles(P(e))};
      ${o.styleUtils.getButtonStyleByState(null==e?void 0:e.item,!1)}
    }
 `,j=(e,n,i)=>t.css`
   > .jimu-slider {
    ${o.componentStyleUtils.slider.getRootStyles(null==e?void 0:e.root)};
    ${o.componentStyleUtils.slider.getVariantStyles(e,n,i)};
   }
 `,V=(e,n)=>{const i=y((e=>e.appConfig.views)),l=y((e=>{const t=e.appConfig.pages,o=Object.keys(t).find((e=>{var o;return null===(o=null==t?void 0:t[e])||void 0===o?void 0:o.isDefault}));return e.appRuntimeInfo.currentPageId||o}));return t.React.useMemo((()=>{var a;return null!==(a=null==e?void 0:e.map((e=>{var a,s,r;const d=null===(a=null==i?void 0:i[e])||void 0===a?void 0:a.label,u=(null===(s=null==i?void 0:i[e])||void 0===s?void 0:s.icon)||o.utils.toIconResult(v(),"",16);return{name:d,linkType:t.LinkType.View,value:`${l},${e}`,icon:h(n)?void 0:u,navLinkAriaControls:`${null===(r=null==i?void 0:i[e])||void 0===r?void 0:r.parent}_${e}`}})))&&void 0!==a?a:(0,t.Immutable)([])}),[n,l,i,e])};var N=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(n=Object.getOwnPropertySymbols(e);i<n.length;i++)t.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(e,n[i])&&(o[n[i]]=e[n[i]])}return o};const L=t.css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`,O=e=>{const{data:n,progress:i=0,type:l,navStyle:a,vertical:s,advanced:r,variant:d,onChange:u,activeView:v,standard:c,paginationFontColor:p}=e,h=N(e,["data","progress","type","navStyle","vertical","advanced","variant","onChange","activeView","standard","paginationFontColor"]),{current:m,totalPage:w,showPageNumber:y,scrollable:x,disablePrevious:S,disableNext:b,previousText:I,previousIcon:T,nextText:M,nextIcon:R,showIcon:A,gap:P,alternateIcon:V,activedIcon:O,showText:U,showTitle:E,iconPosition:z,textAlign:D,hideThumb:W}=c||{},$=t.React.useRef((()=>0));t.React.useEffect((()=>($.current=t.lodash.throttle((e=>{let t=+e.target.value;t=Number((t/100).toFixed(2)),null==u||u("slider",t)}),100),()=>{$.current.cancel()})),[u]);const H=t.React.useCallback((e=>v===C(e)),[v]),_=((e,o,n,i,l,a)=>f((()=>{var s,r,d;if(!n||!i)return t.css``;const u=null===(d=null===(r=null===(s=(0,t.getAppStore)())||void 0===s?void 0:s.getState())||void 0===r?void 0:r.appContext)||void 0===d?void 0:d.isRTL;return"nav"===e?B(o,i,l,u):"navButtonGroup"===e?k(i):"slider"===e?j(i,a,u):t.css``}),[n,e,o,i,l,a]))(l,a,r,d,s,W),F=(e=>f((()=>t.css`
      ${"slider"===e&&t.css`padding: 0.625rem 0.25rem;`}
      .nav-button-group >.direction-button {
        &:focus,
        &:focus-visible {
          outline-offset: -2px;
        }
      }
    `),[e]))(l);return(0,t.jsx)("div",Object.assign({className:"navigation",css:[L,_,F]},h),"nav"===l&&(0,t.jsx)(o.Navigation,{keepPaddingWhenOnlyIcon:g(e),onLinkClick:e=>{const t=C(e);null==u||u("nav",t)},role:"tablist",vertical:s,isActive:H,scrollable:x,data:n,gap:P,type:a,showIcon:A,alternateIcon:V,activedIcon:O,showText:U,showTitle:E||U||g(e)&&!U&&A,isUseNativeTitle:!0,iconPosition:z,navLinkRole:"button",textAlign:D}),"slider"===l&&(0,t.jsx)(o.Slider,{className:"h-100",size:"sm",value:100*i,hideThumb:W,onChange:e=>{var t;null===(t=e.persist)||void 0===t||t.call(e),$.current(e)}}),"navButtonGroup"===l&&(0,t.jsx)(o.NavButtonGroup,{type:a,previousText:I,previousIcon:T,nextText:M,nextIcon:R,vertical:s,disablePrevious:S,disableNext:b,onChange:e=>{null==u||u("navButtonGroup",e)}},y&&(0,t.jsx)(o.PageNumber,{current:m,totalPage:w,css:p?t.css`color: ${p}`:t.css``})))},U={data:{type:"AUTO",section:"",views:[]},display:{advanced:!1,vertical:!1,navType:"default",alignment:"center",showText:!0,showIcon:!1,iconPosition:"start"}};class E extends t.BaseVersionManager{constructor(){super(...arguments),this.versions=[{version:"1.0.0",description:"Version manager for release 1.0.0",upgrader:e=>{var t;if(!e)return U;let o=e;return(null===(t=null==e?void 0:e.display)||void 0===t?void 0:t.variants)&&(o=o.setIn(["display","advanced"],!0)),o}},{version:"1.1.0",description:"Version manager for release 1.1.0",upgrader:e=>(e=>{const o=e;if(!e)return;const n=o.display;if(!n)return e;let i=(0,t.Immutable)({});const l=((e,t)=>{if(!e)return;const o=null==e?void 0:e[t];if(!o)return;let n=o;return o.bg&&(n=n.setIn(["root","bg"],o.bg),n=n.without("bg")),n})(n.variants,n.navType);return i=i.set("type","nav").set("vertical",n.vertical).set("advanced",n.advanced).set("navStyle",n.navType).set("standard",{scrollable:!0,textAlign:n.alignment,showText:n.showText,showIcon:n.showIcon,iconPosition:n.iconPosition}).set("variant",l),o.set("display",i)})(e||U)},{version:"1.13.0",description:"Change borderRadius from 50rem to 6.25rem in pills style",upgrader:e=>{var t,o,n,i;if("pills"!==(null===(t=null==e?void 0:e.display)||void 0===t?void 0:t.navStyle)||!(null===(o=null==e?void 0:e.display)||void 0===o?void 0:o.advanced))return e;let l=e;return Object.keys((null===(i=null===(n=null==l?void 0:l.display)||void 0===n?void 0:n.variant)||void 0===i?void 0:i.item)||{}).forEach((e=>{var t,o,n,i;"50rem"===(null===(i=null===(n=null===(o=null===(t=null==l?void 0:l.display)||void 0===t?void 0:t.variant)||void 0===o?void 0:o.item)||void 0===n?void 0:n[e])||void 0===i?void 0:i.borderRadius)&&(l=l.setIn(["display","variant","item",e,"borderRadius"],"6.25rem"))})),l}}]}}const z=new E,{useRef:D,useEffect:W,useState:$,useMemo:H}=t.React,{useSelector:_,useDispatch:F}=t.ReactRedux,G=i=>{var l,a,r,d,u;const{id:v,config:c,builderSupportModules:h,onInitDragHandler:T,onInitResizeHandler:C}=i,P=F(),B=null===(l=null==h?void 0:h.jimuForBuilderLib)||void 0===l?void 0:l.getAppConfigAction,k=D(null),{current:j}=D(null===(r=null===(a=(0,t.getAppStore)().getState())||void 0===a?void 0:a.appContext)||void 0===r?void 0:r.isInBuilder),N=_((e=>{var t,o;return null===(o=null===(t=null==e?void 0:e.widgetsState)||void 0===t?void 0:t[v])||void 0===o?void 0:o.showQuickStyle})),L=_((e=>{var t,o;return null===(o=null===(t=null==e?void 0:e.widgetsState)||void 0===t?void 0:t[v])||void 0===o?void 0:o.hasEverMount})),U=(e=>{const i=t.hooks.useTranslation(o.defaultMessages,n),l=o.utils.toIconResult(b,i("arrowLeft"),16);l.properties.originalName="outlined/directional/left.svg";const a=o.utils.toIconResult(I,i("arrowRight"),16);a.properties.originalName="outlined/directional/right.svg";const s=o.utils.toIconResult(S,i("drawToolDot"),8);return f((()=>{if(e)return[{label:i("tabDefault"),type:"nav",navStyle:"default",standard:{gap:"0px",scrollable:!0,showIcon:!1,showText:!0,iconPosition:"start",textAlign:o.TextAlignValue.CENTER}},{label:i("tabUnderline"),type:"nav",navStyle:"underline",standard:{gap:"0px",scrollable:!0,showIcon:!1,showText:!0,iconPosition:"start",textAlign:o.TextAlignValue.CENTER}},{label:i("tabPills"),type:"nav",navStyle:"pills",standard:{gap:"0px",scrollable:!0,showIcon:!1,showText:!0,iconPosition:"start",textAlign:o.TextAlignValue.CENTER}},{label:i("symbol"),type:"nav",navStyle:"default",standard:{scrollable:!1,gap:"10px",showIcon:!0,alternateIcon:s,activedIcon:s,showText:!1,iconPosition:"start",textAlign:o.TextAlignValue.CENTER}},{label:i("slider"),type:"slider",navStyle:"default"},{label:i("arrow1"),type:"navButtonGroup",navStyle:"default",standard:{showPageNumber:!0,previousText:"",previousIcon:l,nextText:"",nextIcon:a}},{label:i("arrow2"),type:"navButtonGroup",navStyle:"tertiary",standard:{previousText:i("prev"),previousIcon:l,nextText:i("next"),nextIcon:a}},{label:i("arrow3"),type:"navButtonGroup",navStyle:"tertiary",standard:{showPageNumber:!0,previousText:"",previousIcon:l,nextText:"",nextIcon:a}}]}),[e,i,s,l,a])})(j),E=null==c?void 0:c.display,z=null==c?void 0:c.data,G=null==E?void 0:E.standard,Q=null==z?void 0:z.type,q=null==z?void 0:z.section,J=null!==(d=null==G?void 0:G.step)&&void 0!==d?d:1,[K,X]=$(!1),Y=_((e=>{var t,o,n,i;return null===(i=null===(n=null===(o=null===(t=null==e?void 0:e.appConfig)||void 0===t?void 0:t.sections)||void 0===o?void 0:o[q])||void 0===n?void 0:n.views)||void 0===i?void 0:i[0]})),Z=_((e=>{var t,o;return null===(o=null===(t=null==e?void 0:e.appRuntimeInfo)||void 0===t?void 0:t.sectionNavInfos)||void 0===o?void 0:o[q]})),ee=((o,n,i)=>{const l=y((e=>{var t,n,i;return null===(i=null===(n=null===(t=null==e?void 0:e.appConfig)||void 0===t?void 0:t.sections)||void 0===n?void 0:n[o])||void 0===i?void 0:i.views}));return t.React.useMemo((()=>{const o=((i===e.Custom?n:l)||(0,t.Immutable)([])).asMutable();return o.sort(((e,t)=>(null==l?void 0:l.indexOf(e))-(null==l?void 0:l.indexOf(t)))),(0,t.Immutable)(o)}),[n,l,i])})(q,null==z?void 0:z.views,Q),te=V(ee,E),oe=null==Z?void 0:Z.progress,ne=null==Z?void 0:Z.useProgress,ie=null!==(u=null==Z?void 0:Z.currentViewId)&&void 0!==u?u:Y,le=(ae=null==E?void 0:E.vertical,f((()=>t.css`
      overflow: hidden;
      min-height: ${ae?t.polished.rem(16):"unset"};
      min-width: ${ae?"unset":t.polished.rem(16)};
      max-width: 100vw;
      max-height: 100vh;
    `),[ae]));var ae;const se=t.React.useMemo((()=>{const e=((e,t,o,n)=>{var i,l;let a,s;const r=null!==(i=null==n?void 0:n.length)&&void 0!==i?i:0;let d=(null==n?void 0:n.includes(e))?null==n?void 0:n.indexOf(e):0;if(d+=1,o){let e=0;const o=null!==(l=null==n?void 0:n.length)&&void 0!==l?l:0;if(o>1){e=t*(o-1);const n=e%1;e=Math.floor(e),a=0===e&&0===n,s=e===r-1&&0===n}}else a=d<=1,s=d===r;return{current:d,totalPage:r,disableNext:s,disablePrevious:a}})(ie,oe,ne,ee);return Object.assign(Object.assign({},G),e)}),[ie,oe,G,ne,ee]),re=t.React.useCallback((()=>{P(t.appActions.widgetStatePropChange(v,"showQuickStyle",!1))}),[P,v]),de=o=>{if(!B)return;const n=(0,t.Immutable)(o).set("vertical",!1).set("advanced",!1).set("variant",null);B().editWidgetProperty(v,"config",c.setIn(["data","type"],e.Auto).set("display",n)).exec(),((e,o)=>{var n,i;if(!o)return;let l;const a=(0,t.getAppStore)().getState();l=window.jimuConfig.isBuilder?null==a?void 0:a.appStateInBuilder:a;const s=null===(n=null==l?void 0:l.appRuntimeInfo)||void 0===n?void 0:n.selection,r=null===(i=l.appConfig.layouts)||void 0===i?void 0:i[null==s?void 0:s.layoutId];if(r&&(null==r?void 0:r.type)===t.LayoutType.FixedLayout){const t=g(e),n=null==e?void 0:e.vertical;o().editLayoutItemSize(s,n?60:380,n?380:60).exec(),o().editLayoutItemProperty(s,"setting.autoProps",{width:t||n?p.Auto:p.Custom,height:t||!n?p.Auto:p.Custom}).exec()}})(o,B)};(e=>{const o=x(),n=y((o=>t.utils.isWidgetSelected(e,o)?o.appRuntimeInfo.appMode:null));t.hooks.useUpdateEffect((()=>{o(t.appActions.widgetStatePropChange(e,"showQuickStyle",!1))}),[n,e])})(v),(e=>{const o=t.hooks.useWidgetSelected(e),n=x();t.hooks.useUpdateEffect((()=>{o||n(t.appActions.widgetStatePropChange(e,"showQuickStyle",!1))}),[o,e])})(v),((e,o)=>{const n=t.hooks.useWidgetSelected(e),i=x();m((()=>{n&&!o&&(i(t.appActions.widgetStatePropChange(e,"showQuickStyle",!0)),i(t.appActions.widgetStatePropChange(e,"hasEverMount",!0)))}),[])})(v,L);const ue=((e,o)=>w((n=>{var i;const l=(0,t.getAppStore)().getState().appConfig.widgets[e].config,a=null===(i=null==l?void 0:l.data)||void 0===i?void 0:i.section;if(!(null==n?void 0:n.includes(a))){if(!a&&!(null==n?void 0:n[0]))return;o().editWidgetProperty(e,"config",l.setIn(["data","section"],null==n?void 0:n[0])).exec(!1)}}),[o,e]))(v,B);M(v,ue);const ve=((o,n)=>w((i=>{var l,a,s,r,d,u;const v=(0,t.getAppStore)().getState().appConfig.widgets[o].config,c=(null===(l=null==v?void 0:v.data)||void 0===l?void 0:l.type)===e.Custom?null===(s=null===(a=null==v?void 0:v.data)||void 0===a?void 0:a.views)||void 0===s?void 0:s.filter((e=>null==i?void 0:i.includes(e))):i;((null==c?void 0:c.length)||(null===(d=null===(r=null==v?void 0:v.data)||void 0===r?void 0:r.views)||void 0===d?void 0:d.length))&&(t.lodash.isDeepEqual(c,null===(u=null==v?void 0:v.data)||void 0===u?void 0:u.views)||n().editWidgetProperty(o,"config",v.setIn(["data","views"],c)).exec(!1))}),[n,o]))(v,B);((e,o)=>{const n=y((t=>{var o,n,i;return null===(i=null===(n=null===(o=null==t?void 0:t.appConfig)||void 0===o?void 0:o.sections)||void 0===n?void 0:n[e])||void 0===i?void 0:i.views})),{current:i}=t.React.useRef((0,t.getAppStore)().getState().appContext.isInBuilder),l=t.hooks.useLatest(o);m((()=>{var e;i&&(null===(e=l.current)||void 0===e||e.call(l,n))}),[n,l,i])})(q,ve);const ce=R(q),pe=(e=>{const o=x();return w((n=>{var i,l,a,s,r,d;const u=null===(i=(0,t.getAppStore)())||void 0===i?void 0:i.getState(),v=null===(a=null===(l=u.appConfig.sections)||void 0===l?void 0:l[e])||void 0===a?void 0:a.views,c=null===(d=null===(r=null===(s=u.appRuntimeInfo)||void 0===s?void 0:s.sectionNavInfos)||void 0===r?void 0:r[e])||void 0===d?void 0:d.visibleViews,p=A(n,v,c);return o(t.appActions.sectionNavInfoChanged(e,p)),p}),[o,e])})(q),ge=t.hooks.useEventCallback(((e,o)=>{let n;"navButtonGroup"===e?n=ce(o,J):"slider"===e&&(n=pe(o));const i=ie,l=n?n.currentViewId:o;((e,o)=>{if(e===o)return;const n=new t.ViewChangeMessage(v,e,o);t.MessageManager.getInstance().publishMessage(n)})(l,i),"nav"===e&&((e,o)=>{if(e===o){const e=new t.ButtonClickMessage(v);t.MessageManager.getInstance().publishMessage(e)}})(l,i)}));W((()=>{K||X(!0)}),[]);const he=null==h?void 0:h.widgetModules.NavQuickStyle,me=_((e=>null==e?void 0:e.browserSizeMode)),fe=H((()=>me===t.BrowserSizeMode.Small),[me]),[we,ye]=$(!1),xe=_((e=>{var t,o,n;return null===(n=null===(o=null===(t=null==e?void 0:e.appConfig)||void 0===t?void 0:t.widgets)||void 0===o?void 0:o[v])||void 0===n?void 0:n.uri}));W((()=>{if(window.jimuConfig.isInBuilder){if(fe){t.moduleLoader.getModuleSync("jimu-for-builder").appBuilderSync.publishSidePanelToApp({type:"navigatorQuickStyle",widgetId:v,uri:xe,templates:U,display:null==c?void 0:c.display,onChange:de,active:N})}N?fe||ye(!0):we&&ye(!1)}}),[N]);const Se=t.ReactRedux.useSelector((e=>e.appRuntimeInfo.appMode));return W((()=>{Se!==t.AppMode.Design&&N&&(re(),we&&ye(!1))}),[Se]),(0,t.jsx)("div",{className:"widget-view-navigation jimu-widget",css:le,ref:k},(0,t.jsx)(s,{widgetId:v,show:!te.length}),(0,t.jsx)(O,Object.assign({data:te,activeView:ie,progress:oe,onChange:ge},E,{standard:se})),K&&he&&(0,t.jsx)(he,{widgetId:v,templates:U,display:null==c?void 0:c.display,onChange:de,onClose:re,open:we,reference:k.current,usePopper:!0,onInitDragHandler:T,onInitResizeHandler:C}))};G.versionManager=z;const Q=G;function q(e){l.p=e}})(),a})())}}}));