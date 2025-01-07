System.register(["jimu-core","jimu-ui","jimu-ui/advanced/setting-components","jimu-core/react","jimu-ui/basic/list-tree","jimu-arcgis"],(function(e,t){var a={},s={},i={},o={},n={},r={};return{setters:[function(e){a.React=e.React,a.classNames=e.classNames,a.css=e.css,a.defaultMessages=e.defaultMessages,a.getAppStore=e.getAppStore,a.hooks=e.hooks,a.jsx=e.jsx,a.loadArcGISJSAPIModule=e.loadArcGISJSAPIModule,a.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules},function(e){s.AdvancedSelect=e.AdvancedSelect,s.Button=e.Button,s.Card=e.Card,s.Icon=e.Icon,s.Label=e.Label,s.Loading=e.Loading,s.LoadingType=e.LoadingType,s.Radio=e.Radio,s.SVG=e.SVG,s.TextInput=e.TextInput,s.defaultMessages=e.defaultMessages},function(e){i.MapWidgetSelector=e.MapWidgetSelector,i.SettingRow=e.SettingRow,i.SettingSection=e.SettingSection,i.SidePopper=e.SidePopper},function(e){o.Fragment=e.Fragment},function(e){n.List=e.List,n.TreeItemActionType=e.TreeItemActionType},function(e){r.basemapUtils=e.basemapUtils}],execute:function(){e((()=>{var e={31027:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M12 6.5c0 .527-.074 1.036-.212 1.518l.912.438a6.5 6.5 0 1 0-6.586 4.533l-.077-1.008A5.5 5.5 0 1 1 12 6.5m-9 0a3.5 3.5 0 0 0 2.88 3.445L5.8 8.901a2.501 2.501 0 1 1 3.194-2.224l.949.456A3.5 3.5 0 1 0 3 6.5M15.5 11l-5 1-3 4-1-9.5zm-5.57.094-1.702 2.269-.542-5.152 4.76 2.38z" clip-rule="evenodd"></path></svg>'},39524:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M7.5 1.5a.5.5 0 0 1 1 0v2.8a.5.5 0 0 1-1 0zm6.028.874a.5.5 0 0 1 .062.705l-1.414 1.685a.5.5 0 1 1-.766-.643l1.414-1.685a.5.5 0 0 1 .704-.062m-10.352.062a.5.5 0 1 0-.766.643l1.414 1.685a.5.5 0 0 0 .766-.643zM6.244 10.6H5.43zM.961 9.8h4.88c.211 0 .359.19.359.4q0 .207.045.4a1.8 1.8 0 0 0 3.51 0h.814a2.6 2.6 0 0 1-5.139 0H.8v3.6h14.4v-3.6H9.755q.045-.194.045-.4c0-.21.148-.4.358-.4h4.881l-2.267-3.4H3.228zm11.81-4.2a.8.8 0 0 1 .666.356l2.429 3.642a.8.8 0 0 1 .134.444V14.2a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1-.8-.8v-4.158a.8.8 0 0 1 .134-.444l2.429-3.642a.8.8 0 0 1 .665-.356z" clip-rule="evenodd"></path></svg>'},62838:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="m8.745 8 6.1 6.1a.527.527 0 1 1-.745.746L8 8.746l-6.1 6.1a.527.527 0 1 1-.746-.746l6.1-6.1-6.1-6.1a.527.527 0 0 1 .746-.746l6.1 6.1 6.1-6.1a.527.527 0 0 1 .746.746z"></path></svg>'},50170:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0m-1.27 4.936a6.5 6.5 0 1 1 .707-.707l4.136 4.137a.5.5 0 1 1-.707.707z" clip-rule="evenodd"></path></svg>'},18044:e=>{e.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgMTIgOCIgZmlsbD0ibm9uZSI+DQo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAuNTAxNjQ4IDUuODc5NjNDMC44NTAwNjcgNi45NjE1NiAxLjc2Njk2IDcuNDEwODQgMi44NTgwNiA3LjQxMDg0QzMuOTU4MzMgNy40MTA4NCA1LjEyMjc5IDYuNzU5ODUgNS4xMjI3OSA1LjQxMjAxQzUuMTIyNzkgNC42MTQzMiA0LjU3MjY1IDQuMDA5MTcgMy43ODQxMiAzLjg1MzNWMy44MzQ5NkM0LjQ5MDEzIDMuNjYwNzUgNC45NDg1OCAzLjA2NDc3IDQuOTQ4NTggMi4zNjc5M0M0Ljk0ODU4IDEuMjAzNDggMy45OTUwMSAwLjU4OTE1OSAyLjg1ODA2IDAuNTg5MTU5QzEuODIxOTcgMC41ODkxNTkgMC45NjkyNjMgMS4yMDM0OCAwLjc0MDA0IDIuMDc0NTJMMS43NzYxMyAyLjM0MDQyQzEuOTA0NDkgMS44NDUzIDIuMjgwNDIgMS41MDYwNSAyLjgxMjIyIDEuNTA2MDVDMy4zNjIzNSAxLjUwNjA1IDMuODM5MTQgMS44NTQ0NyAzLjgzOTE0IDIuNDQxMjhDMy44MzkxNCAzLjIzODk4IDMuMTA1NjIgMy40MjIzNiAyLjQ1NDYzIDMuNDIyMzZIMi4xNjEyMlY0LjMwMjU3SDIuNDM2MjlDMy4xMjM5NiA0LjMwMjU3IDQuMDEzMzUgNC41NTkzIDQuMDEzMzUgNS40MDI4NEM0LjAxMzM1IDYuMTgyMiAzLjM4OTg2IDYuNDc1NjEgMi44MjEzOSA2LjQ3NTYxQzIuMTMzNzIgNi40NzU2MSAxLjY4NDQ0IDYuMDcyMTggMS41Mjg1NyA1LjU1ODcyTDAuNTAxNjQ4IDUuODc5NjNaTTUuNjExOTQgNy4yNDU4SDcuOTEzMzRDOS42MDk1OSA3LjI0NTggMTEuNDk4NCA2LjI3Mzg5IDExLjQ5ODQgNEMxMS40OTg0IDEuNTYxMDcgOS42MDk1OSAwLjc1NDIgNy45MTMzNCAwLjc1NDJINS42MTE5NFY3LjI0NThaTTYuNzY3MjIgNi4yMzcyMlYxLjc0NDQ0SDcuNzI5OTZDOC45MjE5MiAxLjc0NDQ0IDEwLjI2MDYgMi4xMzg3MSAxMC4yNjA2IDRDMTAuMjYwNiA1Ljc1MTI2IDguOTIxOTIgNi4yMzcyMiA3LjcyOTk2IDYuMjM3MjJINi43NjcyMloiIGZpbGw9IiNFM0UzRTMiLz4NCjwvc3ZnPg=="},62686:e=>{"use strict";e.exports=r},79244:e=>{"use strict";e.exports=a},68972:e=>{"use strict";e.exports=o},14321:e=>{"use strict";e.exports=s},79298:e=>{"use strict";e.exports=i},98640:e=>{"use strict";e.exports=n}},t={};function l(a){var s=t[a];if(void 0!==s)return s.exports;var i=t[a]={exports:{}};return e[a](i,i.exports,l),i.exports}l.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return l.d(t,{a:t}),t},l.d=(e,t)=>{for(var a in t)l.o(t,a)&&!l.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="";var c={};return l.p=window.jimuConfig.baseUrl,(()=>{"use strict";l.r(c),l.d(c,{__set_webpack_public_path__:()=>G,default:()=>Q});var e,t=l(79244),a=l(14321),s=l(79298);!function(e){e.Organization="ORGANIZATION",e.Custom="CUSTOM"}(e||(e={}));const i={baseMapSettings:"Basemap settings",groupBasemaps:"Synchronize with the basemap gallery settings of your organization",customBasemaps:"Configure custom basemaps",importBasemaps:"Import",importTips:'Click the "Import" button to add basemaps for the Map widget.',sideTitle:"Import basemaps",chooseWebmaps:"Select a group where web maps can be used as basemaps."};var o=l(68972),n=l(31027),r=l.n(n),m=function(e,t){var a={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(s=Object.getOwnPropertySymbols(e);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(a[s[i]]=e[s[i]])}return a};const u=e=>{const a=window.SVG,{className:s}=e,i=m(e,["className"]),o=(0,t.classNames)("jimu-icon jimu-icon-component",s);return a?t.React.createElement(a,Object.assign({className:o,src:r()},i)):t.React.createElement("svg",Object.assign({className:o},i))},p=t.css`
  flex-direction: column;
  font-size: 0.875rem;
  text-align: center;
  color: var(--ref-palette-neutral-1000);
  span {
    padding: 0 1rem;
  }
`,d=e=>{const{text:a,icon:s,style:i}=e;return(0,t.jsx)("div",{css:p,style:i,className:"d-flex align-items-center justify-content-center"},s||(0,t.jsx)(u,{size:48,color:"var(--dark-200)"}),(0,t.jsx)("span",{className:"mt-4"},a))};var g=l(62838),j=l.n(g),M=function(e,t){var a={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(s=Object.getOwnPropertySymbols(e);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(a[s[i]]=e[s[i]])}return a};const y=e=>{const a=window.SVG,{className:s}=e,i=M(e,["className"]),o=(0,t.classNames)("jimu-icon jimu-icon-component",s);return a?t.React.createElement(a,Object.assign({className:o,src:j()},i)):t.React.createElement("svg",Object.assign({className:o},i))};var x=l(98640),b=l(18044),N=l.n(b),v=l(62686);const f=t.css`
  position: absolute;
  width: 14px;
  height: 10px;
  padding: 1px;
  border-radius: 2px;
  font-size: 0;
  background: rgba(0, 0, 0, 0.7)
`,I=e=>{const{style:s,basemapItem:i}=e,o=t.React.useRef(),[n,r]=t.React.useState(!1);return t.React.useEffect((()=>{o.current||(0,t.loadArcGISJSAPIModule)("esri/Basemap").then((e=>{o.current=e,v.basemapUtils.getLoadedBasemapList(o.current,[i]).then((([e])=>{r(v.basemapUtils.isBasemap3D(e))}))}))}),[i]),n?(0,t.jsx)("div",{css:f,style:s},(0,t.jsx)(a.SVG,{className:"w-100 h-100",src:N()})):null},h=t.css`
  .jimu-tree-item__body {
    padding: 0.5rem 0.5rem 0.5rem 0;
    cursor: move;
    .jimu-tree-item__icon {
      position: relative;
      padding: 0 !important;
      img {
        width: 5rem;
        height: 3.75rem;
      }
    }
    .jimu-tree-item__title {
      margin: 0 0.5rem 0 0.25rem;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 0.8125rem;
      line-height: 1.0625rem;
      font-weight: 400;
    }
    .del-btn {
      opacity: 0;
      &:focus, &:active {
        opacity: 1;
      }
    }
    &:hover, &:focus, &:active {
      .del-btn {
        opacity: 1;
      }
    }
  }
`,S=e=>{const{customBasemaps:s,token:i,onChange:o}=e,n=t.hooks.useTranslation(t.defaultMessages),r=e=>{o(s.asMutable().filter((t=>t.id!==e)))};return(0,t.jsx)(x.List,{size:"default",className:"px-4",css:h,itemsJson:s.asMutable().map(((e,t)=>({itemStateDetailContent:e,itemKey:e.id,itemStateIcon:{icon:`${e.thumbnailUrl}?token=${i}`},itemStateTitle:e.title}))),dndEnabled:!0,onDidDrop:(e,t)=>{const{itemJsons:a}=t.props,[,i]=a,n=i.map((e=>e.itemStateDetailContent));n.map((e=>e.id)).join(",")!==s.map((e=>e.id)).join(",")&&o(n)},overrideItemBlockInfo:({itemBlockInfo:e})=>({name:x.TreeItemActionType.RenderOverrideItem,children:[{name:x.TreeItemActionType.RenderOverrideItemDroppableContainer,children:[{name:x.TreeItemActionType.RenderOverrideItemDraggableContainer,children:[{name:x.TreeItemActionType.RenderOverrideItemBody,children:[{name:x.TreeItemActionType.RenderOverrideItemDragHandle},{name:x.TreeItemActionType.RenderOverrideItemIcon},{name:x.TreeItemActionType.RenderOverrideItemTitle},{name:x.TreeItemActionType.RenderOverrideItemCommands}]}]}]}]}),renderOverrideItemCommands:(e,s)=>{const{itemJsons:i}=s.props,o=i[0].itemKey;return(0,t.jsx)(a.Button,{size:"sm",type:"tertiary",icon:!0,className:"del-btn p-0 border-0",title:n("delete"),"aria-label":n("delete"),onClick:e=>{e.stopPropagation(),r(o)},onKeyDown:e=>{"Enter"!==e.key&&" "!==e.key||(e.stopPropagation(),r(o))}},(0,t.jsx)(y,null))},renderOverrideItemIcon:(e,s)=>{const{itemJsons:i}=s.props,o=i[0],n=o.itemStateIcon,r=o.itemStateDetailContent;return(0,t.jsx)("div",{className:"jimu-tree-item__icon"},(0,t.jsx)(a.Icon,Object.assign({},n)),(0,t.jsx)(I,{basemapItem:r,style:{right:"1px",bottom:"1px"}}))}})};var O=l(50170),w=l.n(O),D=function(e,t){var a={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(s=Object.getOwnPropertySymbols(e);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(a[s[i]]=e[s[i]])}return a};const T=e=>{const a=window.SVG,{className:s}=e,i=D(e,["className"]),o=(0,t.classNames)("jimu-icon jimu-icon-component",s);return a?t.React.createElement(a,Object.assign({className:o,src:w()},i)):t.React.createElement("svg",Object.assign({className:o},i))};var A=l(39524),z=l.n(A),L=function(e,t){var a={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&t.indexOf(s)<0&&(a[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(s=Object.getOwnPropertySymbols(e);i<s.length;i++)t.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(e,s[i])&&(a[s[i]]=e[s[i]])}return a};const R=e=>{const a=window.SVG,{className:s}=e,i=L(e,["className"]),o=(0,t.classNames)("jimu-icon jimu-icon-component",s);return a?t.React.createElement(a,Object.assign({className:o,src:z()},i)):t.React.createElement("svg",Object.assign({className:o},i))};var k=function(e,t,a,s){return new(a||(a=Promise))((function(i,o){function n(e){try{l(s.next(e))}catch(e){o(e)}}function r(e){try{l(s.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(n,r)}l((s=s.apply(e,t||[])).next())}))};const C=t.css`
  display: flex;
  flex-direction: column;
  .search-row {
    margin-top: 0.75rem !important;
  }
  .card-list-container {
    display: flex;
    flex-wrap: wrap;
    margin: 0 0.625rem;
    padding: 0 0 1rem;
    li {
      width: calc(50% - 0.75rem);
      margin: 0 0.375rem 0.625rem 0.375rem;
      list-style: none;
    }
    .card {
      border: 0;
      background-color: var(--ref-palette-neutral-500);
      &.card-active, &:hover {
        box-shadow: none;
        border: 0;
        outline: 0.125rem solid var(--sys-color-primary-light);
      }
      .card-checkmark {
        line-height: 0;
        background-color: var(--sys-color-primary-light);
        border-radius: 0 0 0 0.125rem;
      }
      img {
        width:100%;
        height: 5.0625rem;
        background-color: var(--ref-palette-neutral-600);
      }
      .content {
        box-sizing: content-box;
        height: 2.0625rem;
        margin: 0.25rem 0.25rem 0.5rem;
        overflow: hidden;
        font-size: 0.75rem;
        line-height: 1rem;
        font-weight: 400;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: var(--ref-palette-neutral-1100);
      }
    }
  }
`,E=e=>{var o;const{portalUrl:n,portalSelf:r,token:l,config:c,onCustomBasemapsChange:m}=e,{customBasemaps:u}=c,p=t.hooks.useTranslation(i,t.defaultMessages,a.defaultMessages),g=t.React.useRef(),[j,M]=t.React.useState();t.React.useEffect((()=>{(0,t.loadArcGISJSAPIModules)(["esri/portal/Portal","esri/request"]).then((e=>{const[t,a]=e;g.current=a;const s=new t({url:n,sourceJSON:r});s.load().then((()=>{M(s),D(s)}))}))}),[]);const[y,x]=t.React.useState([]),b=t.React.useMemo((()=>y.length?y:[{id:"",title:p("esriDefault")}]),[y,p]),[N,f]=t.React.useState(""),[h,S]=t.React.useState(!0),[O,w]=t.React.useState(""),D=e=>k(void 0,void 0,void 0,(function*(){var a,s,i;const o=yield v.basemapUtils.getBasemapGroup(e,r,v.basemapUtils.BasemapGroupType.EsriDefault),n=yield v.basemapUtils.getBasemapGroup(e,r,v.basemapUtils.BasemapGroupType.EsriDefault3d),l=yield v.basemapUtils.getBasemapGroup(e,r),c={id:null==o?void 0:o.id,title:p("esriDefault")},m={id:null==n?void 0:n.id,title:p("esriDefault3d")};w(null==n?void 0:n.id);const u={id:null==l?void 0:l.id,title:p("organizationDefault")},d=null===(s=null===(a=(0,t.getAppStore)())||void 0===a?void 0:a.getState())||void 0===s?void 0:s.user,g=(null===(i=null==d?void 0:d.groups)||void 0===i?void 0:i.asMutable().map((e=>({id:e.id,title:e.title}))))||[];x([c,m,u,...g]),f((null==o?void 0:o.id)||"")})),[A,z]=t.React.useState([]),[L,E]=t.React.useState(""),U=t.React.useMemo((()=>L?A.filter((e=>e.title.toUpperCase().includes(L.toUpperCase()))):A),[A,L]);t.React.useEffect((()=>{var e;N&&(E(""),S(!0),z([]),(e=N,k(void 0,void 0,void 0,(function*(){const t=yield v.basemapUtils.getBasemapItemsByGroupId(j,n,e,e===O);z(t)}))).then((()=>{S(!1)})))}),[N]);const B=(e,t)=>{const a=u.asMutable({deep:!0})||[];m(t?[...a,e]:a.filter((t=>t.id!==e.id)))};return(0,t.jsx)("div",{className:"h-100",css:C},(0,t.jsx)(s.SettingSection,{className:"pt-0 border-0",title:p("chooseWebmaps")},(0,t.jsx)(s.SettingRow,null,(0,t.jsx)(a.AdvancedSelect,{size:"sm","aria-label":p("chooseWebmaps"),buttonProps:{disabled:!y.length},isMultiple:!1,isEmptyOptionHidden:!0,selectedValues:[{label:null===(o=b.find((e=>e.id===N)))||void 0===o?void 0:o.title,value:N}],staticValues:b.map((e=>({label:e.title,value:e.id}))),sortValuesByLabel:!1,onChange:e=>{var t;f((null===(t=null==e?void 0:e[0])||void 0===t?void 0:t.value)||"")}})),(0,t.jsx)(s.SettingRow,{className:"search-row"},(0,t.jsx)(a.TextInput,{size:"sm",className:"py-0 w-100",prefix:(0,t.jsx)(T,{size:"m",color:"var(--dark)"}),placeholder:p("search"),"aria-label":p("search"),value:L,disabled:h,allowClear:!!L,onChange:e=>{E(e.target.value)}}))),h?(0,t.jsx)(a.Loading,{type:a.LoadingType.Secondary}):U.length?(0,t.jsx)("ul",{className:"card-list-container",role:"listbox"},U.map((e=>{const s=!!u.find((t=>t.id===e.id));return(0,t.jsx)("li",{key:e.id},(0,t.jsx)(a.Card,{button:!0,active:s,role:"option","aria-selected":s,tabIndex:0,onClick:()=>{B(e,!s)},onKeyDown:t=>{"Enter"!==t.key&&" "!==t.key||(t.stopPropagation(),B(e,!s))}},(0,t.jsx)("img",{src:`${e.thumbnailUrl}?token=${l}`}),(0,t.jsx)("div",{className:"content",title:e.title},e.title),(0,t.jsx)(I,{basemapItem:e,style:{top:"70px",right:"1px"}})))}))):(0,t.jsx)(d,{text:p("noItemFoundWarning"),icon:(0,t.jsx)(R,{size:48,color:"var(--dark-200)"}),style:{flex:1}}))},U=e=>{const o=t.hooks.useTranslation(i,t.defaultMessages,a.defaultMessages),n=t.React.useRef(),[r,l]=t.React.useState(!1);return(0,t.jsx)(t.React.Fragment,null,(0,t.jsx)(a.Button,{className:"w-100",type:"primary","aria-description":o("importTips"),ref:n,onClick:()=>{r||l(!0)}},o("importBasemaps")),(0,t.jsx)(s.SidePopper,{position:"right",title:o("sideTitle"),"aria-label":o("sideTitle"),isOpen:r,toggle:()=>{r&&l(!1)},trigger:n.current},(0,t.jsx)(E,Object.assign({},e))))},B=Object.assign({},i,t.defaultMessages,a.defaultMessages),P=t.css`
  display: flex;
  flex-flow: column;
  overflow-y: hidden;
  .custom-list-container {
    position: relative;
    flex: 1;
    overflow: auto;
  }
`,Q=i=>{const{id:n,token:r,onSettingChange:l,config:c,useMapWidgetIds:m}=i,{basemapsType:u,customBasemaps:p}=c,g=t.hooks.useTranslation(B),j=(e,t)=>{t!==c[e]&&l({id:n,config:c.set(e,t)})},M=t.React.useMemo((()=>!(null==m?void 0:m.length)),[m]),y=t.React.useMemo((()=>u===e.Custom),[u]);return(0,t.jsx)("div",{className:"jimu-widget-setting jimu-widget-basemap-setting h-100",css:P},(0,t.jsx)(s.SettingSection,{className:(0,t.classNames)({"border-bottom-0":M}),title:g("selectMapWidget")},(0,t.jsx)(s.SettingRow,null,(0,t.jsx)(s.MapWidgetSelector,{onSelect:e=>{l({id:n,useMapWidgetIds:e})},useMapWidgetIds:m}))),M?(0,t.jsx)(d,{text:g("selectMapHint"),style:{height:"calc(100% - 6rem)"}}):(0,t.jsx)(o.Fragment,null,(0,t.jsx)(s.SettingSection,{className:(0,t.classNames)({"border-0":!y||!p.length}),title:g("baseMapSettings"),role:"group","aria-label":g("baseMapSettings")},(0,t.jsx)(s.SettingRow,{flow:"wrap",role:"radiogroup",className:"mb-4"},(0,t.jsx)(a.Label,{className:"d-flex align-items-center"},(0,t.jsx)(a.Radio,{className:"mr-2",name:"basemapsType",checked:u===e.Organization,onChange:()=>{j("basemapsType",e.Organization)}}),g("groupBasemaps")),(0,t.jsx)(a.Label,{className:"d-flex align-items-center"},(0,t.jsx)(a.Radio,{className:"mr-2",name:"basemapsType",checked:u===e.Custom,onChange:()=>{j("basemapsType",e.Custom)}}),g("customBasemaps"))),y&&(0,t.jsx)(U,Object.assign({},i,{onCustomBasemapsChange:e=>{j("customBasemaps",e)}}))),y&&(0,t.jsx)("div",{className:"custom-list-container"},(0,t.jsx)("div",{className:"h-100 py-4"},p.length?(0,t.jsx)(S,{customBasemaps:p,token:r,onChange:e=>{j("customBasemaps",e)}}):(0,t.jsx)(d,{text:g("importTips"),style:{height:"100% "}})))))};function G(e){l.p=e}})(),c})())}}}));