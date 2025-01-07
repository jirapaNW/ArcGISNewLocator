System.register(["jimu-core","jimu-core/react","jimu-for-builder","jimu-for-builder/service","jimu-theme","jimu-ui","jimu-ui/advanced/data-source-selector","jimu-ui/advanced/setting-components"],(function(e,t){var s={},i={},o={},a={},n={},l={},r={},p={};return{setters:[function(e){s.APP_FRAME_NAME_IN_BUILDER=e.APP_FRAME_NAME_IN_BUILDER,s.AppMode=e.AppMode,s.BrowserSizeMode=e.BrowserSizeMode,s.CONSTANTS=e.CONSTANTS,s.Immutable=e.Immutable,s.Keyboard=e.Keyboard,s.LoadingType=e.LoadingType,s.PageMode=e.PageMode,s.React=e.React,s.ReactRedux=e.ReactRedux,s.ReactResizeDetector=e.ReactResizeDetector,s.SessionManager=e.SessionManager,s.appActions=e.appActions,s.classNames=e.classNames,s.css=e.css,s.defaultMessages=e.defaultMessages,s.getAppStore=e.getAppStore,s.hooks=e.hooks,s.jimuHistory=e.jimuHistory,s.jsx=e.jsx,s.lodash=e.lodash,s.polished=e.polished,s.portalUrlUtils=e.portalUrlUtils,s.portalUtils=e.portalUtils,s.queryString=e.queryString,s.semver=e.semver,s.urlUtils=e.urlUtils,s.utils=e.utils,s.version=e.version},function(e){i.Fragment=e.Fragment,i.useEffect=e.useEffect,i.useRef=e.useRef,i.useState=e.useState},function(e){o.DownloadAppModal=e.DownloadAppModal,o.appStateHistoryActions=e.appStateHistoryActions,o.builderActions=e.builderActions,o.builderAppSync=e.builderAppSync,o.getAppConfigAction=e.getAppConfigAction,o.helpUtils=e.helpUtils,o.utils=e.utils},function(e){a.AppType=e.AppType,a.appServices=e.appServices},function(e){n.useTheme=e.useTheme,n.withTheme=e.withTheme},function(e){l.AdvancedButtonGroup=e.AdvancedButtonGroup,l.AlertPopup=e.AlertPopup,l.Button=e.Button,l.Dropdown=e.Dropdown,l.DropdownButton=e.DropdownButton,l.DropdownItem=e.DropdownItem,l.DropdownMenu=e.DropdownMenu,l.Modal=e.Modal,l.ModalBody=e.ModalBody,l.ModalFooter=e.ModalFooter,l.ModalHeader=e.ModalHeader,l.Option=e.Option,l.Popper=e.Popper,l.Select=e.Select,l.Switch=e.Switch,l.TagInput=e.TagInput,l.TextArea=e.TextArea,l.TextInput=e.TextInput,l.Toast=e.Toast,l.ToastType=e.ToastType,l.Tooltip=e.Tooltip,l.UserProfile=e.UserProfile,l.defaultMessages=e.defaultMessages},function(e){r.dataComponentsUtils=e.dataComponentsUtils},function(e){p.ProxySettingPopup=e.ProxySettingPopup,p.proxySettingUtils=e.proxySettingUtils}],execute:function(){e((()=>{var e={505:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M2 4h12v7H2zM0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4 10a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z" clip-rule="evenodd"></path></svg>'},5664:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><g fill-rule="evenodd" clip-path="url(#a)" clip-rule="evenodd"><path fill="#00C9DD" d="m0 9 4 2v5l-4-2zm4-7 4 2v5L4 7zm4 7 4 2v5l-4-2z"></path><path fill="#70F2FF" d="m0 9 4-2 4 2-4 2zm4-7 4-2 4 2-4 2zm4 7 4-2 4 2-4 2z"></path><path fill="#008197" d="m4 11 4-2v5l-4 2zm4-7 4-2v5L8 9zm4 7 4-2v4.667L12 16z"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"></path></clipPath></defs></svg>'},9165:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M10 5H6v9h4zM6 3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z" clip-rule="evenodd"></path></svg>'},4939:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4M6 8a2 2 0 1 1 4 0 2 2 0 0 1-4 0m0 6a2 2 0 1 1 4 0 2 2 0 0 1-4 0" clip-rule="evenodd"></path></svg>'},8243:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M12 3H4v11h8zM4 1a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z" clip-rule="evenodd"></path></svg>'},3317:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M9.329 1a.875.875 0 0 0-.87.773l-.005.102v1.78q-7.317.616-7.432 8.277L1 12.374v.64l.006.35q.006.186.016.396l.034.503c.089.525.433.757.82.736.305-.018.532-.302.607-.6l.103-.398.109-.388q.183-.63.324-.901c1.298-2.504 3.343-3.685 5.435-3.824v1.38a.875.875 0 0 0 1.364.725l.087-.067 4.796-4.196a.875.875 0 0 0 .078-1.24l-.078-.077-4.796-4.197A.88.88 0 0 0 9.33 1" clip-rule="evenodd"></path></svg>'},2199:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M6.671 1c.449 0 .819.338.87.773l.005.102v1.78q7.317.616 7.432 8.277l.022.442v.64q-.002.326-.022.746l-.034.503c-.089.525-.433.757-.82.736-.305-.018-.532-.302-.607-.6l-.103-.398-.108-.388q-.184-.63-.325-.901c-1.298-2.504-3.343-3.685-5.435-3.824v1.38a.875.875 0 0 1-1.364.725l-.087-.067L1.299 6.73a.875.875 0 0 1-.078-1.24l.078-.077 4.796-4.197A.88.88 0 0 1 6.67 1" clip-rule="evenodd"></path></svg>'},5737:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="m14 4-6 8-6-8z"></path></svg>'},9703:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0M6.25 5.621a.6.6 0 0 1 .933-.5l3.568 2.38a.6.6 0 0 1 0 .998l-3.568 2.38a.6.6 0 0 1-.933-.5z" clip-rule="evenodd"></path></svg>'},1972:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M1 3a2 2 0 0 1 2-2h8.086a1 1 0 0 1 .707.293l2.914 2.914a1 1 0 0 1 .293.707v1.982l-.612-.613c-.367-.366-.95-.379-1.302-.027L10.18 9.162a2.625 2.625 0 1 0-3.643 3.643l-.092.092L6.067 15H3a2 2 0 0 1-2-2zm1.75.75a1 1 0 0 1 1-1h5.875a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1H3.75a1 1 0 0 1-1-1zm10.92 4.455c.28-.282.747-.272 1.04.022l1.063 1.063c.294.293.304.76.022 1.04l-5.313 5.314-1.944.35a.463.463 0 0 1-.531-.532l.35-1.944z" clip-rule="evenodd"></path></svg>'},2075:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M1 3a2 2 0 0 1 2-2h8.086a1 1 0 0 1 .707.293l2.914 2.914a1 1 0 0 1 .293.707V13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2zm1.75.75a1 1 0 0 1 1-1h5.875a1 1 0 0 1 1 1v1.5a1 1 0 0 1-1 1H3.75a1 1 0 0 1-1-1zm7.875 6.875a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0" clip-rule="evenodd"></path></svg>'},63:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M14 2H2v2h12zM2 1H1v4h14V1H2m2 7H2v6h2zM2 7H1v8h4V7H2m6 1h6v6H8zM7 7h8v8H7V7" clip-rule="evenodd"></path></svg>'},9044:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M6 6.5a.5.5 0 0 1 1 0v6a.5.5 0 0 1-1 0zM9.5 6a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 1 0v-6a.5.5 0 0 0-.5-.5"></path><path fill="#000" fill-rule="evenodd" d="M11 0H5a1 1 0 0 0-1 1v2H.5a.5.5 0 0 0 0 1h1.6l.81 11.1a1 1 0 0 0 .995.9h8.19a1 1 0 0 0 .995-.9L13.9 4h1.6a.5.5 0 0 0 0-1H12V1a1 1 0 0 0-1-1m0 3V1H5v2zm1.895 1h-9.79l.8 11h8.19z" clip-rule="evenodd"></path></svg>'},8996:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M8 2.125 14.334 14H1.667zm-.882-.47a1 1 0 0 1 1.765 0l6.333 11.874A1 1 0 0 1 14.334 15H1.667a1 1 0 0 1-.882-1.47zM8 4.874a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0L8.9 5.87a.905.905 0 0 0-.9-.995m1 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0" clip-rule="evenodd"></path></svg>'},1546:e=>{e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARYSURBVHgB7ZvLahNRGMf/J6mirWJcKFhQp4IKLdiK6KaCEURQF1bwumr6BK1P0OkTmDxB01XxAsaNghU7BV2ICHVRF4oaFRUMaERbxaY5nm9iFk3SJOcyl9T+YLqYziSc//muJ+cwBMHktIVIIYEIGwZHXtxxsBQdw5XjWfgMg5/cnIqLv6Ni0PHaD7A02OIELpxy4BPeCzA+HcPmpUFwPrDywKuYFdaRxPkTE/AY7wSggbcXRkpmzmNQgmVR5CnwtoxX7mFeADJzzofFRw/AKMI9PIgT5gS49WDAHXjzZq4GEwGTCTEMuYeeAEbMXBXhHhHYWIzO6FiFmgBk5kWcFQNP+D/wChjLC6vLqLqHnAAN01jQ8AzYUkomjTYWoGzmjA2KL7DQEvxzjybiRH0Brk/Zwfi3KYQQDarM2gLQrG8q3A6vqatQu8qM1Hy2Y8leXYMnuAjY0fHKu9UCuIGOChmz9MU2Y3B3J8JGtQCcgp15SID0kW68PX0UZzu3IyxUC8B4HzzE6tiATP8BjB/ugdW+EUFTwwLgqQBlEtYOvD3Tj2t9+wMVog2ajOzbhdHuPYita0N2/he67j6We3/vTveSJTv/G/bca0y8+wwdItAgvm0rrvXucwfvN+RK6SM92t+tJYDVEbwP94rgqoOWAKsB32zXyX1F3HkGHQ7GNrlB0yS+CUBBiy4dZnLfjAvw37vAmgBocQJNg2Eg09+rVU2uChegSnI6fkip2/QtCySsTtEAdTf1LKVLivgylCrDblEaf5J6T8sCtgRQAtcjnZUbPKElADVCYSG/WMDY3BvIoiwAmbTVvgFhIfnyPbIL8oWWkgDUBI327EFYoDZ87IX87BNKAlD/H6bZt+fUBk9IC0CzT6s5YSHzMae1KCItQLOpzC+Sr95DB6k8RrNPq0AqyLTDz/M/4BdSAlCwIX+zFQKgiXbYC6RdgKJt191HSkVHGFHKAjSTQ09f4OrsS7Q6WpUgVV+tztqCCAwSW78uFD93yWC0naPVGfq5S5eDU08w61MqDKUL+Nlmr8UAaPDtzyJaHS0B7nzKuVdQ0BqA7NJZJdrONvD4OY4p9AddYg2P1hRks0a5n/guahD5QOnuGluGkWijMgszOVrD++yu6A6LpbVmhdCacY7ZyluBB8Hkqw84LmbVl96iWEhV3gpFFij3FtRkOV/0fHpFOGxcOZWtvF29UfLGw2NAYcT8fv8AKbI0Lp8YqvWvlbfKTt6zEI2WNkYzZqE1yaPIbVw+mVrpgcabpUkIROPCWUZbSAhHDC2D+R8TGDqXr/eg3Hb5yfsJRN2NlHGEE0c4u42LJ2eafUHtwETZPcASCJ48eDGNYjFVK8g1Qu/ITLDuQSdFklj4mWpk5vUwd2jKP/dwZM28HuaPzZXSaMKwe5TMnInAZmjgZbw7OGkmjRox83r4c3aY3EMuTjjgoni51MpHZ2vR2D0ck/7dDP4KUGa5e8S8NvN6/AXWppIKbqQ9gQAAAABJRU5ErkJggg=="},9244:e=>{"use strict";e.exports=s},8972:e=>{"use strict";e.exports=i},4108:e=>{"use strict";e.exports=o},9860:e=>{"use strict";e.exports=a},1888:e=>{"use strict";e.exports=n},4321:e=>{"use strict";e.exports=l},3089:e=>{"use strict";e.exports=r},9298:e=>{"use strict";e.exports=p}},t={};function d(s){var i=t[s];if(void 0!==i)return i.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,d),o.exports}d.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return d.d(t,{a:t}),t},d.d=(e,t)=>{for(var s in t)d.o(t,s)&&!d.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},d.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),d.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.p="";var c={};return d.p=window.jimuConfig.baseUrl,(()=>{"use strict";d.r(c),d.d(c,{__set_webpack_public_path__:()=>Xe,default:()=>Qe});var e=d(9244),t=d(4321),s=d(4108),i=d(9860);var o,a,n,l;!function(e){e.Experience="Web Experience",e.Template="Web Experience Template"}(o||(o={})),function(e){e.Published="Published",e.Draft="Draft",e.Changed="Changed",e.Publishing="Publishing"}(a||(a={})),function(e){e.Save="Save",e.Saved="Saved",e.Saving="Saving",e.SaveError="Save Error",e.SaveSuccess="Save Success"}(n||(n={})),function(e){e.SaveAs="Save_As",e.Save="Save",e.SaveInDropdown="Save_In_Dropdown"}(l||(l={}));const r={createNew:"Create new",newExperience:"New experience",undo:"Undo",redo:"Redo",save:"Save",saving:"Saving",saved:"Saved",saveError:"Saving error",saveSuccess:"Saved successfully!",publishing:"Publishing",published:"Published",publishError:"Publishing error",publishSuccess:"Published successfully!",publishTo:"Publish to",publishOptions:"Publish options",copySuccess:"Copied successfully!",changeShareSettings:"Change share settings",viewPublishedItem:"View published item",copyPublishedItemLink:"Copy published item link",headerLeave:"Leave",headerLeaveSite:"Leave site?",headerLeaveDescription:"Changes you made may not be saved.",editPageForLargeScreen:"Edit your page for large screen devices",editPageForMediumScreen:"Edit your page for medium screen devices",editPageForSmallScreen:"Edit your page for small screen devices",appMode:"Live view",generateTemplate:"Generate template",moreOptionsForTool:"More",moreTools:"More tools",access:"Access",generateTemplateSuccess:"Generated template successfully!",generateTemplateError:"Generating error",headerLockLayout:"Lock layout",enableLayoutEditing:"Turn on layout lock to disable layout editing",disableLayoutEditing:"Turn off layout lock to enable layout editing",layoutIsEnabled:"Layout editing is enabled.",layoutIsDisabled:"Layout editing is disabled.",appTypeTemplate:"Experience Template",appTypeExperience:"Experience",publishedTitle:"This item can be viewed by users you've shared with.",publishedUnsaveTitle:"There are unpublished changes since last publishing.",itemStatusDraft:"Draft",draftStatusTitle:"This item is not published. It can only be viewed by you.",headerHome:"Home",renameExperience:"Rename experience",renameTemplate:"Rename template",turnOnLiveView:"Turn on live view",turnOffLiveView:"Turn off live view",changeScreenSize:"Change screen size",createNewExperience:"Create new experience",gotIt:"Got it",templateRemind:"You are now working on an experience template.",unpublishedChanges:"Unpublished changes",transferToFullMode:"Transfer to full mode",transferToFullModeErrorRemind:"Failed to switch to full mode",transferAppTitle:"Do you want to transfer this app to full mode?",transferRemind:"You are about to transfer this app to Full Mode. This action is irreversible. Once transferred, the app can only be edited in Full Mode and cannot be reverted to Express Mode. Proceed with caution.",transferDirectly:"Transfer directly",transferCopy:"Transfer a copy"};var p=d(9298),h=d(3089),u=d(1888),m=d(4939),g=d.n(m),v=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const f=t=>{const s=window.SVG,{className:i}=t,o=v(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:g()},o)):e.React.createElement("svg",Object.assign({className:a},o))};var b=d(9703),w=d.n(b),S=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const y=t=>{const s=window.SVG,{className:i}=t,o=S(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:w()},o)):e.React.createElement("svg",Object.assign({className:a},o))};var x=d(2199),j=d.n(x),T=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const O=t=>{const s=window.SVG,{className:i}=t,o=T(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:j()},o)):e.React.createElement("svg",Object.assign({className:a},o))};var A=d(3317),P=d.n(A),M=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const k=t=>{const s=window.SVG,{className:i}=t,o=M(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:P()},o)):e.React.createElement("svg",Object.assign({className:a},o))};var I=d(9044),C=d.n(I),N=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const R=t=>{const s=window.SVG,{className:i}=t,o=N(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:C()},o)):e.React.createElement("svg",Object.assign({className:a},o))};var $=d(2075),E=d.n($),z=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const D=t=>{const s=window.SVG,{className:i}=t,o=z(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:E()},o)):e.React.createElement("svg",Object.assign({className:a},o))};var B=d(1972),L=d.n(B),U=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const F=t=>{const s=window.SVG,{className:i}=t,o=U(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:L()},o)):e.React.createElement("svg",Object.assign({className:a},o))};class H extends e.React.PureComponent{getStyle(t){return e.css`
      .item-inner {
        width: 16px;
        height: 16px;
        position: relative;
      }

      .item-loader-container {
        width: 100%;
        height: 100%;
      }

      .la-ball-fall,
        .la-ball-fall>div {
          position:relative;
          -webkit-box-sizing:border-box;
          -moz-box-sizing:border-box;
          box-sizing:border-box
        }

      .la-ball-fall {
        display:block;
        font-size:0;
        color:${t.ref.palette.black}
      }

      .la-ball-fall>div {
        display:inline-block;
        float:none;
        background-color:currentColor;
        border:0 solid currentColor
      }

      .la-ball-fall {
        width:54px;
        height:18px
      }

      .la-ball-fall>div{
        width:10px;
        height:10px;
        margin:4px;
        border-radius:100%;
        opacity:0;
        -webkit-animation:ball-fall 1s ease-in-out infinite;
        -moz-animation:ball-fall 1s ease-in-out infinite;
        -o-animation:ball-fall 1s ease-in-out infinite;
        animation:ball-fall 1s ease-in-out infinite
      }

      .la-ball-fall>div:nth-of-type(1){
        -webkit-animation-delay:-200ms;
        -moz-animation-delay:-200ms;
        -o-animation-delay:-200ms;
        animation-delay:-200ms
      }

      .la-ball-fall>div:nth-of-type(2){
        -webkit-animation-delay:-100ms;
        -moz-animation-delay:-100ms;
        -o-animation-delay:-100ms;
        animation-delay:-100ms
      }

      .la-ball-fall>div:nth-of-type(3){
        -webkit-animation-delay:0ms;
        -moz-animation-delay:0ms;
        -o-animation-delay:0ms;
        animation-delay:0ms
      }

      .la-ball-fall.la-2x{
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      .la-ball-fall.la-2x>div{
        width:25%;
        height:25%;
        margin:3%;
      }

      @-webkit-keyframes ball-fall{
        0%{opacity:0;-webkit-transform:translateY(-145%);transform:translateY(-145%)}
        10%{opacity:.5}
        20%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}
        80%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}
        90%{opacity:.5}
        100%{opacity:0;-webkit-transform:translateY(145%);transform:translateY(145%)}
      }

      @-moz-keyframes ball-fall{
        0%{opacity:0;-moz-transform:translateY(-145%);transform:translateY(-145%)}
        10%{opacity:.5}20%{opacity:1;-moz-transform:translateY(0);transform:translateY(0)}
        80%{opacity:1;-moz-transform:translateY(0);transform:translateY(0)}90%{opacity:.5}
        100%{opacity:0;-moz-transform:translateY(145%);transform:translateY(145%)}
      }

      @-o-keyframes ball-fall{
        0%{opacity:0;-o-transform:translateY(-145%);transform:translateY(-145%)}
        10%{opacity:.5}20%{opacity:1;-o-transform:translateY(0);transform:translateY(0)}
        80%{opacity:1;-o-transform:translateY(0);transform:translateY(0)}90%{opacity:.5}
        100%{opacity:0;-o-transform:translateY(145%);transform:translateY(145%)}
      }

      @keyframes ball-fall{
        0%{opacity:0;-webkit-transform:translateY(-145%);
        -moz-transform:translateY(-145%);
        -o-transform:translateY(-145%);
        transform:translateY(-145%)}10%{opacity:.5}
        20%{opacity:1;-webkit-transform:translateY(0);
        -moz-transform:translateY(0);
        -o-transform:translateY(0);
        transform:translateY(0)}
        80%{opacity:1;-webkit-transform:translateY(0);
        -moz-transform:translateY(0);
        -o-transform:translateY(0);
        transform:translateY(0)}
        90%{opacity:.5}
        100%{opacity:0;
        -webkit-transform:translateY(145%);
        -moz-transform:translateY(145%);
        -o-transform:translateY(145%);
        transform:translateY(145%)}
      }
    `}render(){return(0,e.jsx)("div",{className:"w-100 h-100",css:this.getStyle(this.props.theme)},(0,e.jsx)("div",{className:"item-inner"},(0,e.jsx)("div",{className:"item-loader-container"},(0,e.jsx)("div",{className:"la-ball-fall la-2x"},(0,e.jsx)("div",null),(0,e.jsx)("div",null),(0,e.jsx)("div",null)))))}}const _=H;var W=d(8972),Y=d(8996),V=d.n(Y),q=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const G=t=>{const s=window.SVG,{className:i}=t,o=q(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:V()},o)):e.React.createElement("svg",Object.assign({className:a},o))};var K;!function(e){e.AllFolder="AllFolder",e.OtherFolder="OtherFolder"}(K||(K={}));const Q={IMAGE:[".png",".jpg",".gif",".jpeg"]},X=o=>{const n=e.hooks.useTranslation(t.defaultMessages),l=(0,u.useTheme)(),r=(0,W.useRef)(null),p=(0,W.useRef)(null),d=e.css`
    &.modal-dialog{
      width: ${e.polished.rem(640)};
      max-width: ${e.polished.rem(640)};
    }
    & .edit-info-con {
      .info-content-otherinfo {
        width: ${e.polished.rem(346)};
      }
      .info-content-pic {
        width: ${e.polished.rem(240)};
        aspect-ratio: 200/133;
        background-size: 100% 100%;
        background-position: top center;
        margin-right: ${e.polished.rem(20)};
      }
      .edit-thumbnail-btn {
        width: ${e.polished.rem(240)};
        margin-top: ${e.polished.rem(11)};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
        display: block;
      }
      .edit-thumbnail-btn-con:hover .edit-thumbnail-btn {
      }
      .info-title-input {
        margin-bottom: ${e.polished.rem(16)};
      }
      .edit-thumbnail-inp {
        bottom: 0;
        left: 0;
        width: ${e.polished.rem(240)};
        height: ${e.polished.rem(34)};
        opacity: 0;
        cursor: pointer;
      }
      .info-content-label {
        font-size: ${e.polished.rem(14)};
        line-height: ${e.polished.rem(18)};
        color: ${l.ref.palette.neutral[900]};
        font-weight: 600;
        margin-bottom: ${e.polished.rem(10)} !important;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
      }
      .info-content-textarea {
        resize: none;
        padding: ${e.polished.rem(4)} ${e.polished.rem(6)};
        box-sizing: border-box;
        font-size: ${e.polished.rem(14)};
        textarea {
          max-height: ${e.polished.rem(87)};
          min-height: ${e.polished.rem(32)};
        }
      }
    }
  `,{folderUrl:c,templateHeaderText:h,experienceHeaderText:m,originalAppInfo:g,isOpen:v,toggle:f,changePublishStatus:b,onSaveSuccess:w,onSaveError:S,togglePublishOptionList:y,handleTokenInvalid:x,checkAndShowReadOnlyRemind:j}=o,[T,O]=(0,W.useState)(!1),[A,P]=(0,W.useState)(!1),[M,k]=(0,W.useState)(null),[I,C]=(0,W.useState)([]),[N,R]=(0,W.useState)((null==g?void 0:g.title)||""),[$,E]=(0,W.useState)([]),[z,D]=(0,W.useState)(g),[B,L]=(0,W.useState)((null==g?void 0:g.ownerFolder)||"/"),[U,F]=(0,W.useState)([]),[H,_]=(0,W.useState)((null==g?void 0:g.snippet)||""),[Y,V]=(0,W.useState)(null);(0,W.useEffect)((()=>{v&&(X(),J(),K(),q())}),[v]);const q=()=>{var t,s;const i=(null===(s=null===(t=(0,e.getAppStore)().getState())||void 0===t?void 0:t.user)||void 0===s?void 0:s.username)||"",o=(null==g?void 0:g.username)===i;L(o&&(null==g?void 0:g.ownerFolder)||"/")},K=()=>{var e;const t=(null==g?void 0:g.tags)?null===(e=null==g?void 0:g.tags)||void 0===e?void 0:e.asMutable({deep:!0}):[],s=null==t?void 0:t.filter((e=>e));R((null==g?void 0:g.title)||""),D(g),L((null==g?void 0:g.ownerFolder)||"/"),F(s),_((null==g?void 0:g.snippet)||"")},X=()=>{var t,s;if(window.jimuConfig.isDevEdition)return!1;const o=(null===(s=null===(t=(0,e.getAppStore)().getState())||void 0===t?void 0:t.user)||void 0===s?void 0:s.username)||"";o&&i.appServices.getUserTags(o).then((e=>{var t;const s=null===(t=null==e?void 0:e.tags)||void 0===t?void 0:t.map((e=>e.tag));E(s||[])}))},J=()=>!window.jimuConfig.isDevEdition&&i.appServices.getFolders({num:1}).then((e=>{Z(e||[])}),(e=>Promise.reject(e))),Z=t=>{const s=(0,e.getAppStore)().getState().user,i=(null==s?void 0:s.username)||"",o=[];i&&o.push({value:"/",text:i}),t.forEach((e=>{const t={value:e.id,text:e.title};o.push(t)})),C(o)},ee=()=>{P(!A)},te=(e,t=!1)=>{let s=e.target.value;s=s.length>250?s.slice(0,250):s;let i=z;window.jimuConfig.isDevEdition&&(i=i.set("text",""));t&&(s=/^[ ]*$/.test(s)?z.title:s,s=null==s?void 0:s.replace(/(^\s*)|(\s*$)/g,"")),i=i.set("name",s),i=i.set("title",s),D(i),R(s)},se=t=>{let s=t.typeKeywords||[];return s=s.map((t=>t.includes("version:")?`version:${e.version}`:t.includes("publishVersion:")?`publishVersion:${e.version}`:t.includes("status:")?`status: ${a.Draft}`:t)),t.set("typeKeywords",s)},ie=()=>{O(!1),f(),S()},oe=()=>{f(),S(!0),V(null),_("")};return(0,e.jsx)(t.Modal,{isOpen:null==o?void 0:o.isOpen,centered:!0,returnFocusAfterClose:!0,css:d,backdrop:"static"},(0,e.jsx)(t.ModalHeader,{toggle:oe},(null==o?void 0:o.isTemplate)?h:m),(0,e.jsx)(t.ModalBody,null,(0,e.jsx)("div",{className:"edit-info-con h-100","data-testid":"editInfo"},(0,e.jsx)("div",{className:"d-flex justify-content-center w-100 h-100"},(0,e.jsx)("div",null,(0,e.jsx)("div",{"data-testid":"thumbnailCon",className:"info-content-pic",style:{backgroundImage:`url(${Y||(()=>{const t=null==z?void 0:z.thumbnail,s=(0,e.getAppStore)().getState().portalUrl,i=e.SessionManager.getInstance().getSessionByUrl(s);if(null==z?void 0:z.thumbnailurl)return z.thumbnailurl;let o=t;return o=o?`${s}/sharing/rest/content/items/${z.id}/info/${t}?token=${null==i?void 0:i.token}`:`${c}./dist/runtime/assets/defaultthumb.png`,t&&window.jimuConfig.isDevEdition&&(o=`${window.location.origin}${window.jimuConfig.mountPath}/apps/${z.id}/${t}`),o})()})`}}),(0,e.jsx)("div",{className:"position-relative edit-thumbnail-btn-con"},(0,e.jsx)(t.Button,{className:"edit-thumbnail-btn",title:n("editThumbnail")},n("editThumbnail")),(0,e.jsx)("input",{"data-testid":"thumbnailInput",title:n("editThumbnail"),ref:r,className:"position-absolute edit-thumbnail-inp",type:"file",accept:".png, .jpeg, .jpg, .gif, .bmp",onChange:()=>{const e=r.current.files;if(!e||!e[0])return!1;if(e[0].size>10485760)return k(n("fileSizeTips",{maxSize:"10M"})),P(!0),r.current.value=null,!1;const t=".png";if(!Q.IMAGE.includes(t.toLowerCase()))return k(n("editAppErrorMessage")),ee(),!1;const s=new File([e[0]],`thumbnail${(new Date).getTime()}${t}`,{type:"image/png"}),i=window.URL.createObjectURL(s);V(i),p.current=s}}))),(0,e.jsx)("div",{className:"info-content-otherinfo flex-grow-1"},(0,e.jsx)("div",{className:"info-content-label",title:n("name")},n("name")),(0,e.jsx)(t.TextInput,{value:N,className:"info-title-input",onChange:e=>{let t=e.target.value;t.length>250&&(t=t.slice(0,250)),R(t)},onBlur:e=>{te(e,!0)},onKeyUp:e=>{te(e)}}),(0,e.jsx)("div",{className:"info-content-label",title:n("summaryField")},n("summaryField")),(0,e.jsx)(t.TextArea,{placeholder:n("summaryPlaceholder"),defaultValue:H,height:80,className:"info-content-textarea form-control mb-4",onAcceptValue:e=>{const t=z.set("snippet",e);D(t),_(e)}}),!window.jimuConfig.isDevEdition&&(0,e.jsx)("div",{className:"select-choices-con mb-4"},(0,e.jsx)("div",{className:"info-content-label",title:n("tags")},n("tags")),(0,e.jsx)(t.TagInput,{data:U,selectListData:$,onChange:e=>{const t=z.setIn(["tags"],e);F(e),D(t)},name:n("tagsLowerCase"),menuProps:{maxHeight:80}})),!window.jimuConfig.isDevEdition&&(0,e.jsx)("div",null,(0,e.jsx)("div",{className:"info-content-label",title:n("saveInFolder")},n("saveInFolder")),(0,e.jsx)(t.Select,{value:B||"/",onChange:e=>{const t=e.target.value;L(t)}},I.map((s=>(0,e.jsx)(t.Option,{value:s.value,key:s.value},s.text))))))),T&&(0,e.jsx)("div",{style:{position:"absolute",left:"50%",top:"50%",zIndex:1e4},className:"jimu-primary-loading"}),(0,e.jsx)(t.AlertPopup,{isOpen:A,hideCancel:!0,toggle:()=>{P(!A)}},(0,e.jsx)("div",{className:"align-middle pt-2",style:{fontSize:"1rem"}},(0,e.jsx)(G,{className:"mr-2 align-middle",size:24,color:"var(--warning-600)"}),(0,e.jsx)("span",{className:"align-middle"},M))))),(0,e.jsx)(t.ModalFooter,null,(0,e.jsx)(t.Button,{type:"primary",onClick:()=>{if(j())return void f();O(!0);const t=p.current||null,o=window.jimuConfig.isDevEdition?null:B,n=se(g);s.builderAppSync.publishChangeSelectionToApp(null),i.appServices.saveAsApp(null==n?void 0:n.asMutable({deep:!0}),null==z?void 0:z.asMutable({deep:!0}),o,t).then((t=>{const{id:i}=t;(0,e.getAppStore)().dispatch(s.builderActions.refreshAppListAction(!0));const o=z.set("id",i).set("thumbnailurl",null);D(o),s.builderAppSync.publishAppInfoChangeToApp(o),e.jimuHistory.changeQueryObject({id:i},!1),O(!1),f(),b(a.Draft),w(),y&&y()}),(e=>{O(!1),ie(),x(e)}))}},n("commonModalOk")),(0,e.jsx)(t.Button,{onClick:oe},n("commonModalCancel"))))},J=Object.assign({},r,t.defaultMessages),Z=s=>{const o=e.hooks.useTranslation(J),a=(0,u.useTheme)(),{originalAppInfo:r,folderUrl:p,appConfig:d,isSave:c,toolListWidth:h,isInDropdown:m,saveState:g,clickSaveButtonType:v,isOpenSaveAsPopper:f,handleTokenInvalid:b,togglePublishOptionList:w,onSaveSuccess:S,setIsOpenSaveAsPopper:y,onSaveError:x,onSaveStateChange:j,changePublishStatus:T,onSaveClick:O,clickSaveButtonTypeChange:A,checkAndShowReadOnlyRemind:P,saveAsPrivileges:M}=s,k=e.React.useRef(c),[I,C]=e.React.useState(n.Saved),N=()=>{switch(g){case n.Save:return o("save");case n.SaveError:return o("saveError");case n.SaveSuccess:return o("saveSuccess");case n.Saved:return o("saved");case n.Saving:return o("saving")}},R=(e,t)=>t===v&&(t===l.Save?!m&&e===n.Saving:e===n.Saving),$=(null==r?void 0:r.type)===i.AppType.TemplateType;return(0,e.jsx)("div",null,m?(0,e.jsx)("div",null,h<138&&(0,e.jsx)(t.DropdownItem,{onClick:c?void 0:()=>{A(l.SaveInDropdown),setTimeout((()=>{O()}))},title:o("save"),className:"dropdown-more-save save-menu",disabled:c,toggle:!1},R(g,l.SaveInDropdown)?(0,e.jsx)("div",{className:"d-inline-block toollist-dropdown-icon",style:{width:"16px",height:"16px"}},(0,e.jsx)(_,{theme:a})):(0,e.jsx)(D,{className:"toollist-item-icon d-inline-block toollist-dropdown-icon"}),o("save")),(0,e.jsx)(t.DropdownItem,{className:"save-menu",onClick:()=>{A(l.SaveAs),P()||(k.current=c,C(n.Saving),y(!0))},title:o("saveAs"),toggle:!1,disabled:!M},R(I,l.SaveAs)?(0,e.jsx)("div",{className:"d-inline-block toollist-dropdown-icon",style:{width:"16px",height:"16px"}},(0,e.jsx)(_,{theme:a})):(0,e.jsx)(F,{className:"toollist-item-icon d-inline-block toollist-dropdown-icon"}),o("saveAs"))):(0,e.jsx)(t.Button,{id:"tooltip_save",className:(0,e.classNames)("toollist-item",{"toollist-item-click":!c,"tool-hidden":h<138}),type:"tertiary",icon:!0,size:"sm",title:N(),disabled:c,onClick:()=>{A(l.Save),O()}},R(g,l.Save)?(0,e.jsx)("div",{style:{width:"16px",height:"16px"}},(0,e.jsx)(_,{theme:a})):(0,e.jsx)(D,{className:"toollist-item-icon"})),(0,e.jsx)(X,{handleTokenInvalid:b,originalAppInfo:r,isOpen:f,folderUrl:p,appConfig:d,templateHeaderText:o("saveAsTemplateTitle"),experienceHeaderText:o($?"saveAsNewTemplate":"saveAsAppTitle"),toggle:()=>{y(!f)},changePublishStatus:T,onSaveSuccess:S,onSaveError:(e=!1)=>{C(k.current?n.Saved:n.Save),!e&&x()},togglePublishOptionList:w,checkAndShowReadOnlyRemind:P}))};var ee=d(5664),te=d.n(ee),se=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const ie=t=>{const s=window.SVG,{className:i}=t,o=se(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:te()},o)):e.React.createElement("svg",Object.assign({className:a},o))},oe=s=>{const i=e.hooks.useTranslation(t.defaultMessages),{itemId:o,isOpen:a,itemProtected:n,detailUrl:l,itemTitle:r,deleteToggle:p,deleteApp:d}=s,c=e.css`
    .icon-con {
      margin-right: ${e.polished.rem(12)};
      svg {
        color: var(--sys-color-error-main);
      }
    }
    .modal-title {
      color: var(--ref-palette-neutral-1000);
    }
    .can-not-delete-con {
      margin-bottom: ${e.polished.rem(16)};
      font-size: ${e.polished.rem(16)};
      font-weight: 500;
      line-height: ${e.polished.rem(24)};
      svg {
        margin: 0 ${e.polished.rem(6)} 0 ${e.polished.rem(6)};
      }
      &>div, div a {
        line-height: ${e.polished.rem(24)};
        display: inline-block;
        color: var(--ref-palette-neutral-1000);
      }
      div a {
        font-size: ${e.polished.rem(14)};
        text-decoration: underline;
        font-weight: 400;
      }
    }
    .delete-remind {
      font-size: ${e.polished.rem(13)};
      color: var(--ref-palette-neutral-1100);
    }
    .cancel-button {
      background: var(--ref-palette-neutral-500);
      color: var(--ref-palette-white);
      border: none;
      color: #fff;
    }
  `;return(0,e.jsx)(t.Modal,{className:(0,e.classNames)("d-flex justify-content-center"),isOpen:a,centered:!0,returnFocusAfterClose:!0,autoFocus:!0,backdrop:"static",toggle:p,css:c},(0,e.jsx)(t.ModalHeader,{tag:"h4",toggle:p,className:"item-delete-header"},i("delete")),(0,e.jsx)(t.ModalBody,null,(()=>{const t=i(n?"cannotDeleteItemMessage":"itemDeleteRemind");return(0,e.jsx)("div",{className:"w-100 h-100 d-flex"},n&&(0,e.jsx)("div",{className:"icon-con"},(0,e.jsx)(G,{size:24})),(0,e.jsx)("div",{className:"flex-grow-1"},n&&(0,e.jsx)("div",{className:"can-not-delete-con"},i("cannotDeleteItem",{title:""}),(0,e.jsx)("div",null,(0,e.jsx)(ie,{size:16}),(0,e.jsx)("a",{href:l,target:"view_window"},r))),(0,e.jsx)("div",{className:"delete-remind"},t)))})()),(0,e.jsx)(t.ModalFooter,null,!n&&(0,e.jsx)(t.Button,{type:"danger",onClick:e=>{d(o),p()}},i("delete")),(0,e.jsx)(t.Button,{className:"cancel-button",onClick:p},i("cancel"))))};var ae,ne=function(e,t,s,i){return new(s||(s=Promise))((function(o,a){function n(e){try{r(i.next(e))}catch(e){a(e)}}function l(e){try{r(i.throw(e))}catch(e){a(e)}}function r(e){var t;e.done?o(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(n,l)}r((i=i.apply(e,t||[])).next())}))};!function(e){e.AllFolder="AllFolder",e.OtherFolder="OtherFolder"}(ae||(ae={}));const le=e.css`
  & .modal-content {
    border: none;
  }
  .header-con {
    & {
      border: none;
      padding: ${e.polished.rem(30)};
      padding-bottom: 0;
    }
    svg {
      color: var(--sys-color-warning-main);
      border-bottom: none;
      margin-right: ${e.polished.rem(12)} !important;
    }
  }
  .modal-body {
    padding: ${e.polished.rem(24)} ${e.polished.rem(30)};
  }
  .modal-footer {
    & {
      padding: ${e.polished.rem(30)};
      padding-top: 0;
    }
  }
`,re=o=>{const a=e.hooks.useTranslation(t.defaultMessages,r),{originalAppInfo:n,isOpen:l,isSave:p,onSaveClick:d,toggle:c,onSaveSuccess:h,handleTokenInvalid:u,checkAndShowReadOnlyRemind:m}=o,[g,v]=(0,W.useState)(!1),[f,b]=(0,W.useState)(!1),[w,S]=(0,W.useState)(null),y=e=>{v(!1),u(e),S(a("transferToFullModeErrorRemind")),c()},x=(e,t)=>{s.builderAppSync.publishAppInfoChangeToApp(e),v(!1),c(),setTimeout((()=>{const e=s.utils.getBuilderUrl(t);window.location.href=e}),200)},j=()=>ne(void 0,void 0,void 0,(function*(){if(!m())return v(!0),s.builderAppSync.publishChangeSelectionToApp(null),i.appServices.transferApp({appInfo:null==n?void 0:n.asMutable({deep:!0}),transferDirectly:!0});c()})),T=()=>{var t,s;if(window.jimuConfig.isDevEdition)return null;let i="/";const o=(null===(s=null===(t=(0,e.getAppStore)().getState())||void 0===t?void 0:t.user)||void 0===s?void 0:s.username)||"";return(null==n?void 0:n.username)===o&&(null==n?void 0:n.ownerFolder)&&(i=null==n?void 0:n.ownerFolder),i};return(0,e.jsx)(t.Modal,{isOpen:l,centered:!0,returnFocusAfterClose:!0,css:le,backdrop:"static"},(0,e.jsx)(t.ModalHeader,{closeIcon:"",className:"header-con",toggle:c},(0,e.jsx)(G,{className:"mr-2",size:24}),a("transferAppTitle")),(0,e.jsx)(t.ModalBody,null,(0,e.jsx)("div",{className:"transfer-app-con h-100"},(0,e.jsx)("div",null,a("transferRemind")),g&&(0,e.jsx)("div",{style:{position:"absolute",left:"50%",top:"50%",zIndex:1e4},className:"jimu-primary-loading"}),(0,e.jsx)(t.AlertPopup,{isOpen:f,hideCancel:!0,toggle:()=>{b(!f)}},(0,e.jsx)("div",{className:"align-middle pt-2",style:{fontSize:"1rem"}},(0,e.jsx)(G,{className:"mr-2 align-middle",size:24,color:"var(--warning-600)"}),(0,e.jsx)("span",{className:"align-middle"},w))))),(0,e.jsx)(t.ModalFooter,null,(0,e.jsx)(t.Button,{type:"primary",onClick:()=>ne(void 0,void 0,void 0,(function*(){j().then((e=>{const{appInfo:t}=e;p?x(t,t.id):(s.builderAppSync.publishAppInfoChangeToApp(t),d(null,t,!0).then((e=>{x(t,t.id)}),(e=>{y(e)})))}),(e=>{y(e)}))})),title:a("transferDirectly")},a("transferDirectly")),(0,e.jsx)(t.Button,{onClick:()=>{if(m())return void c();v(!0);const e=T();i.appServices.transferApp({appInfo:null==n?void 0:n.asMutable({deep:!0}),folderId:e,transferDirectly:!1}).then((e=>{const{id:t,appInfo:s}=e;h(null,s,!1),x(s,t)}),(e=>{y(e)}))},title:a("transferCopy")},a("transferCopy")),(0,e.jsx)(t.Button,{onClick:c,title:a("commonModalCancel")},a("commonModalCancel"))))};var pe,de=function(e,t,s,i){return new(s||(s=Promise))((function(o,a){function n(e){try{r(i.next(e))}catch(e){a(e)}}function l(e){try{r(i.throw(e))}catch(e){a(e)}}function r(e){var t;e.done?o(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(n,l)}r((i=i.apply(e,t||[])).next())}))};!function(e){e.NewApp="NewApp",e.SaveAsTemplate="SaveAsTemplate",e.Publish="Publish"}(pe||(pe={}));const ce=Object.assign({},r,t.defaultMessages,e.defaultMessages);class he extends e.React.PureComponent{constructor(l){var d;super(l),this.fontSizeBase=14,this.panelWidth=210/this.fontSizeBase+"rem",this.save="save",this.saved="saved",this.saving="saving",this.saveError="saveError",this.saveSuccess="saveSuccess",this.publish="publish",this.published="published",this.publishing="publishing",this.publishError="publishError",this.publishSuccess="publishSuccess",this.translationMap={},this.hasUpdateAppconfigVersion=!1,this.checkIsAppInfoChange=(t,s)=>(delete t.typeKeywords,delete s.typeKeywords,delete t.title,delete s.title,!e.lodash.isDeepEqual(t,s)),this.getDiffKey=(e,t)=>{const s=[],i=(e,t,o)=>{for(const a in e){const n=e[a],l=null==t?void 0:t[a],r=o?`${o}.${a}`:a;"object"==typeof n&&"object"==typeof l?i(n,l,r):n!==l&&s.push(r)}};return i(e,t,""),s},this.updateToollistWidth=()=>{var e,t;const{toolListWidth:s}=this.state,i=(null===(t=null===(e=this.toolContainer)||void 0===e?void 0:e.current)||void 0===t?void 0:t.clientWidth)||0;s!==i&&this.setState({toolListWidth:i})},this.checkIsSaved=()=>this.state.saveState===n.Saved||this.props.stateHistory.past.length<=1&&this.props.stateHistory.future.length<1,this.onUndo=()=>{this.props.stateHistory.past.length<=1||(0,e.getAppStore)().dispatch(s.appStateHistoryActions.InBuilderAppConfigUndo())},this.onRedo=()=>{this.props.stateHistory.future.length<=0||(0,e.getAppStore)().dispatch(s.appStateHistoryActions.InBuilderAppConfigRedo())},this._getTimeOffset=e=>{const t=e.getTimezoneOffset();return(t<0?1:-1)*(t<0?Math.abs(t)/60:t/60)*60*60*1e3},this.onSaveClick=(e,t,...s)=>de(this,[e,t,...s],void 0,(function*(e,t,s=!1){if(this.props.checkAndShowReadOnlyRemind())return;const{titleText:i}=this.props,o=t||this.props.appItem;this.setState({saveState:n.Saving});let a=e||this.props.appConfig;return a=this.updateExbVersion(a),a=this.updateOriginExbVersion(a),o.title=i,yield this.saveRequest(o,a).then((e=>de(this,void 0,void 0,(function*(){return this.onSaveSuccess(a,o,s),this.updateTypeKeywordsRequest(o),yield Promise.resolve(null)}))),(e=>de(this,void 0,void 0,(function*(){return console.error(e),this.onSaveError(s),this.props.handleTokenInvalid(e),yield Promise.reject(e)}))))})),this.updateExbVersion=t=>{let o=t;return e.semver.lt(e.version,t.exbVersion)&&(o=i.appServices.replaceExbVersionInAppConfig(t),s.builderAppSync.publishAppConfigChangeToApp(o),this.hasUpdateAppconfigVersion=!0),o},this.updateOriginExbVersion=t=>{let i=t;return e.semver.eq(e.version,t.originExbVersion)||(i=t.set("originExbVersion",e.version),s.builderAppSync.publishAppConfigChangeToApp(i)),i},this.onSaveSuccess=(e,t,s=!1)=>{var i,o;!s&&this.props.toastNote(this.translationMap[this.saveSuccess]),this.setState({savedAppConfig:e||(null===(i=this.props)||void 0===i?void 0:i.appConfig),savedAppItem:t||(null===(o=this.props)||void 0===o?void 0:o.appItem),saveState:n.Saved})},this.onSaveError=(e=!1)=>{this.setState({saveState:n.SaveError}),!e&&this.props.toastNote(this.translationMap[this.saveError])},this.saveRequest=(e,t)=>{const s=(new Date).getTime();return i.appServices.saveApp(e,t.set("timestamp",s))},this.duplicateAppItem=e=>{const t=this.getFolderId();return i.appServices.duplicateApp(e,t).then((e=>Promise.resolve(e)),(e=>{console.log(e)}))},this.updateTypeKeywordsRequest=e=>{const t=e||this.props.appItem;t.title=this.props.titleText;const o=this.getTypeKeywords(t),a={id:t.id,typeKeywords:o.typeKeywords,owner:t.owner};i.appServices.updateAppInfo(a).then((()=>{t.typeKeywords=o.typeKeywords,s.builderAppSync.publishAppInfoChangeToApp(t),this.props.changePublishStatus(o.status)}),(e=>{console.error(e)}))},this.getTypeKeywords=t=>{let s=!1,i=a.Draft;const{publishStatus:o}=this.props;let n=(t||this.props.appItem).typeKeywords||[];if(n=n.map((t=>(t.includes("status:")&&(s=!0),t.includes("status:")&&o!==a.Draft?(i=a.Changed,`status: ${a.Changed}`):t.includes("version:")?`version:${e.version}`:t))),!s){const e=`status: ${a.Draft}`;i=a.Draft,n.push(e)}return{typeKeywords:n,status:i}},this.onPublishClick=()=>{this.props.checkAndShowReadOnlyRemind()||this.props.publishStatus!==a.Publishing&&(this.state.saveState===n.Saved||this.props.stateHistory.past.length<=1&&this.props.stateHistory.future.length<1?this.tryToPublishApp():(this.setState({isShowLeaveAlertPopup:!0}),this.clickEventType=pe.Publish))},this.tryToPublishApp=()=>de(this,void 0,void 0,(function*(){(yield p.proxySettingUtils.needToConfigProxy())?this.setState({isProxySettingPopupOpen:!0}):this.publishApp()})),this.onAppProxiesFinish=e=>de(this,void 0,void 0,(function*(){return this.onSaveClick(e).then((()=>{this.publishApp()}),(e=>{this.props.handleTokenInvalid(e)}))})),this.onAppProxiesCancel=()=>{this.setState({isProxySettingPopupOpen:!1})},this.onToggleProxySettingPopup=()=>{this.setState({isProxySettingPopupOpen:!this.state.isProxySettingPopupOpen})},this.publishApp=()=>{this.props.changePublishStatus(a.Publishing);const{appItem:e}=this.props;i.appServices.publishApp(e).then((e=>{s.builderAppSync.publishAppInfoChangeToApp(e),this.setState({isPublished:!0}),this.props.changePublishStatus(a.Published),this.props.toastNote(this.translationMap[this.publishSuccess])}),(e=>{console.error(e),this.props.handleTokenInvalid(e),this.props.toastNote(this.translationMap[this.publishError]),this.props.changePublishStatus(a.Changed)})).catch((e=>{console.error(e),this.props.handleTokenInvalid(e),this.props.toastNote(this.translationMap[this.publishError]),this.props.changePublishStatus(a.Changed)}))},this.onToggleToolTipUndo=()=>{this.setState({toolTipUndoOpen:!this.state.toolTipUndoOpen,toolTipRedoOpen:!1,toolTipSaveOpen:!1,toolTipPreviewOpen:!1,toolTipPublishOpen:!1,toolTipPublishOptionsOpen:!1})},this.onToggleToolTipRedo=()=>{this.setState({toolTipUndoOpen:!1,toolTipRedoOpen:!this.state.toolTipRedoOpen,toolTipSaveOpen:!1,toolTipPreviewOpen:!1,toolTipPublishOpen:!1,toolTipPublishOptionsOpen:!1})},this.onToggleToolTipSave=()=>{this.setState({toolTipUndoOpen:!1,toolTipRedoOpen:!1,toolTipSaveOpen:!this.state.toolTipSaveOpen,toolTipPreviewOpen:!1,toolTipPublishOpen:!1,toolTipPublishOptionsOpen:!1})},this.onToggleToolTipPreview=()=>{this.setState({toolTipUndoOpen:!1,toolTipRedoOpen:!1,toolTipSaveOpen:!1,toolTipPreviewOpen:!this.state.toolTipPreviewOpen,toolTipPublishOpen:!1,toolTipPublishOptionsOpen:!1})},this.onToggleToolTipPublish=()=>{this.setState({toolTipUndoOpen:!1,toolTipRedoOpen:!1,toolTipSaveOpen:!1,toolTipPreviewOpen:!1,toolTipPublishOpen:!this.state.toolTipPublishOpen,toolTipPublishOptionsOpen:!1})},this.onToggleToolTipPublishOptions=()=>{this.setState({toolTipUndoOpen:!1,toolTipRedoOpen:!1,toolTipSaveOpen:!1,toolTipPreviewOpen:!1,toolTipPublishOpen:!1,toolTipPublishOptionsOpen:!this.state.toolTipPublishOptionsOpen})},this.togglePublishOptionList=()=>{this.setState({publishOptionsListOpen:!this.state.publishOptionsListOpen,toolTipPublishOptionsOpen:!1})},this.toggleMoreToolList=()=>{this.setState({moreToolListOpen:!this.state.moreToolListOpen})},this.copyPublishUrlToClipBoard=()=>{const e=location.origin+window.jimuConfig.mountPath+(window.jimuConfig.useStructuralUrl?`experience/${this.props.queryObject.id}/`:`experience/?id=${this.props.queryObject.id}`),t=document.createElement("input");t.value=e,t.style.position="absolute",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),document.execCommand("copy"),document.body.removeChild(t),this.props.toastNote(this.copySuccess),this.setState({publishOptionsListOpen:!1})},this.isInOnLine=()=>e.portalUrlUtils.isAGOLDomain(this.props.portalUrl),this.saveForkeyBoard=()=>(this.state.saveState===n.Saved||this.props.stateHistory.past.length<=1&&this.props.stateHistory.future.length<1||this.state.saveState===n.Saving||this.onSaveClick(),!1),this.isMac=()=>{var e,t;return"macOS"===(null===(t=null===(e=window.jimuUA)||void 0===e?void 0:e.os)||void 0===t?void 0:t.name)},this.newApp=()=>{if(!this.checkIsSaved())return this.setState({isShowLeaveAlertPopup:!0}),this.clickEventType=pe.NewApp,!1;this.toNewApp()},this.toNewApp=()=>{const{locale:t}=this.props,s=t?{redirect:"back",locale:t}:{redirect:"back"},i=t?{page:"template",redirect:"back",locale:t}:{page:"template",redirect:"back"};this.props.itemType===o.Experience?(e.jimuHistory.changePage("template"),window.jimuConfig.useStructuralUrl?e.jimuHistory.changeQueryObject(s,!0):e.jimuHistory.changeQueryObject(i,!0)):this.createNewAppByTemplate(this.props.appItem)},this.createNewAppByTemplate=t=>{i.appServices.createAppByItemTemplate(t).then((t=>{t&&(e.jimuHistory.changeQueryObject({id:t},!0),this.props.changePublishStatus(a.Draft))}),(()=>{}))},this.isConfirmsaveAsTemplate=()=>{if(!this.props.checkAndShowReadOnlyRemind())return this.checkIsSaved()?void this.saveAsTemplate():(this.setState({isShowLeaveAlertPopup:!0}),this.clickEventType=pe.SaveAsTemplate,!1)},this.saveAsTemplate=()=>{var t;this.toggleLoading(!0),i.appServices.createTemplateByApp(null===(t=this.props)||void 0===t?void 0:t.appItem).then((t=>{this.toggleLoading(!1),t&&(this.props.toastNote(this.generateTemplateSuccess),e.jimuHistory.changeQueryObject({id:t},!0),this.props.changePublishStatus(a.Draft))}),(()=>{this.props.toastNote(this.generateTemplateError),this.toggleLoading(!1)}))},this.toggleLoading=t=>{(0,e.getAppStore)().dispatch(e.appActions.setIsBusy(t,e.LoadingType.Primary))},this.deleteApp=(t,s)=>{i.appServices.deleteApp(t).then((()=>{s&&(e.jimuHistory.changeQueryObject({id:s},!0),this.props.changePublishStatus(a.Draft))}),(e=>{this.props.handleTokenInvalid(e)}))},this.handleToggleForLeaveAlertPopup=e=>{if(this.setState({isShowLeaveAlertPopup:!this.state.isShowLeaveAlertPopup}),e)switch(this.clickEventType){case pe.NewApp:this.toNewApp();break;case pe.SaveAsTemplate:this.saveAsTemplate();break;case pe.Publish:this.tryToPublishApp()}},this.previewToggle=()=>{this.setState({isShowPreviewAlertPop:!this.state.isShowPreviewAlertPop})},this.nls=e=>this.props.intl?this.props.intl.formatMessage({id:e,defaultMessage:ce[e]}):e,this.getAlertPopTitle=()=>{switch(this.clickEventType){case pe.NewApp:case pe.SaveAsTemplate:return this.nls("headerLeaveSite");case pe.Publish:return`${this.nls("publish")}`}},this.getAlertPopOkLabel=()=>{switch(this.clickEventType){case pe.NewApp:case pe.SaveAsTemplate:return this.nls("headerLeave");default:return""}},this.previewAlertPopStyle=()=>{var t,s,i,o,a,n;const l=null===(t=this.props)||void 0===t?void 0:t.theme;return e.css`
      .preview-alert-pop-content {
        font-size: 1rem;
        position: relative;
      }
      .modal-footer {
        padding: 0;
      }
      .modal-content {
        border: 1px solid ${null===(s=null==l?void 0:l.sys.color)||void 0===s?void 0:s.secondary.main};
      }
      .perview-pop-button-con {
        right:0;
        bottom: -20px;
        text-align: right;
        margin-top: ${e.polished.rem(32)};
      }
      .preview-alert-pop-btn {
        min-width: ${e.polished.rem(80)};
        border: none;
        box-sizing: border-box;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        user-select: none;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        line-height: 1.375rem;
        border-radius: 2px;
        background: transparent;
      }
      .btn-primary {
        color: ${null===(i=l.ref.palette)||void 0===i?void 0:i.black};
        background: ${null===(o=null==l?void 0:l.sys.color)||void 0===o?void 0:o.primary.main};
      }
      .btn-cancle {
        color: ${null===(a=null==l?void 0:l.ref.palette)||void 0===a?void 0:a.neutral[1e3]};
        border-color: ${null===(n=null==l?void 0:l.sys.color)||void 0===n?void 0:n.secondary.dark};
        margin-left: ${e.polished.rem(10)};
        border-width: 1px;
        border-style: solid;
      }
    `},this.getPublishText=()=>{const{publishStatus:e}=this.props;switch(e){case a.Published:return this.nls("published");case a.Publishing:return this.nls("publishing");case a.Changed:case a.Draft:return this.nls("publish")}},this.getFolderId=()=>{var t,s;const{appItem:i}=this.props;return(null===(s=null===(t=(0,e.getAppStore)().getState())||void 0===t?void 0:t.user)||void 0===s?void 0:s.username)===(null==i?void 0:i.owner)?null:(null==i?void 0:i.ownerFolder)||null},this.onSaveStateChange=e=>{this.setState({saveState:e})},this.clickSaveButtonTypeChange=e=>{this.setState({clickSaveButtonType:e})},this.setIsOpenSaveAsPopper=e=>{this.setState({isOpenSaveAsPopper:e})},this.handleToggle=()=>{if(this.props.checkAndShowReadOnlyRemind())return;const{appItem:e}=this.props;if(null==e?void 0:e.protected)return void this.setState({isOpenDeletePopper:!0,alertPopupMessage:this.nls("unableDelete")});const{isOpenDeletePopper:t}=this.state;this.setState({isOpenDeletePopper:!t})},this.handleConfirm=e=>{window.onbeforeunload=null,this.setState({loading:!0,isOpenDeletePopper:!1}),i.appServices.deleteApp(e).then((()=>{this.setState({loading:!1});const e=`${window.jimuConfig.mountPath}`;window.location.assign(e)}),(e=>{this.props.handleTokenInvalid(e),"CONT_0048"===(null==e?void 0:e.code)?this.setState({loading:!1,itemProtected:!0,isOpenDeletePopper:!0,alertPopupMessage:this.nls("unableDelete")}):this.setState({isShowAlertPopup:!0,alertPopupMessage:this.nls("deleteError"),loading:!1})}))},this.toggleAlertPopup=()=>{const{isShowAlertPopup:e}=this.state;this.setState({isShowAlertPopup:!e,alertPopupMessage:""})},this.onDownloadAppModalOpen=()=>{this.setState({isOpenDownloadAppModal:!0})},this.onDownloadAppModalClose=()=>{this.setState({isOpenDownloadAppModal:!1})},this.toggleTransferToFullModePopper=()=>{this.setState({openTransferToFullModePopper:!this.state.openTransferToFullModePopper})},this.checkIsAppSaved=()=>{var e,t;const{stateHistory:s}=this.props,{saveState:i}=this.state;return i===n.Saved||(null===(e=null==s?void 0:s.past)||void 0===e?void 0:e.length)<=1&&(null===(t=null==s?void 0:s.future)||void 0===t?void 0:t.length)<1},this.renderMore=()=>{const i=window.jimuConfig.isDevEdition,n=window.isExpressBuilder,{itemType:l,publishStatus:p,stateHistory:d,theme:c,queryObject:h,appItem:u,appConfig:m,canEditItem:g,handleTokenInvalid:v}=this.props,{saveState:b,toolListWidth:w,clickSaveButtonType:S,isOpenSaveAsPopper:x}=this.state,j=l===o.Template,T=this.checkIsAppSaved();let A=e.urlUtils.getAppUrl({appId:h.id,isTemplate:j,isArcGisOnlineTemplate:!1,isPortalRequest:!1,isDraft:!0}),P=e.urlUtils.getAppUrl({appId:this.props.queryObject.id,isTemplate:j});return h.locale&&(A=e.urlUtils.appendQueryParam(A,"locale",h.locale),P=e.urlUtils.appendQueryParam(P,"locale",h.locale)),h.__env__&&(A=e.urlUtils.appendQueryParam(A,"__env__",h.__env__),P=e.urlUtils.appendQueryParam(P,"__env__",h.__env__)),(0,e.jsx)("div",{className:"tool_more_con h-100"},(0,e.jsx)(t.Dropdown,{size:"sm",toggle:this.togglePublishOptionList,isOpen:this.state.publishOptionsListOpen||x},(0,e.jsx)(t.DropdownButton,{arrow:!1,icon:!0,size:"sm",type:"tertiary",className:"toollist-item-click",title:this.moreOptionsForTool},(0,e.jsx)(f,{className:"toollist-dropdown-icon"})),(0,e.jsx)(t.DropdownMenu,{css:this.getDropdownStyle(c)},(0,e.jsx)(t.DropdownItem,{onClick:this.onUndo,className:"dropdown-more-undo",disabled:d.past.length<=1||w>=46,toggle:!1},(0,e.jsx)("div",{title:this.undo},(0,e.jsx)(O,{className:"toollist-dropdown-icon",autoFlip:!0}),this.undo)),(0,e.jsx)(t.DropdownItem,{onClick:this.onRedo,className:"dropdown-more-redo",disabled:this.props.stateHistory.future.length<1||w>=92,toggle:!1},(0,e.jsx)("div",{title:this.redo},(0,e.jsx)(k,{className:"toollist-dropdown-icon",autoFlip:!0}),this.redo)),(0,e.jsx)(Z,{handleTokenInvalid:v,originalAppInfo:(0,e.Immutable)(u),folderUrl:this.props.folderUrl,appConfig:m,isSave:T,toolListWidth:w,isInDropdown:!0,onSaveSuccess:this.onSaveSuccess,onSaveError:this.onSaveError,saveState:b,onSaveStateChange:this.onSaveStateChange,changePublishStatus:this.props.changePublishStatus,onSaveClick:this.onSaveClick,clickSaveButtonType:S,clickSaveButtonTypeChange:this.clickSaveButtonTypeChange,setIsOpenSaveAsPopper:this.setIsOpenSaveAsPopper,isOpenSaveAsPopper:x,togglePublishOptionList:this.togglePublishOptionList,checkAndShowReadOnlyRemind:this.props.checkAndShowReadOnlyRemind,saveAsPrivileges:g}),T?(0,e.jsx)(t.DropdownItem,{onClick:void 0,className:"dropdown-more-preview",disabled:w>=184,tag:"a",href:A,rel:"noreferrer",target:"_blank",title:this.preview},(0,e.jsx)("div",{id:"tooltip_preview",title:this.preview},(0,e.jsx)(y,{className:"toollist-dropdown-icon"}),this.preview)):(0,e.jsx)(t.DropdownItem,{onClick:this.previewToggle,className:"dropdown-more-preview",disabled:w>=184},(0,e.jsx)("div",{id:"tooltip_preview",title:this.preview},(0,e.jsx)(y,{className:"toollist-dropdown-icon"}),this.preview)),(0,e.jsx)(t.DropdownItem,{onClick:this.handleToggle,className:"dropdown-more-delete",disabled:!g},(0,e.jsx)("div",{id:"tooltip_delete",title:this.delete},(0,e.jsx)(R,{className:"toollist-dropdown-icon"}),this.delete)),(0,e.jsx)(t.DropdownItem,{divider:!0}),!i&&(0,e.jsx)(t.DropdownItem,{onClick:()=>{window.open(`${this.props.portalUrl}/home/item.html?id=${this.props.currentAppId}`)}},this.changeShareSettings),(0,e.jsx)(t.DropdownItem,{disabled:!this.state.isPublished,onClick:()=>{window.open(P,"_blank"),this.setState({publishOptionsListOpen:!1})}},this.viewPublishedItem),i&&p!==a.Draft&&(0,e.jsx)(t.DropdownItem,{onClick:this.onDownloadAppModalOpen},this.props.intl.formatMessage({id:"download",defaultMessage:t.defaultMessages.download})),(0,e.jsx)(t.DropdownItem,{disabled:!this.state.isPublished,onClick:()=>{this.copyPublishUrlToClipBoard()}},this.copyPublishedItemLink),p!==a.Draft&&j&&(0,e.jsx)(t.DropdownItem,{onClick:()=>{this.newApp()}},this.createNewExperience),(0,e.jsx)(t.DropdownItem,{divider:!0}),!j&&(0,e.jsx)(t.DropdownItem,{onClick:()=>{this.newApp()}},this.createNew),l===o.Experience&&!n&&(0,e.jsx)(t.DropdownItem,{disabled:!g,onClick:()=>{this.isConfirmsaveAsTemplate()}},this.generateTemplate),n&&(0,e.jsx)(t.DropdownItem,{onClick:this.toggleTransferToFullModePopper},this.props.intl.formatMessage({id:"transferToFullMode",defaultMessage:r.transferToFullMode})))),i&&p!==a.Draft&&this.state.isOpenDownloadAppModal&&(0,e.jsx)(s.DownloadAppModal,{appId:this.props.appItem.id,isOpen:this.state.isOpenDownloadAppModal,onClose:this.onDownloadAppModalClose}))},this.translationMap[this.save]=this.props.intl.formatMessage({id:"save",defaultMessage:r.save}),this.translationMap[this.saved]=this.props.intl.formatMessage({id:"saved",defaultMessage:r.saved}),this.translationMap[this.saving]=this.props.intl.formatMessage({id:"saving",defaultMessage:r.saving}),this.translationMap[this.saveError]=this.props.intl.formatMessage({id:"saveError",defaultMessage:r.saveError}),this.translationMap[this.saveSuccess]=this.props.intl.formatMessage({id:"saveSuccess",defaultMessage:r.saveSuccess}),this.translationMap[this.publish]=this.nls("publish"),this.translationMap[this.published]=this.props.intl.formatMessage({id:"published",defaultMessage:r.published}),this.translationMap[this.publishing]=this.props.intl.formatMessage({id:"publishing",defaultMessage:r.publishing}),this.translationMap[this.publishError]=this.props.intl.formatMessage({id:"publishError",defaultMessage:r.publishError}),this.translationMap[this.publishSuccess]=this.props.intl.formatMessage({id:"publishSuccess",defaultMessage:r.publishSuccess}),this.undo=this.props.intl.formatMessage({id:"undo",defaultMessage:r.undo}),this.redo=this.props.intl.formatMessage({id:"redo",defaultMessage:r.redo}),this.preview=this.props.intl.formatMessage({id:"preview",defaultMessage:t.defaultMessages.preview}),this.delete=this.props.intl.formatMessage({id:"deleteOption",defaultMessage:t.defaultMessages.deleteOption}),this.publishTo=this.props.intl.formatMessage({id:"publishTo",defaultMessage:r.publishTo}),this.publishOptions=this.props.intl.formatMessage({id:"publishOptions",defaultMessage:r.publishOptions}),this.copySuccess=this.props.intl.formatMessage({id:"copySuccess",defaultMessage:r.copySuccess}),this.changeShareSettings=this.props.intl.formatMessage({id:"changeShareSettings",defaultMessage:r.changeShareSettings}),this.viewPublishedItem=this.props.intl.formatMessage({id:"viewPublishedItem",defaultMessage:r.viewPublishedItem}),this.copyPublishedItemLink=this.props.intl.formatMessage({id:"copyPublishedItemLink",defaultMessage:r.copyPublishedItemLink}),this.createNew=this.props.intl.formatMessage({id:"createNew",defaultMessage:r.createNew}),this.createNewExperience=this.props.intl.formatMessage({id:"createNewExperience",defaultMessage:r.createNewExperience}),this.generateTemplate=this.props.intl.formatMessage({id:"generateTemplate",defaultMessage:r.generateTemplate}),this.moreOptionsForTool=this.props.intl.formatMessage({id:"moreOptionsForTool",defaultMessage:r.moreOptionsForTool}),this.moreTools=this.props.intl.formatMessage({id:"moreTools",defaultMessage:r.moreTools}),this.access=this.props.intl.formatMessage({id:"access",defaultMessage:r.access}),this.generateTemplateSuccess=this.props.intl.formatMessage({id:"generateTemplateSuccess",defaultMessage:r.generateTemplateSuccess}),this.generateTemplateError=this.props.intl.formatMessage({id:"generateTemplateError",defaultMessage:r.generateTemplateError}),this.clickEventType=pe.NewApp,this.state={saveState:n.Save,savedAppConfig:null,savedAppItem:null,toolTipUndoOpen:!1,toolTipRedoOpen:!1,toolTipSaveOpen:!1,toolTipPreviewOpen:!1,toolTipPublishOpen:!1,toolTipPublishOptionsOpen:!1,publishOptionsListOpen:!1,moreToolListOpen:!1,isPublished:!1,isShowLeaveAlertPopup:!1,isShowPreviewAlertPop:!1,isProxySettingPopupOpen:!1,toolListWidth:184,newAppId:null,isSaveStateSaved:!1,clickSaveButtonType:null,isOpenSaveAsPopper:!1,isOpenDeletePopper:!1,isShowAlertPopup:!1,alertPopupMessage:"",loading:!1,itemProtected:null===(d=l.appItem)||void 0===d?void 0:d.protected,isOpenDownloadAppModal:!1,openTransferToFullModePopper:!1},this.toolContainer=e.React.createRef()}getStyle(t){var s;return e.css`
      button:disabled:hover,button:disabled, .tool_more_con:disabled:hover, .tool_more_con:disabled{
        color:${t.ref.palette.neutral[700]};
      }
      button, .tool_more_con button{
        color:${t.ref.palette.neutral[900]}
      }
      .tool_more_con button:hover {
        color: ${t.ref.palette.black};
      }
      button:disabled:hover {
        border:none;
      }
      .toollist {
        .toollist-length-screen {
          width: ${e.polished.rem(0)};
          overflow: hidden;
          .tool-hidden {
            display: none;
          }
        }

        @media only screen and (max-width: 1025px) {
          .toollist-length-screen {
            width: ${e.polished.rem(0)};
          }
        }
        @media only screen and (min-width: 1025px) {
          .toollist-length-screen {
            width: ${e.polished.rem(46)};
          }
        }
        @media only screen and (min-width: 1071px) {
          .toollist-length-screen {
            width: ${e.polished.rem(92)};
          }
        }
        @media only screen and (min-width: 1117px) {
          .toollist-length-screen {
            width: ${e.polished.rem(138)};
          }
        }
        @media only screen and (min-width: 1163px) {
          .toollist-length-screen {
            width: ${e.polished.rem(184)};
          }
        }

        .tool_more_content {
          width: ${e.polished.rem(46)};
          height: 26px;
          .toollist-dropdown-icon{
            margin: 0
          }
        }
        .toollist-item {
          margin: 4px;
          padding: 4px 11px;
          border: 0;
        }
        .toollist-item-click:focus {
          box-shadow: none !important;
        }
        .toollist-publish {
          border-radius: 2px;
          min-width: 4.25rem;
          height: ${e.polished.rem(26)};
          color: ${t.ref.palette.black};
          background: ${t.ref.palette.neutral[700]};
          font-size: ${e.polished.rem(13)};
          padding-top: 0;
          padding-bottom: 0;
          border:none;
          &:hover {
            background: ${t.sys.color.primary.main};
            border:none;
          }
          &.btn.disabled {
            background-color: ${t.ref.palette.neutral[700]};
            color: ${t.ref.palette.neutral[900]};
            border:none;
          }
        }
        .toollist-publish:focus {
          box-shadow: none !important;
        }

        .btn {
          &.disabled,
          &:disabled {
            background-color: transparent;
          }
        }
        .btn:not(:disabled):not(.disabled):active,
        .btn:not(:disabled):not(.disabled).active,
        .show > .btn.dropdown-toggle {
          color: ${(null===(s=null==t?void 0:t.ref.palette)||void 0===s?void 0:s.black)||"black"};
        }
      }

      button:not(:disabled):not(.disabled):active, button:not(:disabled):not(.disabled).active{
        border:none;
      }

      .loading-con {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: ${e.polished.rgba(t.ref.palette.white,.2)};
      }
    `}getDropdownStyle(t){return e.css`
      & {
        background: ${t.ref.palette.neutral[500]};
        border: 1px solid ${t.ref.palette.neutral[400]};;
        box-shadow: 0 0 10px 2px ${e.polished.rgba(t.ref.palette.white,.2)};
        border-radius: 2px;
        border-radius: 2px;
        min-width:${e.polished.rem(220)};
        padding-top: ${e.polished.rem(8)};
        padding-bottom: 0;
      }
      button.save-menu {
        padding-left: ${e.polished.rem(16)};
        margin-bottom: ${e.polished.rem(8)};
      }
      .dropdown-menu--inner {
        .toollist-dropdown-icon {
          margin-right: ${e.polished.rem(8)};
          margin-bottom: ${e.polished.rem(2)};
        }
        &>button, &>a {
          padding-left: ${e.polished.rem(16)};
          margin-bottom: ${e.polished.rem(8)};
        }
        button, a {
          box-sizing:border-box;
        }
        .dropdown-more-preview-a {
          color: inherit;
          text-decoration: none;
        }

        @media only screen and (min-width: 1162px) {
          .dropdown-more-preview {
            display: none;
          }
        }
        @media only screen and (max-width: 1162px) {
          .dropdown-more-preview {
            display: flex;
          }
        }
        @media only screen and (min-width: 1116px) {
          .dropdown-more-save {
            display: none;
          }
        }
        @media only screen and (max-width: 1116px) {
          .dropdown-more-save {
            display: flex;
          }
        }
        @media only screen and (min-width: 1070px) {
          .dropdown-more-redo {
            display: none;
          }
        }
        @media only screen and (max-width: 1070px) {
          .dropdown-more-redo {
            display: flex;
          }
        }
        @media only screen and (min-width: 1024px) {
          .dropdown-more-undo {
            display: none;
          }
        }
        @media only screen and (max-width: 1024px) {
          .dropdown-more-undo {
            display: flex;
          }
        }
      }
    `}componentDidMount(){window.onbeforeunload=()=>{if(!this.checkIsSaved())return!1},window.addEventListener("resize",this.updateToollistWidth)}componentWillUnmount(){window.onbeforeunload=null}componentDidUpdate(t,s){var i,o;const{appConfig:l,publishStatus:r,appItem:p}=this.props,{savedAppConfig:d,savedAppItem:c}=this.state;if(this.updateToollistWidth(),this.props.onSaveStatusChanged&&this.props.onSaveStatusChanged(this.checkIsSaved()),(null==p?void 0:p.protected)===(null===(i=null==t?void 0:t.appItem)||void 0===i?void 0:i.protected)&&(null==p?void 0:p.id)===(null===(o=null==t?void 0:t.appItem)||void 0===o?void 0:o.id)||this.setState({itemProtected:null==p?void 0:p.protected}),r!==t.publishStatus&&(r===a.Draft?this.setState({isPublished:!1}):this.setState({isPublished:!0})),this.props!==t){if(this.hasUpdateAppconfigVersion){return void((null==l?void 0:l.exbVersion)===(null==d?void 0:d.exbVersion)&&(this.setState({savedAppConfig:l}),this.hasUpdateAppconfigVersion=!1))}if(l)if(d||c){const t=this.checkIsAppInfoChange(Object.assign({},p),Object.assign({},c)),s=!e.lodash.isDeepEqual(null==l?void 0:l.asMutable({deep:!0}),null==d?void 0:d.asMutable({deep:!0}));t||s?this.setState({saveState:n.Save}):this.setState({saveState:n.Saved})}else this.state.saveState===this.saveError&&this.setState({saveState:n.Save})}}render(){const{toolListWidth:s,saveState:i,clickSaveButtonType:n,isOpenDeletePopper:l,isShowAlertPopup:r,alertPopupMessage:d,loading:c,itemProtected:u,openTransferToFullModePopper:m}=this.state,g=window.jimuConfig.isDevEdition,{itemType:v,publishStatus:f,appItem:b,appConfig:w,queryObject:S,itemId:x,canEditItem:j,handleTokenInvalid:T}=this.props,A=g?"":`${this.publishTo} ${this.isInOnLine()?"ArcGIS Online":"Portal for ArcGIS"}`,P=this.checkIsAppSaved(),M=v===o.Template,I=this.props.appConfig&&h.dataComponentsUtils.getWhetherDataSourceIsInited(this.props.dataSources,this.props.dataSourcesInfo);let C=e.urlUtils.getAppUrl({appId:this.props.queryObject.id,isTemplate:M,isArcGisOnlineTemplate:!1,isPortalRequest:!1,isDraft:!0});return S.locale&&(C=e.urlUtils.appendQueryParam(C,"locale",S.locale)),S.__env__&&(C=e.urlUtils.appendQueryParam(C,"__env__",S.__env__)),(0,e.jsx)("div",{className:"float-right d-flex flex-row align-items-center",css:this.getStyle(this.props.theme)},this.isMac()&&(0,e.jsx)(e.Keyboard,{bindings:{"command+keys":()=>{this.saveForkeyBoard()}}}),!this.isMac()&&(0,e.jsx)(e.Keyboard,{bindings:{"ctrl+keys":()=>{this.saveForkeyBoard()}}}),(0,e.jsx)("div",{className:"h-100 toollist d-flex flex-row align-items-center justify-content-end"},(0,e.jsx)("div",{className:"toollist-length-screen d-flex align-items-center justify-content-starth-100 justify-content-start",ref:this.toolContainer},(0,e.jsx)(t.Button,{id:"tooltip_undo",className:(0,e.classNames)("toollist-item",{"toollist-item-click":!(this.props.stateHistory.past.length<=1),"tool-hidden":s<46}),type:"tertiary",title:this.undo,icon:!0,size:"sm",disabled:this.props.stateHistory.past.length<=1,onClick:this.onUndo},(0,e.jsx)(O,{className:"toollist-item-icon",autoFlip:!0})),(0,e.jsx)(t.Button,{id:"tooltip_redo",className:(0,e.classNames)("toollist-item",{"toollist-item-click":!(this.props.stateHistory.future.length<1),"tool-hidden":s<92}),type:"tertiary",title:this.redo,icon:!0,size:"sm",disabled:this.props.stateHistory.future.length<1,onClick:this.onRedo},(0,e.jsx)(k,{className:"toollist-item-icon",autoFlip:!0})),s>=138&&(0,e.jsx)(Z,{originalAppInfo:(0,e.Immutable)(b),folderUrl:this.props.folderUrl,appConfig:w,isSave:P,toolListWidth:s,isInDropdown:!1,onSaveSuccess:this.onSaveSuccess,onSaveError:()=>{},saveState:i,onSaveStateChange:this.onSaveStateChange,changePublishStatus:this.props.changePublishStatus,onSaveClick:this.onSaveClick,clickSaveButtonType:n,clickSaveButtonTypeChange:this.clickSaveButtonTypeChange}),j&&window.isExpressBuilder&&(0,e.jsx)(re,{originalAppInfo:(0,e.Immutable)(b),isOpen:m,isSave:P,onSaveClick:this.onSaveClick,onSaveSuccess:this.onSaveSuccess,handleTokenInvalid:T,toggle:this.toggleTransferToFullModePopper,checkAndShowReadOnlyRemind:this.props.checkAndShowReadOnlyRemind}),P?(0,e.jsx)(t.Button,{icon:!0,size:"sm",tag:"a",href:C,rel:"noreferrer",target:"_blank",role:"button",title:this.preview,type:"tertiary",className:(0,e.classNames)("toollist-item toollist-item-click",{"tool-hidden":s<184})},(0,e.jsx)(y,{className:"toollist-item-icon"})):(0,e.jsx)(t.Button,{icon:!0,size:"sm",id:"tooltip_preview",title:this.preview,type:"tertiary",onClick:this.previewToggle,className:(0,e.classNames)("toollist-item toollist-item-click",{"tool-hidden":s<184})},(0,e.jsx)(y,{className:"toollist-item-icon"}))),(0,e.jsx)("div",{className:"tool_more_content"},this.renderMore()),(0,e.jsx)(t.Button,{className:"ml-2 toollist-publish",onClick:this.onPublishClick,disabled:f===a.Published||f===a.Publishing||!I,title:A},(0,e.jsx)("span",null,this.getPublishText()))),(0,e.jsx)(t.AlertPopup,{isOpen:this.state.isShowLeaveAlertPopup,okLabel:this.getAlertPopOkLabel(),title:this.getAlertPopTitle(),toggle:this.handleToggleForLeaveAlertPopup},(0,e.jsx)("div",{style:{fontSize:"1rem"}},this.nls("headerLeaveDescription"))),(0,e.jsx)(t.AlertPopup,{className:"preview-alert-pop",css:this.previewAlertPopStyle(),isOpen:this.state.isShowPreviewAlertPop,hideOK:!0,hideCancel:!0,title:this.nls("preview"),toggle:this.previewToggle},(0,e.jsx)("div",{className:"preview-alert-pop-content"},this.nls("headerLeaveDescription"),(0,e.jsx)("div",{className:"perview-pop-button-con"},(0,e.jsx)("a",{className:"m-0 p-0 toollist-item-click btn h-100 border-0",onClick:this.previewToggle,href:C,rel:"noreferrer",target:"_blank"},(0,e.jsx)("button",{className:"preview-alert-pop-btn btn-primary"},this.nls("commonModalOk"))),(0,e.jsx)("button",{onClick:this.previewToggle,className:"preview-alert-pop-btn btn-cancle"},this.nls("commonModalCancel"))))),(0,e.jsx)(p.ProxySettingPopup,{isOpen:this.state.isProxySettingPopupOpen,onToggle:this.onToggleProxySettingPopup,onCancel:this.onAppProxiesCancel,onFinish:this.onAppProxiesFinish}),c&&(0,e.jsx)("div",{className:"loading-con"},(0,e.jsx)("div",{style:{position:"absolute",left:"50%",top:"50%"},className:"jimu-primary-loading"})),(0,e.jsx)(oe,{itemTitle:null==b?void 0:b.title,itemId:x,isOpen:l,itemProtected:u,deleteToggle:()=>{this.setState({isOpenDeletePopper:!1})},deleteApp:this.handleConfirm,detailUrl:`${this.props.portalUrl}/home/item.html?id=${this.props.currentAppId}`}),(0,e.jsx)(t.AlertPopup,{isOpen:r,title:this.nls("variableColorWarning"),hideCancel:!0,toggle:this.toggleAlertPopup},(0,e.jsx)("div",{style:{fontSize:"1rem"}},d)))}}const ue=(0,u.withTheme)(he),me=e.ReactRedux.connect((e=>({stateHistory:e.appStateHistory,queryObject:e.queryObject,appConfig:e.appStateInBuilder&&e.appStateInBuilder.appConfig,currentAppId:e.builder&&e.builder.currentAppId,portalUrl:e.portalUrl,dataSources:e.appStateInBuilder&&e.appStateInBuilder.appConfig&&e.appStateInBuilder.appConfig.dataSources,dataSourcesInfo:e.appStateInBuilder&&e.appStateInBuilder.dataSourcesInfo})))(ue);class ge extends e.React.PureComponent{constructor(t){super(t),this.onAppModeChange=()=>{this.props&&(this.getAppDocument(),this.props.appMode===e.AppMode.Run?(this.appFrameDoc&&this.appFrameDoc.body.classList.add("design-mode"),s.builderAppSync.publishAppModeChangeToApp(e.AppMode.Design)):(this.appFrameDoc&&this.appFrameDoc.body.classList.remove("design-mode"),s.builderAppSync.publishAppModeChangeToApp(e.AppMode.Run)))},this.onLockLayoutChange=()=>{const e=(0,s.getAppConfigAction)();this.getAppDocument(),this.appFrameDoc&&(this.props.lockLayout?this.appFrameDoc.body.classList.remove("lock-layout"):this.appFrameDoc.body.classList.add("lock-layout")),e.setLockLayout(!this.props.lockLayout).exec()},this.nls=e=>this.props.intl.formatMessage({id:e,defaultMessage:r[e]}),this.appMode=this.props.intl.formatMessage({id:"appMode",defaultMessage:r.appMode}),this.lockLayout=this.props.intl.formatMessage({id:"headerLockLayout",defaultMessage:r.headerLockLayout})}getStyle(t){return e.css`
      .lock-layout-label {
        font-weight: 500;
        color: ${t.ref.palette.neutral[1e3]};
        margin-right: ${e.polished.rem(10)};
      }

      .live-view-container {
        cursor: pointer;
        background-color: ${t.sys.color.primary.main};
        border-radius: 2px !important;
        color: ${t.ref.palette.black};
        padding-right: ${e.polished.rem(8)};
        padding-left: ${e.polished.rem(8)};
        height: ${e.polished.rem(26)};
        border:1px solid ${t.sys.color.primary.main};
      }

      .edit-view-container {
        cursor: pointer;
        border:1px solid ${t.ref.palette.neutral[700]};
        border-radius: 2px !important;
        color: ${t.ref.palette.neutral[1e3]};
        padding-right: ${e.polished.rem(8)};
        padding-left: ${e.polished.rem(8)};
        height: ${e.polished.rem(26)};

        &:hover {
          color: ${t.ref.palette.black};

          .edit-view-icon {
            border: 1px solid ${t.ref.palette.black};
          }
        }
      }

      .live-view-icon {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: ${t.ref.palette.black};
      }

      .edit-view-icon {
        width: 7px;
        height: 7px;
        border: 1px solid ${t.ref.palette.neutral[1100]};
        border-radius: 50%;
      }
    `}getAppDocument(){const t=document.querySelector(`iframe[name="${e.APP_FRAME_NAME_IN_BUILDER}"]`);this.appFrameDoc=t.contentDocument||t.contentWindow.document}render(){const{appMode:s,lockLayout:i}=this.props,o=s===e.AppMode.Run,a=this.props.intl.formatMessage({id:"headerLockLayout",defaultMessage:r.headerLockLayout});return(0,e.jsx)("div",{className:"d-flex align-items-center",css:this.getStyle(this.props.theme),title:i?this.props.intl.formatMessage({id:"disableLayoutEditing",defaultMessage:r.disableLayoutEditing}):this.props.intl.formatMessage({id:"enableLayoutEditing",defaultMessage:r.enableLayoutEditing})},!o&&(0,e.jsx)("div",{className:"d-flex align-items-center",onClick:this.onLockLayoutChange,style:{cursor:"pointer"}},(0,e.jsx)("div",{className:"lock-layout-label"},a),(0,e.jsx)(t.Switch,{checked:i,"aria-label":a})),(0,e.jsx)("div",{className:"liveview-gap"}),(0,e.jsx)(t.Button,{type:"tertiary",size:"sm",style:{whiteSpace:"nowrap"},className:(0,e.classNames)("d-flex align-items-center",{"live-view-container":o,"edit-view-container":!o}),"aria-pressed":o,title:o?this.nls("turnOffLiveView"):this.nls("turnOnLiveView"),onClick:this.onAppModeChange},(0,e.jsx)("div",{className:(0,e.classNames)("mr-2",{"live-view-icon":o,"edit-view-icon":!o})}),(0,e.jsx)("div",{className:"d-flex align-items-center border-left-0 app-toolbar-mode"},(0,e.jsx)("span",null,this.appMode))))}}const ve=(0,u.withTheme)(ge),fe=e.ReactRedux.connect((e=>{var t,s,i,o,a;return{appMode:null===(t=e.appStateInBuilder)||void 0===t?void 0:t.appRuntimeInfo.appMode,lockLayout:null!==(a=null===(o=null===(i=null===(s=e.appStateInBuilder)||void 0===s?void 0:s.appConfig)||void 0===i?void 0:i.forBuilderAttributes)||void 0===o?void 0:o.lockLayout)&&void 0!==a&&a}}))(ve);var be=d(505),we=d.n(be),Se=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const ye=t=>{const s=window.SVG,{className:i}=t,o=Se(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:we()},o)):e.React.createElement("svg",Object.assign({className:a},o))};var xe=d(9165),je=d.n(xe),Te=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const Oe=t=>{const s=window.SVG,{className:i}=t,o=Te(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:je()},o)):e.React.createElement("svg",Object.assign({className:a},o))};var Ae=d(8243),Pe=d.n(Ae),Me=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const ke=t=>{const s=window.SVG,{className:i}=t,o=Me(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:Pe()},o)):e.React.createElement("svg",Object.assign({className:a},o))};class Ie extends e.React.PureComponent{constructor(e){super(e),this.editPageForLargeScreen=this.props.intl.formatMessage({id:"editPageForLargeScreen",defaultMessage:r.editPageForLargeScreen}),this.editPageForMediumScreen=this.props.intl.formatMessage({id:"editPageForMediumScreen",defaultMessage:r.editPageForMediumScreen}),this.editPageForSmallScreen=this.props.intl.formatMessage({id:"editPageForSmallScreen",defaultMessage:r.editPageForSmallScreen})}getStyle(t){var s,i;return e.css`
      .device-switch-group {
        margin-right: ${e.polished.rem(10)};
      }

      .device-switch {
        width: ${e.polished.rem(26)};
        height: ${e.polished.rem(26)};
        border-radius: 2px !important;
        border: 0;
        margin-left: 1px;
        margin-right: 1px;

        &:focus {
          box-shadow: none !important;
        }
      }

      .device-switch-gap {
        margin-right: ${e.polished.rem(5)};
      }

      .device-switch-gap button {
        border: none;
      }
      .device-switch-container button {
        color: ${null===(s=null==t?void 0:t.ref.palette)||void 0===s?void 0:s.neutral[900]};
      }
      .device-switch-container button:hover {
        color: ${null===(i=null==t?void 0:t.ref.palette)||void 0===i?void 0:i.black};
      }

      .device-active {
        background-color: ${t.sys.color.primary.main} !important;
        color: ${t.ref.palette.black} !important;
      }

      .no-animation {
        transition: none;
        -webkit-transition: none;
      }
    `}onBrowserSizeModeChange(e){s.builderAppSync.publishChangeBrowserSizeModeToApp(e),e!==this.props.browserSizeMode&&s.builderAppSync.publishChangeSelectionToApp(null),this.setState({isDeviceChooseShow:!1})}render(){return(0,e.jsx)("div",{css:this.getStyle(this.props.theme)},(0,e.jsx)(t.AdvancedButtonGroup,{className:"h-100 d-flex align-items-center device-switch-group"},(0,e.jsx)("div",{className:"h-100 d-flex align-items-center device-switch-container no-animation device-switch-gap"},(0,e.jsx)(t.Button,{icon:!0,type:"tertiary",onClick:()=>{this.onBrowserSizeModeChange(e.BrowserSizeMode.Large)},active:!this.props.browserSizeMode||this.props.browserSizeMode===e.BrowserSizeMode.Large,className:(0,e.classNames)("device-switch d-flex align-items-center p-0",{"device-active":!this.props.browserSizeMode||this.props.browserSizeMode===e.BrowserSizeMode.Large,"device-disactive":this.props.browserSizeMode&&this.props.browserSizeMode!==e.BrowserSizeMode.Large}),title:this.editPageForLargeScreen},(0,e.jsx)(ye,null))),(0,e.jsx)("div",{className:"h-100 d-flex align-items-center device-switch-container device-switch-gap"},(0,e.jsx)(t.Button,{icon:!0,type:"tertiary",onClick:()=>{this.onBrowserSizeModeChange(e.BrowserSizeMode.Medium)},active:this.props.browserSizeMode===e.BrowserSizeMode.Medium,className:(0,e.classNames)("device-switch d-flex align-items-center p-0 no-animation",{"device-active":this.props.browserSizeMode===e.BrowserSizeMode.Medium,"device-disactive":!(this.props.browserSizeMode===e.BrowserSizeMode.Medium)}),title:this.editPageForMediumScreen},(0,e.jsx)(ke,null))),(0,e.jsx)("div",{className:"h-100 d-flex align-items-center device-switch-container"},(0,e.jsx)(t.Button,{icon:!0,type:"tertiary",onClick:()=>{this.onBrowserSizeModeChange(e.BrowserSizeMode.Small)},"aria-pressed":this.props.browserSizeMode===e.BrowserSizeMode.Small,className:(0,e.classNames)("device-switch d-flex align-items-center p-0 no-animation",{"device-active":this.props.browserSizeMode===e.BrowserSizeMode.Small,"device-disactive":!(this.props.browserSizeMode===e.BrowserSizeMode.Small)}),title:this.editPageForSmallScreen},(0,e.jsx)(Oe,null)))))}}const Ce=(0,u.withTheme)(Ie),Ne=e.ReactRedux.connect((e=>({browserSizeMode:e.appStateInBuilder&&e.appStateInBuilder.browserSizeMode})))(Ce);var Re=d(5737),$e=d.n(Re),Ee=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const ze=t=>{const s=window.SVG,{className:i}=t,o=Ee(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:$e()},o)):e.React.createElement("svg",Object.assign({className:a},o))};class De extends e.React.PureComponent{constructor(e){super(e),this.onToggleResolutionChoose=()=>{this.setState({isResolutionChooseShow:!this.state.isResolutionChooseShow})},this.setViewportSize=e=>{(0,s.getAppConfigAction)().setViewportSize(this.props.browserSizeMode,e).exec(),this.setState({isResolutionChooseShow:!1})},this.state={isResolutionChooseShow:!1}}getStyle(t){return e.css`
      .switch-resolution-toggle {
        width: auto;
        font-weight: 500;
        color: ${this.props.theme.ref.palette.neutral[1e3]};
        padding-top: 0;
        padding-bottom: 0;
        height: 26px;
        .switch-label {
          width: auto;
          display: inline-block;
        }
      }
      .dropdown-toggle-content svg {
        margin-right: 0;
        margin-top: ${e.polished.rem(-8)};
        vertical-align: center;
      }
      .no-user-select {
        -o-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select :none;
        user-select: none;
      }
    `}getDropdownStyle(t){return e.css`
      & {
        background: ${t.ref.palette.neutral[500]};
        border: 1px solid ${t.ref.palette.neutral[400]};;
        box-shadow: 0 0 10px 2px ${e.polished.rgba(t.ref.palette.white,.2)};
        border-radius: 2px;
        border-radius: 2px;
        padding-top: ${e.polished.rem(8)};
        padding-bottom: ${e.polished.rem(8)};
      }
    `}render(){const{browserSizeMode:s,viewportSize:i,pageMode:o,appMode:a}=this.props,n=o===e.PageMode.FitWindow?"":this.props.nls("auto"),l=i?`${i.width} \xd7 ${o!==e.PageMode.FitWindow&&a===e.AppMode.Design?n:i.height}`:"";let r=e.CONSTANTS.SCREEN_RESOLUTIONS[s]||[];if(o!==e.PageMode.FitWindow){const e={},t=[];r.forEach((s=>{null==e[s.width]&&(t.push(s),e[s.width]=s)})),r=t}return(0,e.jsx)("div",{css:this.getStyle(this.props.theme)},(0,e.jsx)("div",{className:"sr-only",id:"app-resolution-select"},this.props.nls("changeScreenSize")),(0,e.jsx)(t.Dropdown,{size:"sm",toggle:this.onToggleResolutionChoose,isOpen:this.state.isResolutionChooseShow,className:"resolution-choose"},(0,e.jsx)(t.DropdownButton,{css:e.css`line-height: 1.5rem;`,"aria-label":`Resolution: ${l}`,"aria-describedby":"app-resolution-select",size:"sm",type:"tertiary",arrow:!1,className:"switch-resolution-toggle lin",title:this.props.nls("changeScreenSize")},(0,e.jsx)("span",{className:"switch-label"},l),(0,e.jsx)(ze,{size:"s"})),(0,e.jsx)(t.DropdownMenu,{css:this.getDropdownStyle(this.props.theme)},r.map(((s,i)=>(0,e.jsx)(t.DropdownItem,{key:i,className:"no-user-select",onClick:()=>{this.setViewportSize(s)}},`${s.width} \xd7 ${o!==e.PageMode.FitWindow&&a===e.AppMode.Design?n:s.height}`))))))}}const Be=(0,u.withTheme)(De),Le=e.ReactRedux.connect((t=>{var s,i,o,a,n,l;const r=t.appStateInBuilder&&t.appStateInBuilder.browserSizeMode;let p;t.appStateInBuilder&&(p=e.utils.findViewportSize(t.appStateInBuilder.appConfig,r));const d=t.appStateInBuilder&&t.appStateInBuilder.appRuntimeInfo.currentPageId;let c;return d&&(c=null===(a=null===(o=null===(i=null===(s=t.appStateInBuilder)||void 0===s?void 0:s.appConfig)||void 0===i?void 0:i.pages)||void 0===o?void 0:o[d])||void 0===a?void 0:a.mode),{viewportSize:p,pageMode:c,appMode:null===(l=null===(n=t.appStateInBuilder)||void 0===n?void 0:n.appRuntimeInfo)||void 0===l?void 0:l.appMode,browserSizeMode:t.appStateInBuilder&&t.appStateInBuilder.browserSizeMode}}))(Be);var Ue=d(63),Fe=d.n(Ue),He=function(e,t){var s={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0&&(s[i]=e[i]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(i=Object.getOwnPropertySymbols(e);o<i.length;o++)t.indexOf(i[o])<0&&Object.prototype.propertyIsEnumerable.call(e,i[o])&&(s[i[o]]=e[i[o]])}return s};const _e=t=>{const s=window.SVG,{className:i}=t,o=He(t,["className"]),a=(0,e.classNames)("jimu-icon jimu-icon-component",i);return s?e.React.createElement(s,Object.assign({className:a,src:Fe()},o)):e.React.createElement("svg",Object.assign({className:a},o))};var We=function(e,t,s,i){return new(s||(s=Promise))((function(o,a){function n(e){try{r(i.next(e))}catch(e){a(e)}}function l(e){try{r(i.throw(e))}catch(e){a(e)}}function r(e){var t;e.done?o(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(n,l)}r((i=i.apply(e,t||[])).next())}))};const Ye=t=>{const s=(null==t?void 0:t.groups)||(0,e.Immutable)([]),i=[];return s.forEach((e=>{e.capabilities.indexOf("updateitemcontrol")>-1&&i.push(e.id)})),i};var Ve=function(e,t,s,i){return new(s||(s=Promise))((function(o,a){function n(e){try{r(i.next(e))}catch(e){a(e)}}function l(e){try{r(i.throw(e))}catch(e){a(e)}}function r(e){var t;e.done?o(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(n,l)}r((i=i.apply(e,t||[])).next())}))};const qe=Object.assign({},r,t.defaultMessages);var Ge;!function(e){e.OrgAdmin="org_admin",e.OrgPublisher="org_publisher",e.OrgUser="org_user",e.CustomRoles="custom_roles"}(Ge||(Ge={}));class Ke extends e.React.PureComponent{constructor(t){super(t),this.titleTextInput=e.React.createRef(),this.spanTextInput=e.React.createRef(),this.originTitleMaxWidth=300,this.currentToolContainerWidth=0,this.currentPublishStateContainerWidth=0,this.focusTitleInput=!1,this.getHelpUrl=()=>{var e;null===(e=null===s.helpUtils||void 0===s.helpUtils?void 0:s.helpUtils.getHomeHelpLink())||void 0===e||e.then((e=>{e&&this.setState({helpUrl:e})}))},this.checkIsItemInUpdateGroup=e=>Ve(this,void 0,void 0,(function*(){const{user:t,appInfo:s,queryObject:o}=this.props;if((o.id!==e.queryObject.id||t!==(null==e?void 0:e.user))&&(null==s?void 0:s.id)&&t){const e=yield function(e,t){return We(this,void 0,void 0,(function*(){if(window.jimuConfig.isDevEdition)return!1;const s=Ye(t),o={items:e,groups:s.join(",")};let a=!1;return i.appServices.getAppGroups(o).then((t=>{for(const s in t)s===e&&(a=!0);return Promise.resolve(a)}),(e=>Promise.resolve(a)))}))}(null==s?void 0:s.id,t);this.setState({isItemInUpdateGroup:e},(()=>{this.checkEditPrivileges()}))}})),this.editTitle=e=>{if(this.checkAndShowReadOnlyRemind())return;let t=e;this.focusTitleInput=!1;const{appItem:o}=this.state;if(t=t.replace(/(^\s*)|(\s*$)/g,""),0===t.length||/^[ ]*$/.test(t)||t===o.title)return t=o.title,this.setState({titleText:t}),!1;i.appServices.updateAppInfo({id:this.props.queryObject.id,title:t,owner:o.owner}).then((()=>{this.props.dispatch(s.builderActions.refreshAppListAction(!0)),s.builderAppSync.publishAppInfoChangeToApp(Object.assign(Object.assign({},o),{title:t})),o.title=t,this.setState({appItem:o,titleText:t})}),(e=>{console.error(e),this.handleTokenInvalid(e)}))},this.checkAndShowReadOnlyRemind=()=>{const t=(0,e.getAppStore)().getState().portalSelf;return(null==t?void 0:t.isReadOnly)&&this.toastNote(this.nls("remindTextForReadonlyMode")),null==t?void 0:t.isReadOnly},this.handleTokenInvalid=t=>{498===Number(null==t?void 0:t.code)&&e.SessionManager.getInstance().gotoAuthErrorPage()},this.refreshTitleByAppId=t=>{e.portalUtils.getAppInfo(t).then((e=>{this.refreshTitle(e,!0)}),(e=>{console.error(e)}))},this.refreshTitle=(e,t=!1)=>{if(!e)return;const{titleText:s}=this.state,i=this.state.itemType,a=(null==e?void 0:e.type)===o.Template?o.Template:o.Experience,n=a===o.Template&&i!==a;this.getPublishStatusAndKewWorkd(e),s&&!t&&(e.title=s),this.setState({titleText:e.title||"",itemType:a,itemId:e.id,appItem:this.initAppInfo(e),isShowTemplateRemind:n})},this.resetTitle=e=>{this.setState({titleText:e})},this.initAppInfo=e=>(null==e?void 0:e.id)?(e.isLocalApp=window.jimuConfig.isDevEdition,e.portalUrl=this.props.portalUrl,e):null,this.getPublishStatusAndKewWorkd=e=>{const t=(null==e?void 0:e.typeKeywords)||[];let{publishStatus:s}=this.state;t.forEach((e=>{if(e.includes("status:")){switch(e.split(": ")[1]){case a.Published:s=a.Published;break;case a.Changed:s=a.Changed;break;case a.Draft:s=a.Draft}}})),this.setState({publishStatus:s})},this.getPublishString=()=>{const{publishStatus:e}=this.state;switch(e){case a.Draft:return this.nls("itemStatusDraft");case a.Published:return this.nls("published");case a.Changed:return this.nls("unpublishedChanges")}},this.changePublishStatus=e=>{this.setState({publishStatus:e})},this.titleTextChange=e=>{let t=e.target.value;t.length>250&&(t=t.slice(0,250)),this.setState({titleText:t})},this.nls=e=>this.props.intl?this.props.intl.formatMessage({id:e,defaultMessage:qe[e]}):e,this.handleKeydown=e=>{"Enter"===e.key&&this.titleTextInput.current.blur()},this.onToolContainerResize=e=>{this.currentToolContainerWidth=e,this.checkAndResizeTileMaxWidth()},this.onHeaderContainerResize=()=>{this.checkAndResizeTileMaxWidth()},this.onPublishStateContainerResized=e=>{this.currentPublishStateContainerWidth=e,this.checkAndResizeTileMaxWidth()},this.checkAndResizeTileMaxWidth=()=>{if(!this.currentToolContainerWidth||!this.currentPublishStateContainerWidth)return;const e=window.innerWidth-this.currentToolContainerWidth-52-this.currentPublishStateContainerWidth;e>=this.originTitleMaxWidth?this.setState({titleMaxWidth:this.originTitleMaxWidth}):e<=40?this.setState({titleMaxWidth:40}):this.setState({titleMaxWidth:e})},this.getItemPublishStatusTitle=()=>{const{publishStatus:e}=this.state;let t="";switch(e){case a.Draft:t=this.nls("draftStatusTitle");break;case a.Published:t=this.nls("publishedTitle");break;case a.Changed:t=this.nls("publishedUnsaveTitle")}return t},this.getTemplatePopperStyle=()=>{const{theme:t}=this.props;return e.css`
      &{
        background: ${t.ref.palette.neutral[600]};
        color: ${t.ref.palette.black};
        border: 1px solid ${t.ref.palette.neutral[400]};
        box-sizing: border-box;
        padding: ${e.polished.rem(10)} ${e.polished.rem(12)};
        border-radius: 2px;
        box-shadow: 0 0 10px 2px ${e.polished.rgba(t.ref.palette.white,.2)};
      }
      .template-remind-porper {
        div{
          white-space: nowrap;
          text-align: center;
          font-size: ${e.polished.rem(13)};
          line-height: ${e.polished.rem(13)};
          margin-bottom: ${e.polished.rem(14)};
        }
      }
      &[data-popper-placement^="right"] .jimu-popper--arrow::before{
        border-right-color: ${t.ref.palette.neutral[400]};
      }
      &[data-popper-placement^="right"] .jimu-popper--arrow::after {
        border-right-color: ${t.ref.palette.neutral[600]};
      }
    `},this.closeTemplateRemind=()=>{this.setState({isShowTemplateRemind:!1})},this.onSaveStatusChanged=e=>{this.setState({isAppSaved:e})},this.checkIsOwner=()=>{const{appInfo:e}=this.props,{user:t}=this.props;return(null==t?void 0:t.username)===(null==e?void 0:e.owner)},this.checkEditPrivileges=()=>{const{appInfo:e}=this.props,{user:t}=this.props,{isItemInUpdateGroup:s}=this.state,i=null==e?void 0:e.isOrgItem,o=this.checkIsOwner()||(null==t?void 0:t.role)===Ge.OrgAdmin&&(i||window.jimuConfig.isDevEdition)||s;this.setState({canEditItem:o})},this.handleFocusTitleInput=e=>{this.focusTitleInput=!0},this.toastNote=e=>{this.setState({showToast:!0,toastText:e},(()=>{setTimeout((()=>{this.setState({showToast:!1,toastText:""})}),2e3)}))},this.getTostStyle=()=>{var t,s,i,o,a,n,l,r,p;return e.css`
      & {
        height:  ${e.polished.rem(40)};
        top: ${e.polished.rem(60)};
      }
      .jimu-toast-info {
        background: ${null===(i=null===(s=null===(t=this.props)||void 0===t?void 0:t.theme)||void 0===s?void 0:s.sys.color)||void 0===i?void 0:i.secondary.light};
        line-height: ${e.polished.rem(40)};
        color: ${null===(n=null===(a=null===(o=this.props)||void 0===o?void 0:o.theme)||void 0===a?void 0:a.ref.palette)||void 0===n?void 0:n.neutral[1100]};
        font-weight: 300;
        padding: 0 ${e.polished.rem(16)};
        box-shadow: 0 0 ${e.polished.rem(10)} ${e.polished.rem(2)} ${e.polished.rgba(null===(p=null===(r=null===(l=this.props)||void 0===l?void 0:l.theme)||void 0===r?void 0:r.ref.palette)||void 0===p?void 0:p.white,.2)};
      }
    `},this.state={titleText:"",accountPopoverOpen:!1,itemType:o.Experience,itemId:"",titleMaxWidth:this.originTitleMaxWidth,publishStatus:a.Draft,isShowTemplateRemind:!1,isAppSaved:!0,showTitle:!0,helpUrl:"#",canEditItem:!1,showToast:!1,toastText:null,isItemInUpdateGroup:!0}}getStyle(){const t=this.props.theme;return e.css`
      .widget-builder-header {
        background-color: ${t.ref.palette.neutral[500]};
        border: 1px solid ${t.ref.palette.neutral[700]};
        padding-left: ${e.polished.rem(12)};
        overflow: auto;

        .header-logo {
          a {
            margin-right:${e.polished.rem(6)};
          }
          .header-logo-item {
            height: ${e.polished.rem(32)};
            width: ${e.polished.rem(32)};
            background: url('./assets/exb-logo.png') no-repeat center;
            background-size: 100%;
            &:hover {
              background: url(${d(1546)}) no-repeat center;
              background-size: 100%;
            }
          }
        }

        .app-type {
          background: ${t.sys.color.secondary.dark};
          color: ${t.sys.color.info.light};
          border-radius: 2px;
          font-size: ${e.polished.rem(10)};
          white-space: nowrap;
          width: ${e.polished.rem(24)};
          padding: ${e.polished.rem(2)} 0;
          text-align: center;
        }
        .publish-state {
          margin-left: ${e.polished.rem(9)};
          max-width: ${e.polished.rem(152)};
          height: ${e.polished.rem(18)};
        }
        .publish-state div {
          background: ${t.sys.color.success.light};
          border-radius: 2px;
          font-size: ${e.polished.rem(10)};
          line-height: ${e.polished.rem(18)};
          position: relative;
          white-space: nowrap;
          padding: 0 ${e.polished.rem(6)};
          text-align: center;
          color: ${t.ref.palette.white};
          max-width: ${e.polished.rem(150)};
          font-weight: bold;
        }
        .publish-state .Draft{
          color: ${t.ref.palette.white};
          background: ${t.sys.color.warning.light};
        }
        .publish-state .Changed{
          color: ${t.ref.palette.white};
          background: ${t.sys.color.error.light};
        }
        .header-title-maxwidth-screen {
        }

        .app-title-content {
          width: 100%;
          height: ${e.polished.rem(28)};
          min-width: ${e.polished.rem(40)};
          position: relative;
          .title-placeholder {
            width: auto;
            padding: 0 0.5rem;
            font-size: ${e.polished.rem(16)};
            visibility: hidden;
            pointer-events: none;
          }
        }
        .header-title-input {
          position: absolute;
          width: 100%;
          height: 100%;
          .input-wrapper {
            background-color: transparent;
            input {
              font-size: ${e.polished.rem(16)};
              color: var(--ref-palette-neutral-1100);
            }
          }
          min-width: ${e.polished.rem(40)};
        }
        .header-title-input {
          left: 0;
          top: 0;
          width: 100%;
        }
        .title-text-placeholder {
          display: block;
          opacity: 0;
          padding-left:${e.polished.rem(5)};
          padding-right:${e.polished.rem(7)};
          word-spacing: ${e.polished.rem(6)};
        }

        .header-account {
          float: left;
          color: ${t.ref.palette.black};

          div {
            background-color: initial;
          }

          &:hover {
            // background-color: ${t.ref.palette.white};
          }
        }

        .header-login {
          cursor: pointer;
          fill: ${t.ref.palette.black};
        }

        .header-login-username {
          color: ${t.ref.palette.black};
          margin-left: 5px;
          font-size: 14px;
        }

        .toollist-seperateline {
          margin-left: ${e.polished.rem(16)};
          height: 30px;
          border: 1px solid ${t.ref.palette.neutral[700]};
        }

        .liveview-gap {
          margin-right: ${e.polished.rem(20)};
        }

        .dropdown-toggle-content {
          margin-top: ${e.polished.rem(4)};
        }

        .user-container {
          margin: 10.5px 16px;
        }
      }

      .account-dropdown-toggle:focus {
        box-shadow: none !important;
      }`}componentDidMount(){this.props.queryObject.id&&this.refreshTitleByAppId(this.props.queryObject.id),this.getHelpUrl(),this.checkEditPrivileges()}getSnapshotBeforeUpdate(e,t){return!(!this.props.queryObject.id||e.queryObject.id===this.props.queryObject.id)}componentDidUpdate(e,t,s){const{currentPageId:i,appInfo:o,queryObject:a}=this.props;if(s&&this.setState({titleText:""}),a.id!==e.queryObject.id&&e.queryObject.id?this.refreshTitleByAppId(this.props.queryObject.id):o&&0!==Object.keys(o).length&&o!==(null==e?void 0:e.appInfo)&&!this.focusTitleInput&&this.refreshTitle(null==o?void 0:o.asMutable({deep:!0})),e.currentPageId!==i){let e=!0;"template"===i&&(e=!1),this.setState({showTitle:e})}this.checkEditPrivileges(),this.props.portalUrl===(null==e?void 0:e.portalUrl)&&this.props.portalSelf===(null==e?void 0:e.portalSelf)||this.getHelpUrl(),this.checkIsItemInUpdateGroup(e)}getQuery(t){return e.queryString.parse(window.location.search)[t]||""}render(){const i=s.utils.getHomePageUrl(window.isExpressBuilder),{itemType:a,publishStatus:n,titleText:l,titleMaxWidth:r,isShowTemplateRemind:p,showTitle:d,canEditItem:c}=this.state,h=window.isExpressBuilder;return(0,e.jsx)("div",{css:this.getStyle(),className:"h-100"},(0,e.jsx)("div",{className:"widget-builder-header d-flex justify-content-between h-100 pr-0 border-left-0 border-right-0 border-top-0",style:{overflowX:"hidden"}},(0,e.jsx)("div",{className:"d-flex"},(0,e.jsx)("div",{className:"header-logo d-flex align-items-center"},(0,e.jsx)("a",{href:`${i}`,title:this.nls("headerHome")},(0,e.jsx)("div",{className:"header-logo-item d-block"})),d&&(0,e.jsx)("div",{className:"header-title d-flex align-items-center header-title-maxwidth-screen",style:{maxWidth:r}},(0,e.jsx)("div",{className:"app-title-content flex-grow-1"},(0,e.jsx)("span",{className:"title-placeholder text-truncate"},l),(0,e.jsx)(t.TextInput,{ref:this.titleTextInput,className:"header-title-input font-weight-normal",value:l,onAcceptValue:this.editTitle,onChange:this.titleTextChange,onKeyDown:this.handleKeydown,onFocus:this.handleFocusTitleInput,borderless:!0,"aria-label":this.nls("appTitle")})))),(0,e.jsx)("div",{className:"d-flex align-items-center"},(0,e.jsx)("div",{ref:e=>{this.reference=e}},a===o.Template&&(0,e.jsx)("div",{title:this.nls("appTypeTemplate"),className:"app-type  position-relative"},(0,e.jsx)(_e,{className:"toollist-item-icon",size:"l"}),(0,e.jsx)(t.Popper,{reference:this.reference,open:p,showArrow:!0,toggle:this.closeTemplateRemind,placement:"right-end",offset:[-8,0],css:this.getTemplatePopperStyle()},(0,e.jsx)("div",{className:"template-remind-porper"},(0,e.jsx)("div",null,this.nls("templateRemind")),(0,e.jsx)(t.Button,{type:"primary",className:"float-right",size:"sm",onClick:this.closeTemplateRemind},this.nls("gotIt")),(0,e.jsx)("span",{className:"position-absolute"}))))),(0,e.jsx)(t.Tooltip,{title:this.getItemPublishStatusTitle(),describeChild:!0,showArrow:!0},(0,e.jsx)(t.Button,{type:"tertiary",size:"sm",className:"publish-state position-relative p-0"},(0,e.jsx)("div",{className:(0,e.classNames)("text-truncate",n)},this.getPublishString()))),(0,e.jsx)(e.ReactResizeDetector,{handleWidth:!0,onResize:this.onPublishStateContainerResized}))),(0,e.jsx)("div",{className:"d-flex align-items-center justify-content-end"},!h&&(0,e.jsx)(W.Fragment,null,(0,e.jsx)(fe,{intl:this.props.intl}),(0,e.jsx)("div",{className:"liveview-gap"})),(0,e.jsx)(Ne,{intl:this.props.intl}),(0,e.jsx)(Le,{nls:this.nls}),(0,e.jsx)("div",{className:"toollist-seperateline border-bottom-0 border-top-0 border-left-0 mt-1 mb-1 ml-1 mr-1"}),(0,e.jsx)(me,{handleTokenInvalid:this.handleTokenInvalid,theme:this.props.theme,itemId:this.state.itemId,itemType:this.state.itemType,intl:this.props.intl,appItem:this.state.appItem,publishStatus:this.state.publishStatus,changePublishStatus:this.changePublishStatus,titleText:l,locale:this.getQuery("locale")||"",onSaveStatusChanged:this.onSaveStatusChanged,folderUrl:this.props.context.folderUrl,resetTitle:this.resetTitle,canEditItem:c,toastNote:this.toastNote,checkAndShowReadOnlyRemind:this.checkAndShowReadOnlyRemind}),(0,e.jsx)("div",{className:"float-right d-flex user-container"},this.props.user&&(0,e.jsx)(t.UserProfile,{user:this.props.user,portalUrl:this.props.portalUrl,isAppSaved:this.state.isAppSaved,helpUrl:this.state.helpUrl})),(0,e.jsx)(e.ReactResizeDetector,{handleWidth:!0,onResize:this.onToolContainerResize}))),(0,e.jsx)(t.Toast,{css:this.getTostStyle(),open:this.state.showToast,type:t.ToastType.Info,text:this.state.toastText}),(0,e.jsx)(e.ReactResizeDetector,{handleWidth:!0,onResize:this.onHeaderContainerResize}))}}Ke.mapExtraStateProps=e=>{var t;return{currentPageId:e.appRuntimeInfo&&e.appRuntimeInfo.currentPageId,queryObject:e.queryObject,appInfo:null===(t=null==e?void 0:e.appStateInBuilder)||void 0===t?void 0:t.appInfo}};const Qe=Ke;function Xe(e){d.p=e}})(),c})())}}}));