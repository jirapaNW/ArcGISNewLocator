"use strict";var WidgetInfoType,__assign=this&&this.__assign||function(){return(__assign=Object.assign||function(e){for(var t,i=1,n=arguments.length;i<n;i++)for(var r in t=arguments[i])Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e}).apply(this,arguments)},__awaiter=this&&this.__awaiter||function(e,s,l,u){return new(l=l||Promise)(function(i,t){function n(e){try{o(u.next(e))}catch(e){t(e)}}function r(e){try{o(u.throw(e))}catch(e){t(e)}}function o(e){var t;e.done?i(e.value):((t=e.value)instanceof l?t:new l(function(e){e(t)})).then(n,r)}o((u=u.apply(e,s||[])).next())})},__generator=this&&this.__generator||function(n,r){var o,s,l,u={label:0,sent:function(){if(1&l[0])throw l[1];return l[1]},trys:[],ops:[]},p={next:e(0),throw:e(1),return:e(2)};return"function"==typeof Symbol&&(p[Symbol.iterator]=function(){return this}),p;function e(i){return function(e){var t=[i,e];if(o)throw new TypeError("Generator is already executing.");for(;u=p&&t[p=0]?0:u;)try{if(o=1,s&&(l=2&t[0]?s.return:t[0]?s.throw||((l=s.return)&&l.call(s),0):s.next)&&!(l=l.call(s,t[1])).done)return l;switch(s=0,(t=l?[2&t[0],l.value]:t)[0]){case 0:case 1:l=t;break;case 4:return u.label++,{value:t[1],done:!1};case 5:u.label++,s=t[1],t=[0];continue;case 7:t=u.ops.pop(),u.trys.pop();continue;default:if(!(l=0<(l=u.trys).length&&l[l.length-1])&&(6===t[0]||2===t[0])){u=0;continue}if(3===t[0]&&(!l||t[1]>l[0]&&t[1]<l[3]))u.label=t[1];else if(6===t[0]&&u.label<l[1])u.label=l[1],l=t;else{if(!(l&&u.label<l[2])){l[2]&&u.ops.pop(),u.trys.pop();continue}u.label=l[2],u.ops.push(t)}}t=r.call(n,u)}catch(e){t=[6,e],s=0}finally{o=l=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}}},fs=(Object.defineProperty(exports,"__esModule",{value:!0}),exports.unZipToFolder=exports.isProtocolRelative=exports.removeProtocol=exports.importApp=exports.checkItemVersion=void 0,require("fs-extra")),semver=require("semver"),fetch=require("cross-fetch"),path=require("path"),utils_1=(require("../../../global"),require("./utils")),JSZip=(require("isomorphic-form-data"),global.fetch=fetch,require("jszip")),multer=require("@koa/multer"),importAppMulter=getImportAppMulter();function checkItemVersion(u,n){return __awaiter(this,void 0,void 0,function(){var l,t,i=this;return __generator(this,function(e){switch(e.label){case 0:l={error:{message:"",errorCode:null,success:!1,checkWidgetVersionResult:[],appVersion:null,errWidgetMsg:null}},e.label=1;case 1:return e.trys.push([1,3,,4]),[4,importAppMulter.single("appZip")(u,n).then(function(e){return __awaiter(i,void 0,void 0,function(){var t,i,n,r,o,s;return __generator(this,function(e){switch(e.label){case 0:return u.type="json",t=u.request.body||{},o=(null==(o=u.request.file)?void 0:o.path)||"",s=(null==(s=null==o?void 0:o.split("apps\\")[1])?void 0:s.split("\\importAppZip")[0])||(null==(s=null==o?void 0:o.split("apps/")[1])?void 0:s.split("/importAppZip")[0]),s="".concat(utils_1.tempFolderPath,"/").concat(s),i=path.join(s,"/resources/config/config.json"),[4,checkIsAppValid(o)];case 1:return e.sent()||!1?[4,(n=!1,exports.unZipToFolder)(o,s)]:(l.error.message="Invalid App",l.error.errorCode="001",fs.removeSync(s),[2,(0,utils_1.requestException)(l,u)]);case 2:return e.sent(),checkAppVersion(i,null==t?void 0:t.currentVersion)||(n=!0),0<(null==(r=checkWidgetVersion(i))?void 0:r.length)&&(n=!0),fs.removeSync(s),r={isHeightVersionApp:n},(0,utils_1.commonResponse)(u,r),[2]}})})}).catch(function(e){l.error.message=e,u.body=l})];case 2:return e.sent(),[3,4];case 3:return t=e.sent(),l.error.message=t,(0,utils_1.writeResponseLog)(t,!0),u.body=l,[3,4];case 4:return[2]}})})}function importApp(c,n){return __awaiter(this,void 0,void 0,function(){var a,t,i=this;return __generator(this,function(e){switch(e.label){case 0:a={error:{message:"",errorCode:null,success:!1,checkWidgetVersionResult:[],appVersion:null,errWidgetMsg:null,portalUrl:null}},e.label=1;case 1:return e.trys.push([1,3,,4]),[4,importAppMulter.single("appZip")(c,n).then(function(e){return __awaiter(i,void 0,void 0,function(){var t,i,n,r,o,s,l,u,p;return __generator(this,function(e){switch(e.label){case 0:return c.type="json",t=c.request.body||{},u=(null==(u=c.request.file)?void 0:u.path)||"",p=(null==(p=null==u?void 0:u.split("apps\\")[1])?void 0:p.split("\\importAppZip")[0])||(null==(p=null==u?void 0:u.split("apps/")[1])?void 0:p.split("/importAppZip")[0]),i="".concat(utils_1.appFolderPath,"/").concat(p),n=path.join(i,"/resources/config/config.json"),[4,checkIsAppValid(u)];case 1:return e.sent()||!1?[4,(0,exports.unZipToFolder)(u,i)]:(a.error.message="Invalid App",a.error.errorCode="001",fs.removeSync(i),[2,(0,utils_1.requestException)(a,c)]);case 2:return(e.sent(),r=getZipAppversion(n),s=checkIsSamePortal(n,t.portalUrl),o=s.isSamePortal,s=s.appPortalUrl,o)?checkIsSameType(i,t.type)?[4,copyCustomWidget(n,i)]:(a.error.message="Web Experience"===t.type?"Failed to import app. This is an app template. Please switch to the Templates tab and try again.":"Failed to import template. This is an app. Please switch to the Apps tab and try again.",a.error.errorCode="Web Experience"===t.type?"004":"006",a.error.appVersion=r,fs.removeSync(i),[2,(0,utils_1.requestException)(a,c)]):(a.error.message="Failed to import the app. This app can only be imported by users of portal: ".concat(s," "),a.error.errorCode="003",a.error.portalUrl=s,a.error.appVersion=r,fs.removeSync(i),[2,(0,utils_1.requestException)(a,c)]);case 3:return e.sent(),fs.removeSync(path.join(i,"/importAppZip")),updateNewAppConfig(n,t.portalUrl),null!=t&&t.typeKeywords?((o=Array.isArray(t.typeKeywords)?t.typeKeywords:t.typeKeywords.split(",")).push("version: ".concat(r)),t.typeKeywords=o):delete t.typeKeywords,delete t.snippet,delete t.thumbnail,delete t.currentVersion,fs.ensureDirSync(utils_1.appFolderPath),s=getAppAttributes(i),l=Date.now(),t.id=p,t.created=l,t.modified=l,t.owner=t.username,t.snippet=s.description||null,t.thumbnail=s.thumbnail||null,delete(l=__assign(__assign({},utils_1.infoJson),t)).text,l=(0,utils_1.deepClone)(l),fs.ensureDirSync(i),l=JSON.stringify(l,null,2),fs.writeFileSync("".concat(i,"/info.json"),l),l={__not_publish:!0},l=JSON.stringify(l),fs.writeFileSync("".concat(i,"/config.json"),l),l={folder:"apps/".concat(p),id:p,success:!0},(0,utils_1.commonResponse)(c,l),[2]}})})}).catch(function(e){a.error.message=e,c.body=a})];case 2:return e.sent(),[3,4];case 3:return t=e.sent(),a.error.message=t,(0,utils_1.writeResponseLog)(t,!0),c.body=a,[3,4];case 4:return[2]}})})}function getAppAttributes(e){var e=path.join(e,"config.json");return fs.existsSync(e)?(null==(e=JSON.parse(fs.readFileSync(e,"utf8")))?void 0:e.attributes)||{}:null}function checkAppVersion(e,t){return!!fs.existsSync(e)&&!(!(e=getZipAppversion(e))||!t||semver.gt(e,t))}function getZipAppversion(e){return fs.existsSync(e)?null==(e=JSON.parse(fs.readFileSync(e,"utf8")))?void 0:e.exbVersion:null}function updateNewAppConfig(e,t){if(!fs.existsSync(e))return null;var i=JSON.parse(fs.readFileSync(e,"utf8"))||{},i=(delete i.appProxies,delete i.historyLabels,JSON.stringify(i,null,2));fs.writeFileSync(e,i)}function checkIsSamePortal(e,t){return fs.existsSync(e)?!!(e=(null==(e=null===(e=JSON.parse(fs.readFileSync(e,"utf8"))||{})?void 0:e.attributes)?void 0:e.portalUrl)||"")&&(e=(0,exports.removeProtocol)(e),{isSamePortal:(0,exports.removeProtocol)(t)==e,appPortalUrl:e}):null}function checkIsSameType(e,t){var e=path.join(e,"config.json");return!(!fs.existsSync(e)||(e=(null==(e=null===(e=JSON.parse(fs.readFileSync(e,"utf8"))||{})?void 0:e.attributes)?void 0:e.type)||"")&&(null==e?void 0:e.trim())!==(null==t?void 0:t.trim()))}!function(e){e.ExistedInfo="ExistedInfo",e.Info="Info"}(WidgetInfoType=WidgetInfoType||{}),exports.checkItemVersion=checkItemVersion,exports.importApp=importApp;var removeProtocol=function(e,t){void 0===t&&(t=!1);return(0,exports.isProtocolRelative)(e)||(e=e.replace(/^\s*[a-z][a-z0-9-+.]*:(?![0-9])/i,""),t&&1<e.length&&"/"===e[0]&&"/"===e[1])?e.slice(2):e},isProtocolRelative=(exports.removeProtocol=removeProtocol,function(e){return null!=e&&void 0!==e&&"/"===e[0]&&"/"===e[1]});function getImportAppMulter(){var e=multer.diskStorage({destination:function(e,t,i){try{Promise.resolve(!0).then(function(){fs.ensureDirSync(utils_1.appFolderPath);var e=fs.readdirSync(utils_1.appFolderPath),e=(0,utils_1.getFolderIndex)(e,0)+"",e="".concat(utils_1.appFolderPath,"/").concat(e),e=(fs.mkdirSync(e),"".concat(e,"/importAppZip"));fs.emptyDirSync(e),i(null,e)})}catch(e){console.log(e)}},filename:function(e,t,i){var t=t.originalname.split("."),n=t[t.length-1];i(null,"appZip."+(n=1==t.length?"zip":n))}});return multer({storage:e})}function checkIsAppValid(n){return __awaiter(this,void 0,void 0,function(){var t,i;return __generator(this,function(e){switch(e.label){case 0:return[4,verifyUploadedAppZip(n)];case 1:return t=e.sent()||[],i=!0,null!=t&&t.forEach(function(e){i=i&&e}),[2,i]}})})}function verifyUploadedAppZip(e){var t=[];return t.push(checkFileExistInZip(e,"config.json")),t.push(checkFolderExistInZip(e,"jimu-ui")),t.push(checkFolderExistInZip(e,"jimu-theme")),t.push(checkFolderExistInZip(e,"jimu-layouts")),t.push(checkFolderExistInZip(e,"jimu-core")),t.push(checkFolderExistInZip(e,"jimu-for-builder")),t.push(checkFolderExistInZip(e,"widgets")),t.push(checkFolderExistInZip(e,"config")),Promise.all(t)}function checkFileExistInZip(t,i){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,JSZip.loadAsync(fs.readFileSync(t)).then(function(e){e=e.file(new RegExp(i));return!!(e&&e.length&&0<e.length)})]})})}function checkFolderExistInZip(t,i){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,JSZip.loadAsync(fs.readFileSync(t)).then(function(e){e=e.folder(new RegExp(i));return!!(e&&e.length&&0<e.length)})]})})}exports.isProtocolRelative=isProtocolRelative;var unZipToFolder=function(t,n){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,(new JSZip).loadAsync(fs.readFileSync(t)).then(function(t){var i=[];return fs.ensureDirSync(n),Object.keys(t.files).forEach(function(e){-1<(null==e?void 0:e.indexOf("/resources"))?i.push(createFileOfResources(e,n,t)):-1<(null==e?void 0:e.indexOf("/config.json"))&&3===(null==e?void 0:e.split("/").length)?i.push(createFileOfResources(e,n,t,!0)):-1<(null==e?void 0:e.indexOf("/widgets"))?i.push(createWidgetsFile(e,n,t)):-1<(null==e?void 0:e.indexOf("/thumbnail/"))&&i.push(createThumbnailFile(e,n,t))}),Promise.all(i)})]})})};function createFileOfResources(e,t,i,n){n=(n=void 0===n?!1:n)?"config.json":"resources/".concat(null==e?void 0:e.split("/resources/")[1]);return createFile(e,path.join(t,n),i)}function createWidgetsFile(e,t,i){t=path.join(t,"importAppZip/widgets/".concat(null==e?void 0:e.split("/widgets/")[1]));return createFile(e,t,i)}function createThumbnailFile(e,t,i){t=path.join(t,"/thumbnail/".concat(null==e?void 0:e.split("/thumbnail/")[1]));return createFile(e,t,i)}function createFile(n,r,o){return __awaiter(this,void 0,void 0,function(){var t,i;return __generator(this,function(e){return t=o.file(n),i=normalizeZipPath(r),null==t||!0===t.dir?(fs.ensureDirSync(i),[2,Promise.resolve()]):[2,t.async("nodebuffer").then(function(e){return fs.writeFileSync(i,e)})]})})}function normalizeZipPath(e){return e=(e=path.normalize(e)).replace(/\\/g,"/")}function checkWidgetVersion(e){var n,t=path.join(utils_1.CLIENT_PATH,utils_1.DIST_FOLDER),r=[],o=JSON.parse(fs.readFileSync(e,"utf8")),s=getAllWidgetsInfo(t,WidgetInfoType.Info)||[],e=o.widgets||{};if(o.widgets)for(var i in e)!function(e){var t=null==(n=o.widgets)?void 0:n[e],e=null==(n=s.filter(function(e){return e.uri===t.uri}))?void 0:n[0],i=null==t?void 0:t.version;!e||0===(null==s?void 0:s.length)||(e=null==(n=null==e?void 0:e.manifest)?void 0:n.version,!semver.gt(i,e))||r.push({widgetLabel:null==t?void 0:t.lable,widgetVersionInZip:i})}(i);return r}function copyCustomWidget(i,l){return __awaiter(this,void 0,void 0,function(){var n,t,r,o,s;return __generator(this,function(e){switch(e.label){case 0:return n=path.join(utils_1.CLIENT_PATH,utils_1.DIST_FOLDER),t=JSON.parse(fs.readFileSync(i,"utf8")),t=(0,utils_1.getWidgetsUriFromAppConfig)(t),t=(null==t?void 0:t.customWidgetsUri)||[],r=getAllWidgetsInfo(n,WidgetInfoType.Info)||getAllWidgetsInfo(n,WidgetInfoType.ExistedInfo)||[],o=getAllWidgetsInfo(n,WidgetInfoType.ExistedInfo)||getAllWidgetsInfo(n,WidgetInfoType.Info)||[],s=getAllWidgetsInfo("".concat(l,"/importAppZip"),WidgetInfoType.Info)||[],[4,Promise.all(t.map(function(t){var e,i;return 0<(null==(e=null==r?void 0:r.filter(function(e){return(null==e?void 0:e.uri)===t}))?void 0:e.length)||0<(null==(e=null==o?void 0:o.filter(function(e){return(null==e?void 0:e.uri)===t}))?void 0:e.length)?Promise.resolve():((e=null==(e=null==s?void 0:s.filter(function(e){return(null==e?void 0:e.uri)===t}))?void 0:e[0])&&((i=getCustomWidgetInfoIndex())||0===i?r.splice(i,0,e):r.push(e),i=JSON.stringify(r,null,2),fs.writeFileSync(path.join(n,utils_1.WIDGET_INFO_PATH),i),fs.existsSync(path.join(n,utils_1.WIDGET_EXISTED_INFO_PATH)))&&(o.push(e),i=JSON.stringify(o,null,2),fs.writeFileSync(path.join(n,utils_1.WIDGET_EXISTED_INFO_PATH),i)),fs.existsSync(path.join(n,t))?void 0:fs.copy(path.join("".concat(l,"/importAppZip"),t),path.join(n,t)))}))];case 1:return e.sent(),[2]}})})}function getCustomWidgetInfoIndex(){var e=path.join(utils_1.CLIENT_PATH,utils_1.DIST_FOLDER),i=getLastExistedWidgetUri(),e=getAllWidgetsInfo(e,WidgetInfoType.Info)||[],n=null;return e.forEach(function(e,t){e.uri===i&&(n=t+1)}),n}function getLastExistedWidgetUri(){var e=path.join(utils_1.CLIENT_PATH,utils_1.DIST_FOLDER);return fs.existsSync(path.join(e,utils_1.WIDGET_EXISTED_INFO_PATH))?null==(e=null==(e=getAllWidgetsInfo(e,WidgetInfoType.ExistedInfo))?void 0:e[(null==e?void 0:e.length)-1])?void 0:e.uri:null}function getAllWidgetsInfo(e,t){t=(t=void 0===t?WidgetInfoType.ExistedInfo:t)===WidgetInfoType.Info?fs.existsSync(path.join(e,utils_1.WIDGET_INFO_PATH))?path.join(e,utils_1.WIDGET_INFO_PATH):null:fs.existsSync(path.join(e,utils_1.WIDGET_EXISTED_INFO_PATH))?path.join(e,utils_1.WIDGET_EXISTED_INFO_PATH):null;return t?JSON.parse(fs.readFileSync(t,"utf8")):null}exports.unZipToFolder=unZipToFolder;